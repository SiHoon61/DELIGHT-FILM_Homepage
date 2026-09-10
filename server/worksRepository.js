const { getSql } = require("./db");

const getWorksConfig = async () => {
  const sql = getSql();
  const [categoryRows, contentRows, layoutRows, versionRows] =
    await sql.transaction(
      (transaction) => [
        transaction`
          SELECT slug AS id, name, section
          FROM categories
          ORDER BY section, position, name
        `,
        transaction`
          SELECT
            id,
            section,
            split_part(category_id, ':', 2) AS "categoryId",
            youtube_video_id AS "youtubeVideoId",
            title,
            subtitle
          FROM contents
          WHERE status = 'published'
          ORDER BY section, created_at, id
        `,
        transaction`
          SELECT
            layout_sets.section,
            COALESCE(categories.slug, 'all') AS "categoryId",
            layout_items.content_id AS "contentId",
            layout_items.desktop_position AS "desktopPosition",
            layout_items.mobile_position AS "mobilePosition",
            layout_items.desktop_column_span AS "desktopColumnSpan",
            layout_items.desktop_row_span AS "desktopRowSpan"
          FROM layout_sets
          LEFT JOIN categories ON categories.id = layout_sets.category_id
          JOIN layout_items ON layout_items.layout_set_id = layout_sets.id
          JOIN contents ON contents.id = layout_items.content_id
          WHERE contents.status = 'published'
          ORDER BY
            layout_sets.section,
            COALESCE(categories.slug, 'all'),
            layout_items.desktop_position
        `,
        transaction`
          SELECT COALESCE(SUM(version), 0)::INTEGER AS version
          FROM layout_sets
        `,
      ],
      { readOnly: true }
    );

  const categories = { video: [], shorts: [] };
  for (const section of Object.keys(categories)) {
    categories[section].push({ id: "all", name: "All" });
  }
  for (const category of categoryRows) {
    categories[category.section]?.push({
      id: category.id,
      name: category.name,
    });
  }

  const layouts = { video: {}, shorts: {} };
  for (const [section, sectionCategories] of Object.entries(categories)) {
    for (const category of sectionCategories) {
      layouts[section][category.id] = [];
    }
  }
  for (const row of layoutRows) {
    layouts[row.section][row.categoryId]?.push({
      contentId: row.contentId,
      desktopPosition: row.desktopPosition,
      mobilePosition: row.mobilePosition,
      desktopColumnSpan: row.desktopColumnSpan,
      desktopRowSpan: row.desktopRowSpan,
    });
  }

  return {
    version: `db-${versionRows[0]?.version || 0}`,
    source: "database",
    categories,
    contents: contentRows.map((content) => ({
      ...content,
      category:
        categories[content.section]?.find(
          (category) => category.id === content.categoryId
        )?.name || "Other",
    })),
    layouts,
  };
};

module.exports = {
  getWorksConfig,
};
