const { neon } = require("@neondatabase/serverless");
const { createSampleWorksConfig } = require("../../server/sampleWorksConfig");
const { loadLocalEnv } = require("./loadEnv");

loadLocalEnv();

const connectionString =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL_UNPOOLED or DATABASE_URL is required");
}

const sql = neon(connectionString);
const sample = createSampleWorksConfig();

const runBatch = async (queries, batchSize = 80) => {
  for (let index = 0; index < queries.length; index += batchSize) {
    const batch = queries.slice(index, index + batchSize);
    await sql.transaction((transaction) =>
      batch.map(({ text, params }) => transaction.query(text, params))
    );
  }
};

const seed = async () => {
  const categoryQueries = Object.entries(sample.categories).flatMap(
    ([section, categories]) =>
      categories
        .filter((category) => category.id !== "all")
        .map((category, position) => ({
          text: `
            INSERT INTO categories (id, section, slug, name, position)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO UPDATE SET
              name = EXCLUDED.name,
              position = EXCLUDED.position,
              updated_at = NOW()
          `,
          params: [
            `${section}:${category.id}`,
            section,
            category.id,
            category.name,
            position,
          ],
        }))
  );
  await runBatch(categoryQueries);

  const contentQueries = sample.contents.map((content) => ({
    text: `
      INSERT INTO contents (
        id,
        section,
        category_id,
        youtube_video_id,
        title,
        subtitle,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, 'published')
      ON CONFLICT (id) DO UPDATE SET
        category_id = EXCLUDED.category_id,
        youtube_video_id = EXCLUDED.youtube_video_id,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        updated_at = NOW()
    `,
    params: [
      content.id,
      content.section,
      `${content.section}:${content.categoryId}`,
      content.youtubeVideoId,
      content.title,
      content.subtitle,
    ],
  }));
  await runBatch(contentQueries);

  const layoutSetQueries = Object.entries(sample.layouts).flatMap(
    ([section, layouts]) =>
      Object.keys(layouts).map((categoryId) => ({
        text: `
          INSERT INTO layout_sets (id, section, category_id)
          VALUES ($1, $2, $3)
          ON CONFLICT (id) DO UPDATE SET
            category_id = EXCLUDED.category_id,
            updated_at = NOW()
        `,
        params: [
          `${section}:${categoryId}`,
          section,
          categoryId === "all" ? null : `${section}:${categoryId}`,
        ],
      }))
  );
  await runBatch(layoutSetQueries);

  const layoutItemQueries = Object.entries(sample.layouts).flatMap(
    ([section, layouts]) =>
      Object.entries(layouts).flatMap(([categoryId, items]) =>
        items.map((item) => ({
          text: `
            INSERT INTO layout_items (
              layout_set_id,
              content_id,
              desktop_position,
              mobile_position,
              desktop_column_span,
              desktop_row_span
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (layout_set_id, content_id) DO UPDATE SET
              desktop_position = EXCLUDED.desktop_position,
              mobile_position = EXCLUDED.mobile_position,
              desktop_column_span = EXCLUDED.desktop_column_span,
              desktop_row_span = EXCLUDED.desktop_row_span,
              updated_at = NOW()
          `,
          params: [
            `${section}:${categoryId}`,
            item.contentId,
            item.desktopPosition,
            item.mobilePosition,
            item.desktopColumnSpan,
            item.desktopRowSpan,
          ],
        }))
      )
  );
  await runBatch(layoutItemQueries);

  console.log(
    `seeded ${sample.contents.length} contents and ${layoutItemQueries.length} layout items`
  );
};

seed().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
