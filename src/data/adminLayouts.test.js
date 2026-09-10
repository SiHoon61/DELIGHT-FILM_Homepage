import {
  createAdminLayoutPayload,
  reorderAdminLayoutItems,
  sortAdminLayoutItems,
  toAdminLayoutItems,
} from "./adminLayouts";

const items = [
  {
    id: "a",
    desktopPosition: 0,
    mobilePosition: 1,
    columns: 2,
    rows: 1,
  },
  {
    id: "b",
    desktopPosition: 1,
    mobilePosition: 0,
    columns: 1,
    rows: 2,
  },
];

test("sorts PC and mobile layouts independently", () => {
  expect(sortAdminLayoutItems(items, "desktop").map((item) => item.id)).toEqual(["a", "b"]);
  expect(sortAdminLayoutItems(items, "mobile").map((item) => item.id)).toEqual(["b", "a"]);
});

test("reordering mobile does not change the PC order", () => {
  const reordered = reorderAdminLayoutItems({
    items,
    device: "mobile",
    draggedId: "a",
    dropId: "b",
  });

  expect(sortAdminLayoutItems(reordered, "mobile").map((item) => item.id)).toEqual(["a", "b"]);
  expect(sortAdminLayoutItems(reordered, "desktop").map((item) => item.id)).toEqual(["a", "b"]);
});

test("mobile save payload excludes PC card sizes", () => {
  expect(
    createAdminLayoutPayload({
      section: "video",
      categoryId: "all",
      device: "mobile",
      version: 7,
      items,
    })
  ).toEqual({
    section: "video",
    categoryId: "all",
    device: "mobile",
    version: 7,
    items: [
      { contentId: "b", position: 0 },
      { contentId: "a", position: 1 },
    ],
  });
});

test("maps the admin API response to layout cards", () => {
  expect(
    toAdminLayoutItems(
      [{
        contentId: "video-a",
        youtubeVideoId: "abcdefghijk",
        title: "Example",
        subtitle: null,
        contentCategoryId: "film",
        contentCategory: "Film",
        desktopPosition: 2,
        mobilePosition: 1,
        desktopColumnSpan: 3,
        desktopRowSpan: 2,
      }],
      "video"
    )[0]
  ).toMatchObject({
    id: "video-a",
    src: "abcdefghijk",
    section: "video",
    categoryId: "film",
    category: "Film",
    columns: 3,
    rows: 2,
  });
});
