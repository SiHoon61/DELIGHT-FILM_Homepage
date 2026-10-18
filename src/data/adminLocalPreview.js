import { createFallbackWorksConfig } from "./worksConfig";

// CRA development uses an in-memory preview. Production always uses the API.
export const isLocalAdminPreview =
  process.env.NODE_ENV === "development" && process.env.REACT_APP_ADMIN_USE_API !== "true";

let preview;
let nextId = 0;
const copy = (value) => JSON.parse(JSON.stringify(value));

const syncLayouts = (state) => {
  for (const [section, categories] of Object.entries(state.config.categories)) {
    for (const category of categories) {
      const eligible = state.items.filter((item) => item.section === section && item.status === "published"
        && (category.id === "all" || item.categoryId === category.id));
      const eligibleIds = new Set(eligible.map((item) => item.id));
      const previous = state.config.layouts[section][category.id] || [];
      const kept = previous.filter((item) => eligibleIds.has(item.contentId));
      const keptIds = new Set(kept.map((item) => item.contentId));
      const orderedIds = (key) => [
        ...[...kept].sort((a, b) => a[key] - b[key]).map((item) => item.contentId),
        ...eligible.filter((item) => !keptIds.has(item.id)).map((item) => item.id),
      ];
      const desktop = orderedIds("desktopPosition");
      const mobile = orderedIds("mobilePosition");
      const previousById = new Map(kept.map((item) => [item.contentId, item]));
      state.config.layouts[section][category.id] = desktop.map((id, position) => ({
        desktopColumnSpan: 1,
        desktopRowSpan: 1,
        ...previousById.get(id),
        contentId: id,
        desktopPosition: position,
        mobilePosition: mobile.indexOf(id),
      }));
    }
  }
};

const getPreview = () => {
  if (!preview) {
    const config = createFallbackWorksConfig();
    preview = {
      config,
      version: 1,
      items: config.contents.map((item, index) => ({
        ...item,
        src: item.youtubeVideoId,
        status: index > 0 && index % 25 === 0 ? "draft" : "published",
        duration: "",
      })),
    };
    syncLayouts(preview);
  }
  return preview;
};

export const readLocalContents = () => {
  const state = getPreview();
  return copy({
    items: state.items,
    categories: Object.entries(state.config.categories).flatMap(([section, categories]) =>
      categories.filter((category) => category.id !== "all").map((category) => ({ ...category, section }))),
  });
};

export const writeLocalCategories = (method, body) => {
  const state = getPreview();
  const categories = state.config.categories[body.section];
  if (!categories) throw new Error("콘텐츠 유형을 확인해주세요.");
  if (method === "POST" || method === "PUT") {
    const name = body.name?.trim();
    if (!name || name.length > 80 || name.toLowerCase() === "all") throw new Error("카테고리 이름은 All을 제외한 1~80자로 입력해주세요.");
    if (categories.some((category) => category.id !== body.id && category.name.toLowerCase() === name.toLowerCase())) throw new Error("이미 사용 중인 카테고리 이름입니다.");
    if (method === "POST") {
      const id = `category-local-${nextId++}`;
      categories.push({ id, name });
      state.config.layouts[body.section][id] = [];
    } else {
      const category = categories.find((item) => item.id === body.id && item.id !== "all");
      if (!category) throw new Error("카테고리를 찾지 못했습니다.");
      category.name = name;
      state.items = state.items.map((item) => item.section === body.section && item.categoryId === body.id ? { ...item, category: name } : item);
    }
  } else if (method === "PATCH") {
    const existing = categories.filter((category) => category.id !== "all");
    if (!Array.isArray(body.ids) || body.ids.length !== existing.length || new Set(body.ids).size !== existing.length || existing.some((category) => !body.ids.includes(category.id))) throw new Error("카테고리 순서 목록을 확인해주세요.");
    const byId = new Map(existing.map((category) => [category.id, category]));
    state.config.categories[body.section] = [categories.find((category) => category.id === "all"), ...body.ids.map((id) => byId.get(id))];
  } else {
    throw new Error("지원하지 않는 카테고리 작업입니다.");
  }
  state.version += 1;
  return { changedCount: method === "PATCH" ? body.ids.length : 1 };
};

