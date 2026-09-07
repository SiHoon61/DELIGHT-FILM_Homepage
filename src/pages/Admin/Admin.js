import React, { useMemo, useState } from "react";

import workList from "../../workList.json";
import mainVideo from "../../assets/Home/mainVideo.mp4";
import aboutImage from "../../assets/About/aboutImg.svg";
import { images as photoSources } from "../../components/Photo/Photo";
import {
  createShortsCatalog,
  createVideoCatalog,
  SHORTS_CATEGORIES,
  VIDEO_CATEGORIES,
} from "../../data/workSections";
import {
  ActionButton,
  AdminShell,
  Aside,
  AsideFooter,
  AsideHeader,
  Badge,
  AssetPanel,
  AssetPreview,
  Brand,
  BrandMark,
  ButtonGroup,
  CategoryCard,
  CategoryCount,
  CategoryGrid,
  CategoryItem,
  CategoryList,
  CropPreview,
  CropPreviewImage,
  Content,
  ContentHeader,
  ControlButton,
  DeviceButton,
  DeviceSwitch,
  DimensionButton,
  DimensionControl,
  EmptyState,
  Field,
  FileInput,
  FormGrid,
  FormLabel,
  GhostButton,
  GridCard,
  GridCardImage,
  GridCardInfo,
  HelpText,
  HomeVideo,
  HomeVideoGrid,
  IconButton,
  Input,
  LayoutCanvas,
  LayoutHeader,
  LayoutInspector,
  LayoutPanel,
  LayoutSelection,
  Main,
  ManagementGrid,
  ManagementPanel,
  Metric,
  MetricLabel,
  MetricRow,
  MetricValue,
  MobileHeader,
  MobileNav,
  MobileOrderNote,
  Nav,
  NavButton,
  PageDescription,
  PageTitle,
  Panel,
  PhotoCard,
  PhotoGrid,
  PhotoImage,
  PhotoOverlay,
  PhotoToolbar,
  PreviewFrame,
  PreviewImage,
  PreviewPlaceholder,
  RangeControl,
  ResolutionNote,
  RowActions,
  SearchInput,
  Select,
  Sidebar,
  SiteLink,
  SizeBadge,
  StatusDot,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tab,
  Tabs,
  TextArea,
  TextEditor,
  Thumbnail,
  Toast,
  Toolbar,
  Topbar,
  TopbarActions,
  UploadButton,
  VideoSlot,
  VideoSlotHeader,
  VideoIdentity,
} from "./style";

const initialVideoItems = createVideoCatalog(
  workList.videoJson || [],
  workList.broadcastJson || []
).map((item, index) => ({
  ...item,
  id: `video-${item.src}-${index}`,
  status: index < 118 ? "published" : "draft",
}));

const initialShortsItems = createShortsCatalog(
  workList.videoJson || [],
  workList.broadcastJson || []
).map((item, index) => ({
  ...item,
  id: `shorts-${item.src}-${index}`,
  status: "published",
}));

const INITIAL_WORKS = [...initialVideoItems, ...initialShortsItems];

const createLayoutItem = (item, index) => ({
  ...item,
  columns: index === 0 ? 2 : index < 3 ? 2 : 1,
  rows: index === 0 ? 2 : 1,
  crop: {
    desktop: { x: 50, y: 50, zoom: 100 },
    mobile: { x: 50, y: 50, zoom: 100 },
  },
});

const LAYOUT_SEED = [
  ...initialVideoItems.map(createLayoutItem),
  ...initialShortsItems.map(createLayoutItem),
];

const INITIAL_PHOTOS = photoSources.map((src, index) => ({
  id: `photo-${index}`,
  src,
  name: src.split("/").pop(),
  status: "published",
}));

const NAV_ITEMS = [
  { id: "content", label: "콘텐츠", index: "01" },
  { id: "categories", label: "카테고리", index: "02" },
  { id: "layout", label: "화면 배치", index: "03" },
  { id: "photos", label: "Photo 관리", index: "04" },
  { id: "home", label: "메인 영상", index: "05" },
  { id: "about", label: "About 관리", index: "06" },
];

const SECTION_LABELS = {
  video: "Video",
  shorts: "Shorts",
  photo: "Photo",
};

const extractYouTubeId = (value) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }
    if (url.searchParams.get("v")) return url.searchParams.get("v");
    const parts = url.pathname.split("/").filter(Boolean);
    const marker = parts.findIndex((part) => ["shorts", "embed", "live"].includes(part));
    return marker >= 0 ? parts[marker + 1] || "" : "";
  } catch {
    return "";
  }
};

