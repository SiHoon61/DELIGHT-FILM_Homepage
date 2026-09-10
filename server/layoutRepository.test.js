const assert = require("node:assert/strict");
const test = require("node:test");

const {
  LayoutApiError,
  normalizeScope,
  validateSavePayload,
} = require("./layoutRepository");

const contentIds = ["video-a", "video-b"];

test("normalizeScope builds the ALL layout id", () => {
  assert.deepEqual(normalizeScope({ section: "video" }), {
    section: "video",
    categoryId: "all",
    layoutSetId: "video:all",
  });
});

test("desktop payload keeps order and card size", () => {
  assert.deepEqual(
    validateSavePayload(
      {
        device: "desktop",
        version: 1,
        items: [
          { contentId: "video-b", position: 0, columnSpan: 2, rowSpan: 1 },
          { contentId: "video-a", position: 1, columnSpan: 1, rowSpan: 3 },
        ],
      },
      contentIds
    ),
    [
      { content_id: "video-b", position: 0, column_span: 2, row_span: 1 },
      { content_id: "video-a", position: 1, column_span: 1, row_span: 3 },
    ]
  );
});

test("mobile payload only keeps order", () => {
  assert.deepEqual(
    validateSavePayload(
      {
        device: "mobile",
        version: 3,
        items: [
          { contentId: "video-a", position: 0 },
          { contentId: "video-b", position: 1 },
        ],
      },
      contentIds
    ),
    [
      { content_id: "video-a", position: 0 },
      { content_id: "video-b", position: 1 },
    ]
  );
});

test("rejects incomplete layouts", () => {
  assert.throws(
    () =>
      validateSavePayload(
        {
          device: "mobile",
          version: 1,
          items: [{ contentId: "video-a", position: 0 }],
        },
        contentIds
      ),
    (error) => error instanceof LayoutApiError && error.code === "incomplete_layout"
  );
});

test("rejects duplicate and non-contiguous positions", () => {
  assert.throws(
    () =>
      validateSavePayload(
        {
          device: "mobile",
          version: 1,
          items: [
            { contentId: "video-a", position: 0 },
            { contentId: "video-b", position: 0 },
          ],
        },
        contentIds
      ),
    (error) => error instanceof LayoutApiError && error.code === "duplicate_position"
  );

  assert.throws(
    () =>
      validateSavePayload(
        {
          device: "mobile",
          version: 1,
          items: [
            { contentId: "video-a", position: 0 },
            { contentId: "video-b", position: 2 },
          ],
        },
        contentIds
      ),
    (error) => error instanceof LayoutApiError && error.code === "non_contiguous_positions"
  );
});
