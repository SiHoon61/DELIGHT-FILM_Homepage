const workList = require("../src/workList.json");

const SHORTS_VIDEO_IDS = new Set([
  "MTBdi7E-JMM",
  "EkQq3wIpX-c",
  "zIjW1rTJ35E",
]);

const CATEGORY_DEFINITIONS = {
  video: [
    { id: "all", name: "All" },
    { id: "film", name: "Film" },
    { id: "commercial", name: "Commercial" },
    { id: "music", name: "Music" },
    { id: "aerial", name: "Aerial" },
    { id: "broadcast", name: "Broadcast" },
    { id: "other", name: "Other" },
  ],
  shorts: [
    { id: "all", name: "All" },
    { id: "commercial", name: "Commercial" },
    { id: "travel", name: "Travel" },
    { id: "interview", name: "Interview" },
  ],
};

const SHORTS_METADATA = {
  "MTBdi7E-JMM": { categoryId: "commercial", category: "Commercial" },
  "EkQq3wIpX-c": { categoryId: "travel", category: "Travel" },
  "zIjW1rTJ35E": { categoryId: "interview", category: "Interview" },
};

const matches = (title, keywords) =>
  keywords.some((keyword) => title.toLowerCase().includes(keyword.toLowerCase()));

const inferVideoCategory = (item, sourceSection) => {
  if (sourceSection === "broadcast") {
    return { categoryId: "broadcast", category: "Broadcast" };
  }

  const title = item.title || "";
  if (matches(title, ["단편영화", "드라마타이즈", "웹드라마"])) {
    return { categoryId: "film", category: "Film" };
  }
  if (
    matches(title, [
      "홍보",
      "광고",
      "commercial",
      "app",
      "어플",
      "기프티콘",
      "브랜드",
      "케어",
    ])
  ) {
    return { categoryId: "commercial", category: "Commercial" };
  }
  if (
    matches(title, [
      "라이브",
      "콘서트",
      "공연",
      "music",
      "highlight",
      "하이라이트",
      "연주곡",
    ])
  ) {
    return { categoryId: "music", category: "Music" };
  }
  if (matches(title, ["drone", "trajectory", "timelaps", "observatory"])) {
    return { categoryId: "aerial", category: "Aerial" };
  }

  return { categoryId: "other", category: "Other" };
};

const createContents = () => {
  const sourceItems = [
    ...(workList.videoJson || []).map((item) => ({ ...item, sourceSection: "video" })),
    ...(workList.broadcastJson || []).map((item) => ({ ...item, sourceSection: "broadcast" })),
  ];

  const video = sourceItems
    .filter((item) => !SHORTS_VIDEO_IDS.has(item.src))
    .map((item, index) => {
      const category = inferVideoCategory(item, item.sourceSection);
      return {
        id: `video-${item.src}-${index}`,
        section: "video",
        youtubeVideoId: item.src,
        title: item.title,
        subtitle: item.subtitle || "",
        ...category,
      };
    });

  const shorts = sourceItems
    .filter((item) => SHORTS_VIDEO_IDS.has(item.src))
    .map((item, index) => {
      const category = SHORTS_METADATA[item.src] || {
        categoryId: "other",
        category: "Other",
      };
      return {
        id: `shorts-${item.src}-${index}`,
        section: "shorts",
        youtubeVideoId: item.src,
        title: item.title,
        subtitle: item.subtitle || "",
        ...category,
      };
    });

  return [...video, ...shorts];
};

const createLayoutItems = (contents) =>
  contents.map((content, index) => ({
    contentId: content.id,
    desktopPosition: index,
    mobilePosition: index,
    desktopColumnSpan: index === 0 ? 2 : index < 3 ? 2 : 1,
    desktopRowSpan: index === 0 ? 2 : 1,
  }));

const createSectionLayouts = (contents, section, categories) => {
  const sectionContents = contents.filter((content) => content.section === section);

  return categories.reduce((layouts, category) => {
    const categoryContents = category.id === "all"
      ? sectionContents
      : sectionContents.filter((content) => content.categoryId === category.id);

    if (category.id === "all" || categoryContents.length > 0) {
      layouts[category.id] = createLayoutItems(categoryContents);
    }

    return layouts;
  }, {});
};

const createSampleWorksConfig = () => {
  const contents = createContents();
  const categories = Object.fromEntries(
    Object.entries(CATEGORY_DEFINITIONS).map(([section, definitions]) => [
      section,
      definitions.filter(
        (category) =>
          category.id === "all" ||
          contents.some(
            (content) =>
              content.section === section && content.categoryId === category.id
          )
      ),
    ])
  );

  return {
    version: "sample-v1",
    source: "sample",
    categories,
    contents,
    layouts: {
      video: createSectionLayouts(contents, "video", categories.video),
      shorts: createSectionLayouts(contents, "shorts", categories.shorts),
    },
  };
};

module.exports = {
  createSampleWorksConfig,
};