export const writeLocalContents = (method, body) => {
  const state = getPreview();
  let changedCount = 0;
  const getCategory = (section, id) => {
    const category = state.config.categories[section]?.find((item) => item.id === id && id !== "all");
    if (!category) throw new Error("샘플 데이터에 있는 카테고리를 선택해주세요.");
    return category;
  };
  if (method === "POST" || method === "PUT") {
    const category = getCategory(body.section, body.categoryId);
    const original = state.items.find((item) => item.id === body.id);
    if (method === "PUT" && !original) throw new Error("수정할 샘플 콘텐츠를 찾지 못했습니다.");
    const unchangedVideo = original?.src === body.youtubeVideoId && original?.section === body.section;
    if (!unchangedVideo && state.items.some((item) => item.id !== body.id && item.section === body.section && item.src === body.youtubeVideoId)) {
      throw new Error("이미 등록된 영상입니다.");
    }
    const item = {
      ...body, id: original?.id || `local-${Date.now()}-${nextId++}`,
      src: body.youtubeVideoId, category: category.name,
    };
    state.items = method === "POST" ? [item, ...state.items] : state.items.map((current) => current.id === body.id ? item : current);
    changedCount = 1;
  } else if (method === "DELETE") {
    const before = state.items.length;
    state.items = state.items.filter((item) => item.id !== body.id);
    changedCount = before - state.items.length;
  } else if (method === "PATCH") {
    const selected = new Set(body.ids);
    const category = body.categoryId ? getCategory(body.section, body.categoryId) : null;
    state.items = state.items.map((item) => {
      if (!selected.has(item.id) || item.section !== body.section) return item;
      changedCount += 1;
      return {
        ...item,
        ...(category ? { categoryId: category.id, category: category.name } : {}),
        ...(body.status ? { status: body.status } : {}),
      };
    });
  }
  if (!changedCount) throw new Error("변경할 샘플 콘텐츠를 찾지 못했습니다.");
  syncLayouts(state);
  state.version += 1;
  return { changedCount };
};

export const readLocalLayout = ({ section, categoryId = "all" }) => {
  const state = getPreview();
  const layout = state.config.layouts[section]?.[categoryId];
  if (!layout) throw new Error("샘플 배치를 찾지 못했습니다.");
  const byId = new Map(state.items.map((item) => [item.id, item]));
  return copy({
    section, categoryId, version: state.version,
    items: layout.map((item) => ({
      ...item,
      youtubeVideoId: byId.get(item.contentId).src,
      title: byId.get(item.contentId).title,
      subtitle: byId.get(item.contentId).subtitle,
      contentCategoryId: byId.get(item.contentId).categoryId,
      contentCategory: byId.get(item.contentId).category,
    })),
  });
};

export const saveLocalLayout = ({ section, categoryId, version, device, items }) => {
  const state = getPreview();
  const current = readLocalLayout({ section, categoryId });
  if (version !== state.version) {
    const error = new Error("샘플 데이터가 변경되었습니다. 최신 배치를 다시 불러와주세요.");
    error.code = "layout_version_conflict";
    throw error;
  }
  const byId = new Map(items.map((item) => [item.contentId, item]));
  if (items.length !== current.items.length || byId.size !== current.items.length || current.items.some((item) => !byId.has(item.contentId))) {
    throw new Error("현재 배치의 모든 카드를 포함해주세요.");
  }
  state.config.layouts[section][categoryId] = state.config.layouts[section][categoryId].map((item) => {
    const updated = byId.get(item.contentId);
    return {
      ...item,
      ...(device === "desktop" ? {
        desktopPosition: updated.position,
        desktopColumnSpan: updated.columnSpan,
        desktopRowSpan: updated.rowSpan,
      } : { mobilePosition: updated.position }),
    };
  });
  state.version += 1;
  return { section, categoryId, device, version: state.version, updatedCount: items.length };
};
