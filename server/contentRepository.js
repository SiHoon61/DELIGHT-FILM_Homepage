const { randomUUID } = require("node:crypto");
const { getSql } = require("./db");

class ContentApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const fail = (message) => { throw new ContentApiError(400, "invalid_content", message); };
const validateContent = (value = {}) => {
  if (!value || typeof value !== "object") fail("작품 정보가 필요합니다.");
  if (!["video", "shorts"].includes(value.section)) fail("콘텐츠 유형을 확인해주세요.");
  if (typeof value.categoryId !== "string" || !/^[a-z0-9-]+$/.test(value.categoryId) || value.categoryId === "all") fail("카테고리를 선택해주세요.");
  if (typeof value.youtubeVideoId !== "string" || !/^[\w-]{11}$/.test(value.youtubeVideoId)) fail("올바른 YouTube 영상 ID가 필요합니다.");
  if (typeof value.title !== "string" || !value.title.trim() || value.title.length > 500) fail("제목은 1~500자로 입력해주세요.");
  if (!["published", "draft", "hidden"].includes(value.status)) fail("공개 상태를 확인해주세요.");
  for (const [key, max] of [["subtitle", 5000], ["duration", 30]]) {
    if (value[key] !== undefined && (typeof value[key] !== "string" || value[key].length > max)) fail("설명 또는 재생시간이 올바르지 않습니다.");
  }
  return { ...value, title: value.title.trim(), subtitle: (value.subtitle || "").trim(), duration: (value.duration || "").trim() };
};

const validateIds = (ids) => {
  if (!Array.isArray(ids) || !ids.length || ids.length > 1000 || ids.some((id) => typeof id !== "string" || !id || id.length > 200) || new Set(ids).size !== ids.length) fail("변경할 콘텐츠 ID를 확인해주세요.");
  return ids;
};

const getAdminContents = async () => {
  const sql = getSql();
  const [items, categories] = await sql.transaction((tx) => [
    tx`SELECT contents.id, contents.section, categories.slug AS "categoryId", categories.name AS category,
      youtube_video_id AS src, title, subtitle, status, duration
      FROM contents JOIN categories ON categories.id = contents.category_id
      ORDER BY contents.created_at DESC, contents.id`,
    tx`SELECT slug AS id, name, section FROM categories ORDER BY section, position, name`,
  ], { readOnly: true });
  return { items, categories };
};

