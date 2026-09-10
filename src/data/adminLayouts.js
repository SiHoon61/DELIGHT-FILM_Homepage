const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "배치 설정을 처리하지 못했습니다.");
    error.status = response.status;
    error.code = data.error;
    throw error;
  }

  return data;
};

export const fetchAdminLayout = async ({ section, categoryId, signal }) => {
  const search = new URLSearchParams({ section, category: categoryId });
  const response = await fetch(`/api/admin/layouts?${search.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  const data = await parseResponse(response);
  if (!Number.isInteger(data.version) || !Array.isArray(data.items)) {
    throw new Error("배치 API 응답 형식이 올바르지 않습니다. vercel dev로 실행했는지 확인해주세요.");
  }
  return data;
};

export const saveAdminLayout = async (payload) => {
  const response = await fetch("/api/admin/layouts", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseResponse(response);
  if (!Number.isInteger(data.version)) {
    throw new Error("저장 API 응답 형식이 올바르지 않습니다.");
  }
  return data;
};

export const toAdminLayoutItems = (items = [], section) =>
  items.map((item) => ({
    id: item.contentId,
    src: item.youtubeVideoId,
    title: item.title,
    subtitle: item.subtitle || "",
    section,
    categoryId: item.contentCategoryId,
    category: item.contentCategory,
    desktopPosition: item.desktopPosition,
    mobilePosition: item.mobilePosition,
    columns: item.desktopColumnSpan,
    rows: item.desktopRowSpan,
    crop: {
      desktop: { x: 50, y: 50, zoom: 100 },
      mobile: { x: 50, y: 50, zoom: 100 },
    },
  }));

export const sortAdminLayoutItems = (items, device) => {
  const positionKey = device === "mobile" ? "mobilePosition" : "desktopPosition";
  return [...items].sort((left, right) => left[positionKey] - right[positionKey]);
};

export const reorderAdminLayoutItems = ({ items, device, draggedId, dropId }) => {
  if (!draggedId || draggedId === dropId) return items;

  const positionKey = device === "mobile" ? "mobilePosition" : "desktopPosition";
  const ordered = sortAdminLayoutItems(items, device);
  const dragIndex = ordered.findIndex((item) => item.id === draggedId);
  const dropIndex = ordered.findIndex((item) => item.id === dropId);
  if (dragIndex < 0 || dropIndex < 0) return items;

  const [moved] = ordered.splice(dragIndex, 1);
  ordered.splice(dropIndex, 0, moved);
  const positionById = new Map(ordered.map((item, index) => [item.id, index]));

  return items.map((item) => ({
    ...item,
    [positionKey]: positionById.get(item.id),
  }));
};

export const createAdminLayoutPayload = ({
  section,
  categoryId,
  device,
  version,
  items,
}) => ({
  section,
  categoryId,
  device,
  version,
  items: sortAdminLayoutItems(items, device).map((item, position) => ({
    contentId: item.id,
    position,
    ...(device === "desktop"
      ? { columnSpan: item.columns, rowSpan: item.rows }
      : {}),
  })),
});
