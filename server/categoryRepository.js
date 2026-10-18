const { randomUUID } = require("node:crypto");
const { getSql } = require("./db");
const { ContentApiError } = require("./contentRepository");

const invalid = (message) => { throw new ContentApiError(400, "invalid_category", message); };
const validateSection = (section) => {
  if (!["video", "shorts"].includes(section)) invalid("콘텐츠 유형을 확인해주세요.");
};
const validateName = (name) => {
  if (typeof name !== "string" || !name.trim() || name.trim().length > 80) invalid("카테고리 이름은 1~80자로 입력해주세요.");
  if (name.trim().toLowerCase() === "all") invalid("All은 전체 보기 전용 이름입니다.");
  return name.trim();
};
const validateId = (id) => {
  if (typeof id !== "string" || id === "all" || !/^[a-z0-9-]{1,100}$/.test(id)) invalid("카테고리 ID를 확인해주세요.");
  return id;
};

const getAdminCategories = async () => {
  const sql = getSql();
  const categories = await sql`SELECT slug AS id, section, name, position FROM categories ORDER BY section, position, name`;
  return { categories };
};

const writeAdminCategories = async (method, body = {}) => {
  validateSection(body.section);
  let statement;
  let params;
  if (method === "POST") {
    const name = validateName(body.name);
    // The slug is an immutable key, independent of the display name/language.
    const slug = `category-${randomUUID()}`;
    params = [body.section, slug, name];
    statement = `WITH created AS (
      INSERT INTO categories (id, section, slug, name, position)
      SELECT $1 || ':' || $2, $1, $2, $3, COALESCE((SELECT MAX(position)+1 FROM categories WHERE section=$1),0)
      WHERE NOT EXISTS (SELECT 1 FROM categories WHERE section=$1 AND LOWER(name)=LOWER($3))
      RETURNING id, section
    ) INSERT INTO layout_sets (id, section, category_id)
      SELECT id, section, id FROM created RETURNING id`;
  } else if (method === "PUT") {
    params = [body.section, validateId(body.id), validateName(body.name)];
    statement = `UPDATE categories SET name=$3, updated_at=NOW()
      WHERE section=$1 AND slug=$2
      AND NOT EXISTS (SELECT 1 FROM categories other WHERE other.section=$1 AND other.slug<>$2 AND LOWER(other.name)=LOWER($3))
      RETURNING id`;
  } else if (method === "PATCH") {
    if (!Array.isArray(body.ids) || !body.ids.length || body.ids.length > 1000 || new Set(body.ids).size !== body.ids.length) invalid("카테고리 순서 목록을 확인해주세요.");
    body.ids.forEach(validateId);
    params = [body.section, body.ids];
    statement = `UPDATE categories c SET position=(payload.position-1)::integer, updated_at=NOW()
      FROM unnest($2::text[]) WITH ORDINALITY AS payload(slug, position)
      WHERE c.section=$1 AND c.slug=payload.slug
        AND (SELECT COUNT(*) FROM categories WHERE section=$1)=cardinality($2::text[])
        AND (SELECT COUNT(*) FROM categories WHERE section=$1 AND slug=ANY($2::text[]))=cardinality($2::text[])
      RETURNING c.id`;
  } else {
    invalid("지원하지 않는 카테고리 작업입니다.");
  }
  const [, changed] = await getSql().transaction((tx) => [
    // Serialize category writes with each other and content/layout mutations.
    tx`SELECT id FROM layout_sets ORDER BY id FOR UPDATE`,
    tx.query(statement, params),
  ]);
  if (!changed.length) throw new ContentApiError(409, "category_conflict", "같은 이름의 카테고리가 있거나 목록이 변경되었습니다. 목록을 다시 불러와주세요.");
  return { changedCount: changed.length };
};

module.exports = { getAdminCategories, writeAdminCategories };
