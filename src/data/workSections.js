// YouTube의 실제 영상 메타데이터가 세로 비율인 항목만 관리합니다.
// 관리자 페이지가 연결되면 이 구분은 section 필드로 대체할 수 있습니다.
export const SHORTS_VIDEO_IDS = [
  "MTBdi7E-JMM",
  "EkQq3wIpX-c",
  "zIjW1rTJ35E",
];

const shortsIdSet = new Set(SHORTS_VIDEO_IDS);

export const excludeShorts = (items = []) =>
  items.filter((item) => !shortsIdSet.has(item.src));

export const selectShorts = (...sections) =>
  sections.flat().filter((item) => shortsIdSet.has(item.src));
