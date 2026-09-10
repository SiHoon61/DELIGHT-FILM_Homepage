import workList from "../workList.json";
import {
  createShortsCatalog,
  createVideoCatalog,
  SHORTS_CATEGORIES,
  VIDEO_CATEGORIES,
} from "./workSections";

const toCategoryId = (category) => category.toLowerCase();

const createFallbackContents = () => {
  const video = createVideoCatalog(
    workList?.videoJson || [],
    workList?.broadcastJson || []
  ).map((item, index) => ({
    id: `video-${item.src}-${index}`,
    section: "video",
    categoryId: toCategoryId(item.category),
    category: item.category,
    youtubeVideoId: item.src,
    title: item.title,
    subtitle: item.subtitle || "",
  }));

  const shorts = createShortsCatalog(
    workList?.videoJson || [],
    workList?.broadcastJson || []
  ).map((item, index) => ({
    id: `shorts-${item.src}-${index}`,
    section: "shorts",
    categoryId: toCategoryId(item.category),
    category: item.category,
    youtubeVideoId: item.src,
    title: item.title,
    subtitle: item.subtitle || "",
  }));

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

const createFallbackSection = (contents, section, categoryNames) => {
  const sectionContents = contents.filter((content) => content.section === section);
  const categories = categoryNames
    .map((name) => ({ id: toCategoryId(name), name }))
    .filter(
      (category) =>
        category.id === "all" ||
        sectionContents.some((content) => content.categoryId === category.id)
    );

  const layouts = categories.reduce((result, category) => {
    const categoryContents = category.id === "all"
      ? sectionContents
      : sectionContents.filter((content) => content.categoryId === category.id);
    result[category.id] = createLayoutItems(categoryContents);
    return result;
  }, {});

  return { categories, layouts };
};

export const createFallbackWorksConfig = () => {
  const contents = createFallbackContents();
  const video = createFallbackSection(contents, "video", VIDEO_CATEGORIES);
  const shorts = createFallbackSection(contents, "shorts", SHORTS_CATEGORIES);

  return {
    version: "local-fallback-v1",
    source: "local-fallback",
    contents,
    categories: {
      video: video.categories,
      shorts: shorts.categories,
    },
    layouts: {
      video: video.layouts,
      shorts: shorts.layouts,
    },
  };
};

export const selectArrangedWorks = ({
  config,
  section,
  categoryId,
  isMobile,
}) => {
  const contentById = new Map(
    config.contents
      .filter((content) => content.section === section)
      .map((content) => [content.id, content])
  );
  const layout = config.layouts?.[section]?.[categoryId]
    || config.layouts?.[section]?.all
    || [];
  const positionKey = isMobile ? "mobilePosition" : "desktopPosition";

  return [...layout]
    .sort((left, right) => left[positionKey] - right[positionKey])
    .map((layoutItem) => {
      const content = contentById.get(layoutItem.contentId);
      if (!content) return null;

      return {
        ...content,
        src: content.youtubeVideoId,
        layout: layoutItem,
      };
    })
    .filter(Boolean);
};
