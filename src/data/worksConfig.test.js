import { selectArrangedWorks } from "./worksConfig";

const config = {
  contents: [
    {
      id: "a",
      section: "video",
      categoryId: "film",
      category: "Film",
      youtubeVideoId: "youtube-a",
      title: "A",
    },
    {
      id: "b",
      section: "video",
      categoryId: "film",
      category: "Film",
      youtubeVideoId: "youtube-b",
      title: "B",
    },
  ],
  layouts: {
    video: {
      all: [
        {
          contentId: "a",
          desktopPosition: 0,
          mobilePosition: 1,
          desktopColumnSpan: 2,
          desktopRowSpan: 2,
        },
        {
          contentId: "b",
          desktopPosition: 1,
          mobilePosition: 0,
          desktopColumnSpan: 1,
          desktopRowSpan: 1,
        },
      ],
      film: [
        {
          contentId: "b",
          desktopPosition: 0,
          mobilePosition: 1,
          desktopColumnSpan: 2,
          desktopRowSpan: 1,
        },
        {
          contentId: "a",
          desktopPosition: 1,
          mobilePosition: 0,
          desktopColumnSpan: 1,
          desktopRowSpan: 1,
        },
      ],
    },
  },
};

test("selects the independent desktop order and size for a category", () => {
  const result = selectArrangedWorks({
    config,
    section: "video",
    categoryId: "film",
    isMobile: false,
  });

  expect(result.map((item) => item.id)).toEqual(["b", "a"]);
  expect(result[0].layout.desktopColumnSpan).toBe(2);
});

test("selects the mobile order without changing desktop size metadata", () => {
  const result = selectArrangedWorks({
    config,
    section: "video",
    categoryId: "all",
    isMobile: true,
  });

  expect(result.map((item) => item.id)).toEqual(["b", "a"]);
  expect(result[1].layout.desktopRowSpan).toBe(2);
});