// Every content write shares the layout-set locks with layout saves. Membership,
// order compaction and version invalidation commit together with the content.
const mutateContents = async (operation, body = {}) => {
  const sql = getSql();
  let statement;
  let params;
  if (operation === "POST" || operation === "PUT") {
    const item = validateContent(body);
    const id = operation === "POST" ? randomUUID() : validateIds([body.id])[0];
    params = [id, item.section, `${item.section}:${item.categoryId}`, item.youtubeVideoId, item.title, item.subtitle, item.status, item.duration];
    const validCategory = "EXISTS (SELECT 1 FROM categories WHERE id = $3 AND section = $2)";
    const noDuplicate = `NOT EXISTS (SELECT 1 FROM contents other WHERE other.section = $2 AND other.youtube_video_id = $4 AND other.id <> $1)`;
    statement = operation === "POST"
      ? `INSERT INTO contents (id, section, category_id, youtube_video_id, title, subtitle, status, duration)
          SELECT $1,$2,$3,$4,$5,$6,$7,$8 WHERE ${validCategory} AND ${noDuplicate} RETURNING id`
      : `UPDATE contents SET section=$2, category_id=$3, youtube_video_id=$4, title=$5, subtitle=$6, status=$7, duration=$8, updated_at=NOW()
          WHERE id=$1 AND ${validCategory} AND (${noDuplicate} OR (section=$2 AND youtube_video_id=$4)) RETURNING id`;
  } else if (operation === "DELETE") {
    params = [validateIds([body.id])[0]];
    statement = "DELETE FROM contents WHERE id=$1 RETURNING id";
  } else if (operation === "PATCH") {
    const ids = validateIds(body.ids);
    if (!["video", "shorts"].includes(body.section)) fail("콘텐츠 유형을 확인해주세요.");
    if (body.status !== undefined && !["draft", "published", "hidden"].includes(body.status)) fail("공개 상태를 확인해주세요.");
    if (body.categoryId !== undefined && (typeof body.categoryId !== "string" || !/^[a-z0-9-]+$/.test(body.categoryId) || body.categoryId === "all")) fail("카테고리를 확인해주세요.");
    if (body.status === undefined && body.categoryId === undefined) fail("변경할 정보를 선택해주세요.");
    params = [ids, body.section, body.categoryId === undefined ? null : `${body.section}:${body.categoryId}`, body.status || null];
    statement = `UPDATE contents SET category_id=COALESCE($3, category_id), status=COALESCE($4,status), updated_at=NOW()
      WHERE id=ANY($1::text[]) AND section=$2
      AND (SELECT COUNT(*) FROM contents WHERE id=ANY($1::text[]) AND section=$2)=cardinality($1::text[])
      AND ($3::text IS NULL OR EXISTS (SELECT 1 FROM categories WHERE id=$3 AND section=$2)) RETURNING id`;
  } else {
    fail("지원하지 않는 작업입니다.");
  }

  const results = await sql.transaction((tx) => [
    tx`SELECT id FROM layout_sets ORDER BY id FOR UPDATE`,
    tx.query(statement, params),
    tx`DELETE FROM layout_items li USING layout_sets ls, contents c
       WHERE li.layout_set_id=ls.id AND li.content_id=c.id
       AND (c.status <> 'published' OR c.section <> ls.section OR (ls.category_id IS NOT NULL AND c.category_id <> ls.category_id))`,
    tx`INSERT INTO layout_items (layout_set_id, content_id, desktop_position, mobile_position)
       SELECT ls.id, c.id,
         COALESCE((SELECT MAX(desktop_position)+1 FROM layout_items WHERE layout_set_id=ls.id),0) +
           (ROW_NUMBER() OVER (PARTITION BY ls.id ORDER BY c.created_at,c.id)-1)::integer,
         COALESCE((SELECT MAX(mobile_position)+1 FROM layout_items WHERE layout_set_id=ls.id),0) +
           (ROW_NUMBER() OVER (PARTITION BY ls.id ORDER BY c.created_at,c.id)-1)::integer
       FROM layout_sets ls JOIN contents c ON c.section=ls.section AND c.status='published'
         AND (ls.category_id IS NULL OR c.category_id=ls.category_id)
       WHERE NOT EXISTS (SELECT 1 FROM layout_items li WHERE li.layout_set_id=ls.id AND li.content_id=c.id)`,
    tx`WITH positions AS (
         SELECT layout_set_id, content_id,
           (ROW_NUMBER() OVER (PARTITION BY layout_set_id ORDER BY desktop_position,content_id)-1)::integer AS desktop,
           (ROW_NUMBER() OVER (PARTITION BY layout_set_id ORDER BY mobile_position,content_id)-1)::integer AS mobile
         FROM layout_items
       ) UPDATE layout_items li SET desktop_position=p.desktop, mobile_position=p.mobile, updated_at=NOW()
         FROM positions p WHERE li.layout_set_id=p.layout_set_id AND li.content_id=p.content_id`,
    tx`UPDATE layout_sets SET version=version+1, updated_at=NOW()`,
  ]);
  if (!results[1].length) {
    throw new ContentApiError(409, "content_conflict", "저장하지 못했습니다. 중복 영상, 카테고리 또는 삭제된 콘텐츠가 있는지 확인해주세요.");
  }
  return { changedCount: results[1].length };
};

module.exports = { ContentApiError, getAdminContents, mutateContents, validateContent, validateIds };
