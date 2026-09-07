import React, { useMemo, useState } from "react";

import workList from "../../workList.json";
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
  Brand,
  BrandMark,
  ButtonGroup,
  CategoryCard,
  CategoryCount,
  CategoryGrid,
  CategoryItem,
  CategoryList,
  Content,
  ContentHeader,
  ControlButton,
  DeviceButton,
  DeviceSwitch,
  EmptyState,
  Field,
  FormGrid,
  FormLabel,
  GhostButton,
  GridCard,
  GridCardImage,
  GridCardInfo,
  HelpText,
  IconButton,
  Input,
  LayoutCanvas,
  LayoutHeader,
  Main,
  Metric,
  MetricLabel,
  MetricRow,
  MetricValue,
  MobileHeader,
  MobileNav,
  Nav,
  NavButton,
  PageDescription,
  PageTitle,
  Panel,
  PreviewFrame,
  PreviewImage,
  PreviewPlaceholder,
  RowActions,
  SearchInput,
  Select,
  Sidebar,
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
  Thumbnail,
  Toast,
  Toolbar,
  Topbar,
  TopbarActions,
  VideoIdentity,
} from "./style";

const PHOTO_COUNT = 89;

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

const LAYOUT_SEED = initialVideoItems.slice(0, 7).map((item, index) => ({
  ...item,
  size: index === 0 ? "featured" : index < 3 ? "wide" : "standard",
}));

const NAV_ITEMS = [
  { id: "content", label: "콘텐츠", index: "01" },
  { id: "categories", label: "카테고리", index: "02" },
  { id: "layout", label: "화면 배치", index: "03" },
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
  const [layoutItems, setLayoutItems] = useState(LAYOUT_SEED);
  const [dragIndex, setDragIndex] = useState(null);
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
    photo: PHOTO_COUNT,
  };

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

  const reorderLayout = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;
    setLayoutItems((current) => {
      const next = [...current];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(dropIndex, 0, moved);
      return next;
    });
    setDragIndex(null);
  };

  const setLayoutSize = (id, size) => {
    setLayoutItems((current) => current.map((item) =>
      item.id === id ? { ...item, size } : item
    ));
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
            <strong>사진 관리는 다음 연결 단계에서 열립니다.</strong>
            <span>현재 등록된 사진 {PHOTO_COUNT}장은 그대로 유지됩니다.</span>
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
      <Panel>
        <LayoutHeader>
          <div>
            <strong>Video · All</strong>
            <span>카드를 드래그해 배치 순서를 변경하세요.</span>
          </div>
          <DeviceSwitch>
            <DeviceButton type="button" $active={device === "desktop"} onClick={() => setDevice("desktop")}>PC</DeviceButton>
            <DeviceButton type="button" $active={device === "mobile"} onClick={() => setDevice("mobile")}>Mobile</DeviceButton>
          </DeviceSwitch>
        </LayoutHeader>
        <LayoutCanvas $device={device}>
          {layoutItems.map((item, index) => (
            <GridCard
              key={item.id}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => reorderLayout(index)}
              $size={device === "mobile" ? "mobile" : item.size}
            >
              <GridCardImage src={`https://img.youtube.com/vi/${item.src}/mqdefault.jpg`} alt="" />
              <GridCardInfo>
                <span>{String(index + 1).padStart(2, "0")} · {item.category}</span>
                <strong>{item.title}</strong>
              </GridCardInfo>
              {device === "desktop" && (
                <ButtonGroup className="size-control">
                  {["standard", "wide", "featured"].map((size) => (
                    <ControlButton
                      type="button"
                      key={size}
                      $active={item.size === size}
                      onClick={() => setLayoutSize(item.id, size)}
                    >
                      {size === "standard" ? "1×1" : size === "wide" ? "2×1" : "2×2"}
                    </ControlButton>
                  ))}
                </ButtonGroup>
              )}
            </GridCard>
          ))}
        </LayoutCanvas>
      </Panel>
    </>
  );

  return (
    <AdminShell>
      <MobileHeader>
        <Brand><BrandMark>D</BrandMark><span>DELIGHT FILM</span></Brand>
        <Badge><StatusDot />Design preview</Badge>
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
            <GhostButton type="button" onClick={() => window.open("/Works", "_blank")}>사이트 보기 ↗</GhostButton>
            <div className="profile">DF</div>
          </TopbarActions>
        </Topbar>
        <Content>
          {activeView === "content" && renderContent()}
          {activeView === "categories" && renderCategories()}
          {activeView === "layout" && renderLayout()}
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

      {toast && <Toast role="status">{toast}</Toast>}
    </AdminShell>
  );
};

export default Admin;
