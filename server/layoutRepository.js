const { getSql } = require("./db");

const SECTIONS = new Set(["video", "shorts"]);
const DEVICES = new Set(["desktop", "mobile"]);

class LayoutApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = "LayoutApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const normalizeScope = ({ section, categoryId }) => {
  if (!SECTIONS.has(section)) {
    throw new LayoutApiError(400, "invalid_section", "지원하지 않는 섹션입니다.");
  }

  const normalizedCategoryId = categoryId || "all";
  if (!/^[a-z0-9-]+$/.test(normalizedCategoryId)) {
    throw new LayoutApiError(400, "invalid_category", "카테고리 ID 형식이 올바르지 않습니다.");
  }

  return {
    section,
    categoryId: normalizedCategoryId,
    layoutSetId: `${section}:${normalizedCategoryId}`,
  };
};

const getLayoutScope = async ({ section, categoryId }) => {
  const scope = normalizeScope({ section, categoryId });
  const sql = getSql();
  const [layoutSets, items] = await sql.transaction(
    (transaction) => [
      transaction`
        SELECT id, section, version
        FROM layout_sets
        WHERE id = ${scope.layoutSetId}
      `,
      transaction`
        SELECT
          contents.id AS "contentId",
          contents.youtube_video_id AS "youtubeVideoId",
          contents.title,
          contents.subtitle,
          split_part(contents.category_id, ':', 2) AS "contentCategoryId",
          categories.name AS "contentCategory",
          layout_items.desktop_position AS "desktopPosition",
          layout_items.mobile_position AS "mobilePosition",
          layout_items.desktop_column_span AS "desktopColumnSpan",
          layout_items.desktop_row_span AS "desktopRowSpan"
        FROM layout_items
        JOIN contents ON contents.id = layout_items.content_id
        JOIN categories ON categories.id = contents.category_id
        WHERE layout_items.layout_set_id = ${scope.layoutSetId}
          AND contents.status = 'published'
        ORDER BY layout_items.desktop_position
      `,
    ],
    { readOnly: true }
  );

  if (!layoutSets.length) {
    throw new LayoutApiError(404, "layout_not_found", "배치 설정을 찾을 수 없습니다.");
  }

  return {
    section: scope.section,
    categoryId: scope.categoryId,
    version: layoutSets[0].version,
    items,
  };
};

const validateSavePayload = ({ device, version, items }, expectedContentIds) => {
  if (!DEVICES.has(device)) {
    throw new LayoutApiError(400, "invalid_device", "지원하지 않는 기기 유형입니다.");
  }
  if (!Number.isInteger(version) || version < 1) {
    throw new LayoutApiError(400, "invalid_version", "유효한 배치 버전이 필요합니다.");
  }
  if (!Array.isArray(items)) {
    throw new LayoutApiError(400, "invalid_items", "배치 항목 배열이 필요합니다.");
  }

  const expected = new Set(expectedContentIds);
  const received = new Set();
  const positions = new Set();

  for (const item of items) {
    if (!item || typeof item.contentId !== "string" || !expected.has(item.contentId)) {
      throw new LayoutApiError(400, "invalid_content", "배치에 포함할 수 없는 콘텐츠가 있습니다.");
    }
    if (received.has(item.contentId)) {
      throw new LayoutApiError(400, "duplicate_content", "동일한 콘텐츠가 중복되었습니다.");
    }
    if (!Number.isInteger(item.position) || item.position < 0) {
      throw new LayoutApiError(400, "invalid_position", "카드 순서는 0 이상의 정수여야 합니다.");
    }
    if (positions.has(item.position)) {
      throw new LayoutApiError(400, "duplicate_position", "카드 순서가 중복되었습니다.");
    }

    if (
      device === "desktop" &&
      (!Number.isInteger(item.columnSpan) ||
        item.columnSpan < 1 ||
        item.columnSpan > 4 ||
        !Number.isInteger(item.rowSpan) ||
        item.rowSpan < 1 ||
        item.rowSpan > 4)
    ) {
      throw new LayoutApiError(400, "invalid_size", "PC 카드 크기는 1에서 4 사이여야 합니다.");
    }

    received.add(item.contentId);
    positions.add(item.position);
  }

  if (received.size !== expected.size) {
    throw new LayoutApiError(
      400,
      "incomplete_layout",
      "현재 범위의 모든 콘텐츠를 포함해야 합니다.",
      { expected: expected.size, received: received.size }
    );
  }

  for (let position = 0; position < items.length; position += 1) {
    if (!positions.has(position)) {
      throw new LayoutApiError(400, "non_contiguous_positions", "카드 순서는 0부터 연속되어야 합니다.");
    }
  }

  return items.map((item) => ({
    content_id: item.contentId,
    position: item.position,
    ...(device === "desktop"
      ? {
          column_span: item.columnSpan,
          row_span: item.rowSpan,
        }
      : {}),
  }));
};

const saveLayoutScope = async ({ section, categoryId, device, version, items }) => {
  const normalizedScope = normalizeScope({ section, categoryId });
  const scope = await getLayoutScope(normalizedScope);
  const normalizedItems = validateSavePayload(
    { device, version, items },
    scope.items.map((item) => item.contentId)
  );
  const sql = getSql();

  const updateColumns = device === "desktop"
    ? `
        desktop_position = payload.position,
        desktop_column_span = payload.column_span,
        desktop_row_span = payload.row_span,
      `
    : `
        mobile_position = payload.position,
      `;
  const payloadColumns = device === "desktop"
    ? "content_id TEXT, position INTEGER, column_span SMALLINT, row_span SMALLINT"
    : "content_id TEXT, position INTEGER";

  const rows = await sql.query(
    `
      WITH target AS (
        UPDATE layout_sets
        SET version = version + 1, updated_at = NOW()
        WHERE id = $1 AND version = $2
        RETURNING id, version
      ),
      payload AS (
        SELECT *
        FROM jsonb_to_recordset($3::jsonb)
          AS item(${payloadColumns})
      ),
      updated AS (
        UPDATE layout_items
        SET
          ${updateColumns}
          updated_at = NOW()
        FROM payload, target
        WHERE layout_items.layout_set_id = target.id
          AND layout_items.content_id = payload.content_id
        RETURNING layout_items.content_id
      )
      SELECT
        target.version,
        (SELECT COUNT(*)::INTEGER FROM updated) AS updated_count
      FROM target
    `,
    [normalizedScope.layoutSetId, version, JSON.stringify(normalizedItems)]
  );

  if (!rows.length) {
    throw new LayoutApiError(
      409,
      "layout_version_conflict",
      "다른 변경사항이 먼저 저장되었습니다. 최신 배치를 다시 불러와주세요."
    );
  }
  if (rows[0].updated_count !== normalizedItems.length) {
    throw new LayoutApiError(500, "layout_update_incomplete", "일부 배치 항목이 저장되지 않았습니다.");
  }

  return {
    section: scope.section,
    categoryId: scope.categoryId,
    device,
    version: rows[0].version,
    updatedCount: rows[0].updated_count,
  };
};

module.exports = {
  LayoutApiError,
  getLayoutScope,
  normalizeScope,
  saveLayoutScope,
  validateSavePayload,
};