const Admin = () => {
  const [activeView, setActiveView] = useState("content");
  const [section, setSection] = useState("video");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [works, setWorks] = useState(INITIAL_WORKS);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [device, setDevice] = useState("desktop");
  const [layoutSection, setLayoutSection] = useState("video");
  const [layoutCategory, setLayoutCategory] = useState("All");
  const [layoutItems, setLayoutItems] = useState(LAYOUT_SEED);
  const [selectedLayoutId, setSelectedLayoutId] = useState(LAYOUT_SEED[0]?.id);
  const [draggedLayoutId, setDraggedLayoutId] = useState(null);
  const [isLayoutEditorOpen, setIsLayoutEditorOpen] = useState(false);
  const [layoutDraft, setLayoutDraft] = useState(null);
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [photoDragIndex, setPhotoDragIndex] = useState(null);
  const [homeVideos, setHomeVideos] = useState({
    desktop: { src: mainVideo, name: "mainVideo.mp4" },
    mobile: { src: mainVideo, name: "모바일 영상 미등록 · PC 영상 사용 중" },
  });
  const [aboutImagePreview, setAboutImagePreview] = useState(aboutImage);
  const [aboutHeadline, setAboutHeadline] = useState("안녕하세요, 딜라이트 필름의 김주환 입니다.");
  const [aboutBody, setAboutBody] = useState(
    "딜라이트 필름은 분야를 가리지 않고, 다양한 영상을 제작하는 영상 제작 프로덕션입니다.\n\n콘서트, 이벤트, 세미나 등의 라이브 중계부터 드론 촬영, 유튜브 예능, TVCF제작, 홈쇼핑 제작, 웹드라마와 단편영화 촬영까지 장르를 넘나드는 다양한 프로젝트를 진행하고 있습니다.\n\n딜라이트 필름은 고객과의 소통을 가장 중시하며, 항상 기대 이상의 결과를 만들어내기 위해 최선을 다하고 있습니다.\n\n감사합니다."
  );
  const [toast, setToast] = useState("");
  const [videoCategories, setVideoCategories] = useState(
    VIDEO_CATEGORIES.filter((category) => category !== "All")
  );
  const [shortsCategories, setShortsCategories] = useState(
    SHORTS_CATEGORIES.filter((category) => category !== "All")
  );
  const [newCategory, setNewCategory] = useState({ video: "", shorts: "" });
  const [draft, setDraft] = useState({
    sourceUrl: "",
    title: "",
    subtitle: "",
    section: "video",
    category: "Commercial",
    status: "draft",
  });
  const [formError, setFormError] = useState("");

  const parsedVideoId = extractYouTubeId(draft.sourceUrl);
  const currentCategories = draft.section === "shorts"
    ? shortsCategories
    : videoCategories;

  const filteredWorks = useMemo(() => {
    if (section === "photo") return [];
    return works.filter((item) => {
      const matchesSection = item.section === section;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const keyword = search.trim().toLowerCase();
      const matchesSearch = !keyword ||
        item.title.toLowerCase().includes(keyword) ||
        (item.subtitle || "").toLowerCase().includes(keyword);
      return matchesSection && matchesStatus && matchesSearch;
    });
  }, [section, search, statusFilter, works]);

  const counts = {
    video: works.filter((item) => item.section === "video").length,
    shorts: works.filter((item) => item.section === "shorts").length,
    photo: photos.length,
  };
  const layoutCategories = [
    "All",
    ...(layoutSection === "shorts" ? shortsCategories : videoCategories),
  ].filter((category, index, categories) =>
    categories.indexOf(category) === index &&
    (category === "All" || layoutItems.some((item) =>
      item.section === layoutSection && item.category === category
    ))
  );
  const visibleLayoutItems = layoutItems.filter((item) =>
    item.section === layoutSection &&
    (layoutCategory === "All" || item.category === layoutCategory)
  );
  const selectedLayoutItem = visibleLayoutItems.find((item) => item.id === selectedLayoutId) || visibleLayoutItems[0];
  const layoutDraftCategories = layoutDraft?.section === "shorts"
    ? shortsCategories
    : videoCategories;
  const activeCropDraft = layoutDraft?.crop?.[device] || { x: 50, y: 50, zoom: 100 };

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const openEditor = () => {
    setDraft({
      sourceUrl: "",
      title: "",
      subtitle: "",
      section: section === "photo" ? "video" : section,
      category: section === "shorts" ? shortsCategories[0] : videoCategories[0],
      status: "draft",
    });
    setFormError("");
    setIsEditorOpen(true);
  };

  const updateDraft = (field, value) => {
    setDraft((current) => {
      if (field === "section") {
        const options = value === "shorts" ? shortsCategories : videoCategories;
        return { ...current, section: value, category: options[0] || "" };
      }
      return { ...current, [field]: value };
    });
  };

  const saveDraft = (event) => {
    event.preventDefault();
    if (!parsedVideoId) {
      setFormError("올바른 YouTube 링크를 입력해주세요.");
      return;
    }
    if (!draft.title.trim()) {
      setFormError("작품 제목을 입력해주세요.");
      return;
    }

    const newItem = {
      id: `preview-${Date.now()}`,
      src: parsedVideoId,
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim(),
      section: draft.section,
      category: draft.category,
      status: draft.status,
    };
    setWorks((current) => [newItem, ...current]);
    setSection(draft.section);
    setIsEditorOpen(false);
    notify(draft.status === "published" ? "작품이 공개 목록에 추가되었습니다." : "임시저장 목록에 추가되었습니다.");
  };

  const addCategory = (targetSection) => {
    const value = newCategory[targetSection].trim();
    if (!value) return;
    const setter = targetSection === "video" ? setVideoCategories : setShortsCategories;
    setter((current) => current.includes(value) ? current : [...current, value]);
    setNewCategory((current) => ({ ...current, [targetSection]: "" }));
    notify(`${value} 카테고리를 추가했습니다.`);
  };

  const reorderLayout = (dropId) => {
    if (!draggedLayoutId || draggedLayoutId === dropId) return;
    setLayoutItems((current) => {
      const next = [...current];
      const dragIndex = next.findIndex((item) => item.id === draggedLayoutId);
      const dropIndex = next.findIndex((item) => item.id === dropId);
      if (dragIndex < 0 || dropIndex < 0) return current;
      const [moved] = next.splice(dragIndex, 1);
      next.splice(dropIndex, 0, moved);
      return next;
    });
    setDraggedLayoutId(null);
  };

  const setLayoutDimension = (id, dimension, value) => {
    setLayoutItems((current) => current.map((item) =>
      item.id === id ? { ...item, [dimension]: value } : item
    ));
  };

  const changeLayoutSection = (nextSection) => {
    setLayoutSection(nextSection);
    setLayoutCategory("All");
    const firstItem = layoutItems.find((item) => item.section === nextSection);
    setSelectedLayoutId(firstItem?.id);
  };

  const changeLayoutCategory = (nextCategory) => {
    setLayoutCategory(nextCategory);
    const firstItem = layoutItems.find((item) =>
      item.section === layoutSection &&
      (nextCategory === "All" || item.category === nextCategory)
    );
    setSelectedLayoutId(firstItem?.id);
  };

  const openLayoutEditor = (item) => {
    const crop = item.crop || {
      desktop: { x: 50, y: 50, zoom: 100 },
      mobile: { x: 50, y: 50, zoom: 100 },
    };
    setLayoutDraft({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle || "",
      section: item.section,
      category: item.category,
      crop: {
        desktop: { ...crop.desktop },
        mobile: { ...crop.mobile },
      },
    });
    setIsLayoutEditorOpen(true);
  };

  const updateLayoutDraft = (field, value) => {
    setLayoutDraft((current) => {
      if (!current) return current;
      if (field === "section") {
        const categories = value === "shorts" ? shortsCategories : videoCategories;
        return { ...current, section: value, category: categories[0] || "" };
      }
      return { ...current, [field]: value };
    });
  };

  const updateCropDraft = (field, value) => {
    setLayoutDraft((current) => current ? ({
      ...current,
      crop: {
        ...current.crop,
        [device]: {
          ...current.crop[device],
          [field]: Number(value),
        },
      },
    }) : current);
  };

  const resetCropDraft = () => {
    setLayoutDraft((current) => current ? ({
      ...current,
      crop: {
        ...current.crop,
        [device]: { x: 50, y: 50, zoom: 100 },
      },
    }) : current);
  };

  const saveLayoutDetails = (event) => {
    event.preventDefault();
    if (!layoutDraft?.title.trim()) return;
    setLayoutItems((current) => current.map((item) =>
      item.id === layoutDraft.id
        ? { ...item, ...layoutDraft, title: layoutDraft.title.trim(), subtitle: layoutDraft.subtitle.trim() }
        : item
    ));
    setWorks((current) => current.map((item) =>
      item.id === layoutDraft.id
        ? { ...item, title: layoutDraft.title.trim(), subtitle: layoutDraft.subtitle.trim(), section: layoutDraft.section, category: layoutDraft.category }
        : item
    ));
    setLayoutSection(layoutDraft.section);
    setLayoutCategory("All");
    setSelectedLayoutId(layoutDraft.id);
    setIsLayoutEditorOpen(false);
    notify("카드 상세 설정을 임시저장했습니다.");
  };

  const addPhotos = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const additions = files.map((file, index) => ({
      id: `preview-photo-${Date.now()}-${index}`,
      src: URL.createObjectURL(file),
      name: file.name,
      status: "draft",
    }));
    setPhotos((current) => [...additions, ...current]);
    notify(`${files.length}장의 사진을 임시 목록에 추가했습니다.`);
    event.target.value = "";
  };

  const reorderPhotos = (dropIndex) => {
    if (photoDragIndex === null || photoDragIndex === dropIndex) return;
    setPhotos((current) => {
      const next = [...current];
      const [moved] = next.splice(photoDragIndex, 1);
      next.splice(dropIndex, 0, moved);
      return next;
    });
    setPhotoDragIndex(null);
  };

  const togglePhotoStatus = (id) => {
    setPhotos((current) => current.map((photo) =>
      photo.id === id
        ? { ...photo, status: photo.status === "published" ? "hidden" : "published" }
        : photo
    ));
  };

  const replaceHomeVideo = (event, target) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setHomeVideos((current) => ({
      ...current,
      [target]: { src: URL.createObjectURL(file), name: file.name },
    }));
    notify(`${target === "desktop" ? "PC" : "모바일"} 메인 영상 미리보기를 교체했습니다.`);
    event.target.value = "";
  };

  const replaceAboutImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAboutImagePreview(URL.createObjectURL(file));
    notify("About 사진 미리보기를 교체했습니다.");
    event.target.value = "";
  };

  const renderContent = () => (
    <>
      <ContentHeader>
        <div>
          <PageTitle>콘텐츠</PageTitle>
          <PageDescription>작품 정보와 공개 상태를 관리합니다.</PageDescription>
        </div>
        <ActionButton type="button" onClick={openEditor}>
          <span>＋</span> 새 작품 등록
        </ActionButton>
      </ContentHeader>

      <MetricRow>
        {Object.entries(counts).map(([key, value]) => (
          <Metric key={key} $active={section === key} onClick={() => setSection(key)}>
            <MetricLabel>{SECTION_LABELS[key]}</MetricLabel>
            <MetricValue>{String(value).padStart(2, "0")}</MetricValue>
          </Metric>
        ))}
      </MetricRow>

      <Panel>
        <Toolbar>
          <Tabs aria-label="콘텐츠 유형">
            {Object.keys(SECTION_LABELS).map((key) => (
              <Tab
                type="button"
                key={key}
                $active={section === key}
                onClick={() => setSection(key)}
              >
                {SECTION_LABELS[key]}
              </Tab>
            ))}
          </Tabs>
          <ButtonGroup>
            <Select
              aria-label="공개 상태 필터"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">모든 상태</option>
              <option value="published">공개</option>
              <option value="draft">임시저장</option>
            </Select>
            <SearchInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="작품 검색"
              aria-label="작품 검색"
            />
          </ButtonGroup>
        </Toolbar>

        {section === "photo" ? (
          <EmptyState>
            <strong>Photo 전용 관리 화면에서 수정할 수 있습니다.</strong>
            <span>현재 등록된 사진은 {photos.length}장입니다.</span>
            <ActionButton type="button" onClick={() => setActiveView("photos")}>Photo 관리로 이동</ActionButton>
          </EmptyState>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>작품</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>순서</TableHead>
                <TableHead aria-label="관리" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorks.slice(0, 9).map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <VideoIdentity>
                      <Thumbnail
                        src={`https://img.youtube.com/vi/${item.src}/mqdefault.jpg`}
                        alt=""
                      />
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.subtitle || "서브타이틀 없음"}</span>
                      </div>
                    </VideoIdentity>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge $status={item.status}>
                      <StatusDot />
                      {item.status === "published" ? "공개" : "임시저장"}
                    </Badge>
                  </TableCell>
                  <TableCell>{String(index + 1).padStart(2, "0")}</TableCell>
                  <TableCell>
                    <RowActions>
                      <IconButton type="button" aria-label={`${item.title} 수정`}>•••</IconButton>
                    </RowActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Panel>
    </>
  );

  const renderCategories = () => (
    <>
      <ContentHeader>
        <div>
          <PageTitle>카테고리</PageTitle>
          <PageDescription>아코디언에 표시할 이름과 순서를 관리합니다.</PageDescription>
        </div>
      </ContentHeader>
      <CategoryGrid>
        {[
          ["video", "Video", videoCategories],
          ["shorts", "Shorts", shortsCategories],
        ].map(([key, label, categories]) => (
          <CategoryCard key={key}>
            <ContentHeader>
              <div>
                <PageTitle as="h2">{label}</PageTitle>
                <PageDescription>{categories.length}개의 세부 카테고리</PageDescription>
              </div>
              <CategoryCount>{String(categories.length).padStart(2, "0")}</CategoryCount>
            </ContentHeader>
            <CategoryList>
              {categories.map((category, index) => (
                <CategoryItem key={category}>
                  <span className="handle">⠿</span>
                  <strong>{category}</strong>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <IconButton type="button" aria-label={`${category} 메뉴`}>•••</IconButton>
                </CategoryItem>
              ))}
            </CategoryList>
            <FormGrid as="div" $compact>
              <Input
                value={newCategory[key]}
                onChange={(event) => setNewCategory((current) => ({
                  ...current,
                  [key]: event.target.value,
                }))}
                onKeyDown={(event) => {
                  if (event.key === "Enter") addCategory(key);
                }}
                placeholder="새 카테고리 이름"
                aria-label={`${label} 새 카테고리 이름`}
              />
              <ControlButton type="button" onClick={() => addCategory(key)}>추가</ControlButton>
            </FormGrid>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </>
  );

  const renderLayout = () => (
    <>
      <ContentHeader>
        <div>
          <PageTitle>화면 배치</PageTitle>
          <PageDescription>카드를 끌어서 순서를 바꾸고 PC 블록 크기를 지정합니다.</PageDescription>
        </div>
        <ActionButton type="button" onClick={() => notify("배치 변경사항을 임시저장했습니다.")}>변경사항 저장</ActionButton>
      </ContentHeader>
      <LayoutPanel>
        <LayoutHeader>
          <Tabs aria-label="배치 콘텐츠 유형">
            {[["video", "Video"], ["shorts", "Shorts"]].map(([key, label]) => (
              <Tab type="button" key={key} $active={layoutSection === key} onClick={() => changeLayoutSection(key)}>{label}</Tab>
            ))}
          </Tabs>
          <Select
            aria-label="배치 카테고리"
            value={layoutCategory}
            onChange={(event) => changeLayoutCategory(event.target.value)}
          >
            {layoutCategories.map((category) => <option key={category}>{category}</option>)}
          </Select>
          <DeviceSwitch>
            <DeviceButton type="button" $active={device === "desktop"} onClick={() => setDevice("desktop")}>PC</DeviceButton>
            <DeviceButton type="button" $active={device === "mobile"} onClick={() => setDevice("mobile")}>Mobile</DeviceButton>
          </DeviceSwitch>
        </LayoutHeader>
        {selectedLayoutItem && (
          <LayoutInspector>
            <LayoutSelection>
              <Thumbnail
                src={`https://img.youtube.com/vi/${selectedLayoutItem.src}/mqdefault.jpg`}
                alt=""
                style={{ objectPosition: `${selectedLayoutItem.crop?.[device]?.x || 50}% ${selectedLayoutItem.crop?.[device]?.y || 50}%` }}
              />
              <div>
                <span>{layoutSection === "shorts" ? "Shorts" : "Video"} · {layoutCategory}</span>
                <strong>{selectedLayoutItem.title}</strong>
                <small>{device === "desktop" ? `${selectedLayoutItem.columns}×${selectedLayoutItem.rows}` : "모바일 노출 순서 편집"}</small>
              </div>
            </LayoutSelection>
            {device === "desktop" ? (
              <>
                <DimensionControl>
                  <span>가로</span>
                  <ButtonGroup>
                    {[1, 2, 3, 4].map((value) => (
                      <DimensionButton
                        type="button"
                        key={value}
                        $active={selectedLayoutItem.columns === value}
                        onClick={() => setLayoutDimension(selectedLayoutItem.id, "columns", value)}
                      >{value}</DimensionButton>
                    ))}
                  </ButtonGroup>
                </DimensionControl>
                <DimensionControl>
                  <span>세로</span>
                  <ButtonGroup>
                    {[1, 2, 3, 4].map((value) => (
                      <DimensionButton
                        type="button"
                        key={value}
                        $active={selectedLayoutItem.rows === value}
                        onClick={() => setLayoutDimension(selectedLayoutItem.id, "rows", value)}
                      >{value}</DimensionButton>
                    ))}
                  </ButtonGroup>
                </DimensionControl>
              </>
            ) : (
              <MobileOrderNote>모바일은 카드 순서와 썸네일 위치만 관리합니다.</MobileOrderNote>
            )}
            <GhostButton type="button" onClick={() => openLayoutEditor(selectedLayoutItem)}>세부 편집</GhostButton>
          </LayoutInspector>
        )}
        <LayoutCanvas $device={device} $section={layoutSection}>
          {visibleLayoutItems.map((item, index) => {
            const crop = item.crop?.[device] || { x: 50, y: 50, zoom: 100 };
            return (
            <GridCard
              key={item.id}
              draggable
              onDragStart={() => setDraggedLayoutId(item.id)}
              onDragEnd={() => setDraggedLayoutId(null)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => reorderLayout(item.id)}
              onClick={() => setSelectedLayoutId(item.id)}
              $columns={device === "mobile" ? 1 : item.columns}
              $rows={device === "mobile" ? 1 : item.rows}
              $device={device}
              $section={layoutSection}
              $selected={selectedLayoutItem.id === item.id}
            >
              <GridCardImage
                src={`https://img.youtube.com/vi/${item.src}/mqdefault.jpg`}
                alt=""
                $cropX={crop.x}
                $cropY={crop.y}
                $zoom={crop.zoom}
              />
              {device === "desktop" && <SizeBadge>{item.columns}×{item.rows}</SizeBadge>}
              <GridCardInfo>
                <span>{String(index + 1).padStart(2, "0")} · {item.category}</span>
                <strong>{item.title}</strong>
              </GridCardInfo>
            </GridCard>
          )})}
        </LayoutCanvas>
      </LayoutPanel>
    </>
  );

  const renderPhotos = () => (
    <>
      <ContentHeader>
        <div>
          <PageTitle>Photo 관리</PageTitle>
          <PageDescription>사진을 추가하고 드래그하여 노출 순서를 변경합니다.</PageDescription>
        </div>
        <UploadButton as="label">
          <span>＋</span> 사진 추가
          <FileInput type="file" accept="image/*" multiple onChange={addPhotos} />
        </UploadButton>
      </ContentHeader>
      <Panel>
        <PhotoToolbar>
          <div><strong>{photos.length}</strong><span>전체 사진</span></div>
          <p>상태 버튼을 눌러 공개 여부를 변경할 수 있습니다.</p>
        </PhotoToolbar>
        <PhotoGrid>
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              draggable
              onDragStart={() => setPhotoDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => reorderPhotos(index)}
            >
              <PhotoImage src={photo.src} alt="" />
              <PhotoOverlay>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <button type="button" onClick={() => togglePhotoStatus(photo.id)}>
                  {photo.status === "published" ? "공개" : photo.status === "draft" ? "임시" : "숨김"}
                </button>
              </PhotoOverlay>
            </PhotoCard>
          ))}
        </PhotoGrid>
      </Panel>
    </>
  );

  const renderHome = () => (
    <>
      <ContentHeader>
        <div>
          <PageTitle>메인 영상</PageTitle>
          <PageDescription>홈 첫 화면에서 자동 재생되는 영상을 교체합니다.</PageDescription>
        </div>
        <ActionButton type="button" onClick={() => notify("메인 영상 변경사항을 임시저장했습니다.")}>변경사항 저장</ActionButton>
      </ContentHeader>
      <HomeVideoGrid>
        <VideoSlot>
          <VideoSlotHeader>
            <div><Badge $status="published"><StatusDot />PC</Badge><strong>가로형 메인 영상</strong></div>
            <span>16:9</span>
          </VideoSlotHeader>
          <HomeVideo src={homeVideos.desktop.src} muted autoPlay loop playsInline controls />
          <ResolutionNote>
            <strong>권장 해상도 1920 × 1080</strong>
            <span>MP4(H.264) · 16:9 · 화면 중앙에 주요 피사체 배치</span>
          </ResolutionNote>
          <Field>
            <FormLabel>현재 파일</FormLabel>
            <Input value={homeVideos.desktop.name} readOnly />
          </Field>
          <UploadButton as="label">
            PC 영상 교체
            <FileInput type="file" accept="video/mp4,video/webm" onChange={(event) => replaceHomeVideo(event, "desktop")} />
          </UploadButton>
        </VideoSlot>

        <VideoSlot $mobile>
          <VideoSlotHeader>
            <div><Badge><StatusDot />Mobile</Badge><strong>세로형 메인 영상</strong></div>
            <span>9:16</span>
          </VideoSlotHeader>
          <HomeVideo $mobile src={homeVideos.mobile.src} muted autoPlay loop playsInline controls />
          <ResolutionNote>
            <strong>권장 해상도 1080 × 1920</strong>
            <span>MP4(H.264) · 9:16 · 모바일 화면 중앙 기준으로 편집</span>
          </ResolutionNote>
          <Field>
            <FormLabel>현재 파일</FormLabel>
            <Input value={homeVideos.mobile.name} readOnly />
          </Field>
          <UploadButton as="label">
            모바일 영상 교체
            <FileInput type="file" accept="video/mp4,video/webm" onChange={(event) => replaceHomeVideo(event, "mobile")} />
          </UploadButton>
        </VideoSlot>
      </HomeVideoGrid>
      <SiteLink href="/" target="_blank" rel="noreferrer">메인 페이지에서 확인 ↗</SiteLink>
    </>
  );

  const renderAbout = () => (
    <>
      <ContentHeader>
        <div>
          <PageTitle>About 관리</PageTitle>
          <PageDescription>소개 문구와 대표 사진을 한 화면에서 수정합니다.</PageDescription>
        </div>
        <ActionButton type="button" onClick={() => notify("About 변경사항을 임시저장했습니다.")}>변경사항 저장</ActionButton>
      </ContentHeader>
      <ManagementGrid>
        <AssetPanel>
          <AssetPreview src={aboutImagePreview} alt="About 대표 미리보기" />
          <UploadButton as="label">
            대표 사진 교체
            <FileInput type="file" accept="image/*" onChange={replaceAboutImage} />
          </UploadButton>
        </AssetPanel>
        <ManagementPanel>
          <Field>
            <FormLabel htmlFor="about-headline">첫 문장</FormLabel>
            <Input id="about-headline" value={aboutHeadline} onChange={(event) => setAboutHeadline(event.target.value)} />
          </Field>
          <Field>
            <FormLabel htmlFor="about-body">소개 내용</FormLabel>
            <TextEditor id="about-body" rows="15" value={aboutBody} onChange={(event) => setAboutBody(event.target.value)} />
          </Field>
          <SiteLink href="/About" target="_blank" rel="noreferrer">About 페이지에서 확인 ↗</SiteLink>
        </ManagementPanel>
      </ManagementGrid>
    </>
  );

  return (
    <AdminShell>
      <MobileHeader>
        <Brand><BrandMark>D</BrandMark><span>DELIGHT FILM</span></Brand>
        <SiteLink href="/" target="_blank" rel="noreferrer">본 사이트 ↗</SiteLink>
      </MobileHeader>
      <MobileNav aria-label="모바일 관리 메뉴">
        {NAV_ITEMS.map((item) => (
          <NavButton
            type="button"
            key={item.id}
            $active={activeView === item.id}
            onClick={() => setActiveView(item.id)}
          >
            <span>{item.index}</span>
            {item.label}
          </NavButton>
        ))}
      </MobileNav>
      <Sidebar>
        <Brand><BrandMark>D</BrandMark><span>DELIGHT FILM</span></Brand>
        <Nav aria-label="관리 메뉴">
          {NAV_ITEMS.map((item) => (
            <NavButton
              type="button"
              key={item.id}
              $active={activeView === item.id}
              onClick={() => setActiveView(item.id)}
            >
              <span>{item.index}</span>
              {item.label}
            </NavButton>
          ))}
        </Nav>
        <HelpText>
          <strong>DESIGN PREVIEW</strong>
          실제 로그인과 저장 기능은 데이터베이스 연결 후 활성화됩니다.
        </HelpText>
      </Sidebar>

      <Main>
        <Topbar>
          <div>
            <StatusDot />
            <span>데이터 연결 전</span>
          </div>
          <TopbarActions>
            <SiteLink href="/" target="_blank" rel="noreferrer">본 사이트 바로가기 ↗</SiteLink>
            <div className="profile">DF</div>
          </TopbarActions>
        </Topbar>
        <Content>
          {activeView === "content" && renderContent()}
          {activeView === "categories" && renderCategories()}
          {activeView === "layout" && renderLayout()}
          {activeView === "photos" && renderPhotos()}
          {activeView === "home" && renderHome()}
          {activeView === "about" && renderAbout()}
        </Content>
      </Main>

      {isEditorOpen && (
        <Aside role="dialog" aria-modal="true" aria-labelledby="editor-title">
          <AsideHeader>
            <div>
              <PageTitle as="h2" id="editor-title">새 작품 등록</PageTitle>
              <PageDescription>YouTube 링크와 작품 정보를 입력하세요.</PageDescription>
            </div>
            <IconButton type="button" onClick={() => setIsEditorOpen(false)} aria-label="닫기">×</IconButton>
          </AsideHeader>
          <form onSubmit={saveDraft}>
            <FormGrid as="div">
              <Field>
                <FormLabel htmlFor="source-url">YouTube 링크</FormLabel>
                <Input
                  id="source-url"
                  value={draft.sourceUrl}
                  onChange={(event) => updateDraft("sourceUrl", event.target.value)}
                  placeholder="https://youtu.be/..."
                  autoFocus
                />
                <HelpText>일반 영상, Shorts, 공유 링크를 모두 인식합니다.</HelpText>
              </Field>

              <PreviewFrame>
                {parsedVideoId ? (
                  <PreviewImage src={`https://img.youtube.com/vi/${parsedVideoId}/mqdefault.jpg`} alt="영상 미리보기" />
                ) : (
                  <PreviewPlaceholder>
                    <span>▶</span>
                    링크를 입력하면 썸네일이 표시됩니다.
                  </PreviewPlaceholder>
                )}
              </PreviewFrame>

              <Field>
                <FormLabel htmlFor="work-title">제목</FormLabel>
                <Input id="work-title" value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="작품 제목" />
              </Field>
              <Field>
                <FormLabel htmlFor="work-subtitle">서브타이틀</FormLabel>
                <TextArea id="work-subtitle" value={draft.subtitle} onChange={(event) => updateDraft("subtitle", event.target.value)} placeholder="선택 입력" rows="3" />
              </Field>
              <FormGrid as="div" $columns="2">
                <Field>
                  <FormLabel htmlFor="work-section">구분</FormLabel>
                  <Select id="work-section" value={draft.section} onChange={(event) => updateDraft("section", event.target.value)}>
                    <option value="video">Video</option>
                    <option value="shorts">Shorts</option>
                  </Select>
                </Field>
                <Field>
                  <FormLabel htmlFor="work-category">카테고리</FormLabel>
                  <Select id="work-category" value={draft.category} onChange={(event) => updateDraft("category", event.target.value)}>
                    {currentCategories.map((category) => <option key={category}>{category}</option>)}
                  </Select>
                </Field>
              </FormGrid>
              <Field>
                <FormLabel htmlFor="work-status">저장 상태</FormLabel>
                <Select id="work-status" value={draft.status} onChange={(event) => updateDraft("status", event.target.value)}>
                  <option value="draft">임시저장</option>
                  <option value="published">바로 공개</option>
                </Select>
              </Field>
              {formError && <HelpText $error>{formError}</HelpText>}
            </FormGrid>
            <AsideFooter>
              <GhostButton type="button" onClick={() => setIsEditorOpen(false)}>취소</GhostButton>
              <ActionButton type="submit">저장하기</ActionButton>
            </AsideFooter>
          </form>
        </Aside>
      )}

      {isLayoutEditorOpen && layoutDraft && (
        <Aside role="dialog" aria-modal="true" aria-labelledby="layout-editor-title">
          <AsideHeader>
            <div>
              <PageTitle as="h2" id="layout-editor-title">카드 세부 편집</PageTitle>
              <PageDescription>{device === "desktop" ? "PC" : "Mobile"} 화면에 표시될 정보와 썸네일을 조정합니다.</PageDescription>
            </div>
            <IconButton type="button" onClick={() => setIsLayoutEditorOpen(false)} aria-label="닫기">×</IconButton>
          </AsideHeader>
          <form onSubmit={saveLayoutDetails}>
            <FormGrid as="div">
              <CropPreview
                $device={device}
                $section={layoutDraft.section}
                $columns={selectedLayoutItem?.columns || 1}
                $rows={selectedLayoutItem?.rows || 1}
              >
                <CropPreviewImage
                  src={`https://img.youtube.com/vi/${selectedLayoutItem?.src}/maxresdefault.jpg`}
                  alt="썸네일 크롭 미리보기"
                  $cropX={activeCropDraft.x}
                  $cropY={activeCropDraft.y}
                  $zoom={activeCropDraft.zoom}
                  onError={(event) => {
                    event.currentTarget.src = `https://img.youtube.com/vi/${selectedLayoutItem?.src}/hqdefault.jpg`;
                  }}
                />
                <span>{device === "desktop" ? `${selectedLayoutItem?.columns}×${selectedLayoutItem?.rows}` : layoutDraft.section === "shorts" ? "Mobile · 9:16" : "Mobile · 3:1"}</span>
              </CropPreview>

              <RangeControl>
                <label htmlFor="crop-zoom">크기 <strong>{activeCropDraft.zoom}%</strong></label>
                <input id="crop-zoom" type="range" min="100" max="200" step="5" value={activeCropDraft.zoom} onChange={(event) => updateCropDraft("zoom", event.target.value)} />
              </RangeControl>
              <RangeControl>
                <label htmlFor="crop-x">가로 위치 <strong>{activeCropDraft.x}%</strong></label>
                <input id="crop-x" type="range" min="0" max="100" value={activeCropDraft.x} onChange={(event) => updateCropDraft("x", event.target.value)} />
              </RangeControl>
              <RangeControl>
                <label htmlFor="crop-y">세로 위치 <strong>{activeCropDraft.y}%</strong></label>
                <input id="crop-y" type="range" min="0" max="100" value={activeCropDraft.y} onChange={(event) => updateCropDraft("y", event.target.value)} />
              </RangeControl>
              <GhostButton type="button" onClick={resetCropDraft}>썸네일 위치 초기화</GhostButton>

              <Field>
                <FormLabel htmlFor="layout-title">제목</FormLabel>
                <Input id="layout-title" value={layoutDraft.title} onChange={(event) => updateLayoutDraft("title", event.target.value)} />
              </Field>
              <Field>
                <FormLabel htmlFor="layout-subtitle">서브타이틀</FormLabel>
                <TextArea id="layout-subtitle" rows="3" value={layoutDraft.subtitle} onChange={(event) => updateLayoutDraft("subtitle", event.target.value)} placeholder="선택 입력" />
              </Field>
              <FormGrid as="div" $columns="2">
                <Field>
                  <FormLabel htmlFor="layout-section">구분</FormLabel>
                  <Select id="layout-section" value={layoutDraft.section} onChange={(event) => updateLayoutDraft("section", event.target.value)}>
                    <option value="video">Video</option>
                    <option value="shorts">Shorts</option>
                  </Select>
                </Field>
                <Field>
                  <FormLabel htmlFor="layout-category">카테고리</FormLabel>
                  <Select id="layout-category" value={layoutDraft.category} onChange={(event) => updateLayoutDraft("category", event.target.value)}>
                    {layoutDraftCategories.map((category) => <option key={category}>{category}</option>)}
                  </Select>
                </Field>
              </FormGrid>
            </FormGrid>
            <AsideFooter>
              <GhostButton type="button" onClick={() => setIsLayoutEditorOpen(false)}>취소</GhostButton>
              <ActionButton type="submit">카드 설정 저장</ActionButton>
            </AsideFooter>
          </form>
        </Aside>
      )}

      {toast && <Toast role="status">{toast}</Toast>}
    </AdminShell>
  );
};

export default Admin;
