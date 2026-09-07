// YouTube의 실제 영상 메타데이터가 세로 비율인 항목만 관리합니다.
// 관리자 페이지가 연결되면 이 구분은 section 필드로 대체할 수 있습니다.
export const SHORTS_VIDEO_IDS = [
  "MTBdi7E-JMM",
  "EkQq3wIpX-c",
  "zIjW1rTJ35E",
];

export const VIDEO_CATEGORIES = [
  "All",
  "Film",
  "Commercial",
  "Music",
  "Aerial",
  "Broadcast",
  "Other",
];

export const SHORTS_CATEGORIES = [
  "All",
  "Commercial",
  "Travel",
  "Interview",
];

const shortsIdSet = new Set(SHORTS_VIDEO_IDS);

export const excludeShorts = (items = []) =>
  items.filter((item) => !shortsIdSet.has(item.src));

export const selectShorts = (...sections) =>
  sections.flat().filter((item) => shortsIdSet.has(item.src));

const SHORTS_METADATA = {
  "MTBdi7E-JMM": { category: "Commercial", subtitle: "" },
  "EkQq3wIpX-c": { category: "Travel", subtitle: "" },
  "zIjW1rTJ35E": { category: "Interview", subtitle: "" },
};

const matches = (title, keywords) =>
  keywords.some((keyword) => title.toLowerCase().includes(keyword.toLowerCase()));

const inferVideoCategory = (item, sourceSection) => {
  if (item.category) return item.category;
  if (sourceSection === "broadcast") return "Broadcast";

  const title = item.title || "";
  if (matches(title, ["단편영화", "드라마타이즈", "웹드라마"])) return "Film";
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
  ) return "Commercial";
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
  ) return "Music";
  if (
    matches(title, ["drone", "trajectory", "timelaps", "observatory"])
  ) return "Aerial";

  return "Other";
};

const normalizeItem = (item, section, category) => ({
  ...item,
  section,
  category,
  subtitle: item.subtitle || "",
});

export const createVideoCatalog = (videoItems = [], broadcastItems = []) => [
  ...excludeShorts(videoItems).map((item) =>
    normalizeItem(item, "video", inferVideoCategory(item, "video"))
  ),
  ...excludeShorts(broadcastItems).map((item) =>
    normalizeItem(item, "video", inferVideoCategory(item, "broadcast"))
  ),
];

export const createShortsCatalog = (videoItems = [], broadcastItems = []) =>
  selectShorts(videoItems, broadcastItems).map((item) => {
    const metadata = SHORTS_METADATA[item.src] || {};
    return normalizeItem(
      { ...item, subtitle: item.subtitle ?? metadata.subtitle ?? "" },
      "shorts",
      item.category || metadata.category || "Other"
    );
  });
