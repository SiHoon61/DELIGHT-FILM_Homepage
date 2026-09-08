import styled, { css } from "styled-components";

const border = "rgba(255, 255, 255, 0.11)";
const muted = "rgba(255, 255, 255, 0.5)";

export const AdminShell = styled.div`
  --admin-accent: #d8ff65;
  min-height: 100vh;
  color: #f5f5f2;
  background:
    radial-gradient(circle at 80% -15%, rgba(216, 255, 101, 0.09), transparent 28rem),
    #0b0c0c;
  font-family: var(--font-sansRegular);

  *, *::before, *::after { box-sizing: border-box; }
  button, input, select, textarea { font: inherit; }
`;

export const Sidebar = styled.aside`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 20;
  display: flex;
  width: 236px;
  flex-direction: column;
  padding: 28px 18px 20px;
  border-right: 1px solid ${border};
  background: rgba(11, 12, 12, 0.94);
  backdrop-filter: blur(18px);

  @media (max-width: 860px) { display: none; }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  font-family: var(--font-sansBold);
  font-size: 13px;
  letter-spacing: 0.14em;
`;

export const BrandMark = styled.span`
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  background: #f4f4ef;
  color: #0b0c0c;
  font-size: 15px;
  letter-spacing: 0;
`;

export const Nav = styled.nav`
  display: grid;
  gap: 5px;
  margin-top: 72px;
`;

export const NavButton = styled.button`
  display: grid;
  grid-template-columns: 32px 1fr;
  align-items: center;
  min-height: 50px;
  padding: 0 15px;
  border: 0;
  border-radius: 10px;
  background: ${({ $active }) => $active ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  color: ${({ $active }) => $active ? "#fff" : muted};
  text-align: left;
  cursor: pointer;

  span { font-size: 10px; color: ${({ $active }) => $active ? "var(--admin-accent)" : "rgba(255,255,255,.28)"}; }
  &:hover, &:focus-visible { background: rgba(255,255,255,.07); color: #fff; outline: none; }
`;

export const HelpText = styled.p`
  margin: auto 4px 0;
  color: ${({ $error }) => $error ? "#ff8c7c" : muted};
  font-size: 12px;
  line-height: 1.65;

  strong { display: block; margin-bottom: 7px; color: rgba(255,255,255,.78); font-size: 10px; letter-spacing: .16em; }
`;

export const Main = styled.main`
  min-width: 0;
  margin-left: 236px;
  @media (max-width: 860px) { margin-left: 0; }
`;

export const MobileHeader = styled.header`
  display: none;
  @media (max-width: 860px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 66px;
    padding: 0 18px;
    border-bottom: 1px solid ${border};
  }
`;

export const MobileNav = styled.nav`
  display: none;
  @media (max-width: 860px) {
    position: sticky;
    top: 0;
    z-index: 30;
    display: flex;
    overflow-x: auto;
    gap: 4px;
    padding: 8px 12px;
    border-bottom: 1px solid ${border};
    background: rgba(11, 12, 12, .95);
    backdrop-filter: blur(16px);

    ${NavButton} {
      display: flex;
      min-width: max-content;
      min-height: 42px;
      justify-content: center;
      gap: 7px;
      padding: 0 8px;
      text-align: center;
    }
  }
`;

export const Topbar = styled.header`
  display: flex;
  min-height: 66px;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(22px, 4vw, 58px);
  border-bottom: 1px solid ${border};
  color: ${muted};
  font-size: 12px;

  > div { display: flex; align-items: center; gap: 9px; }
  @media (max-width: 860px) { display: none; }
`;

export const TopbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .profile { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid ${border}; border-radius: 50%; color: #fff; }
`;

export const StatusDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: currentColor;
`;

export const Content = styled.div`
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: clamp(30px, 4.5vw, 68px) clamp(18px, 4vw, 58px) 80px;
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 30px;

  @media (max-width: 600px) { align-items: stretch; flex-direction: column; margin-bottom: 22px; }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-family: var(--font-sansMedium);
  font-size: clamp(28px, 3.1vw, 46px);
  font-weight: 500;
  letter-spacing: -0.035em;
`;

export const PageDescription = styled.p`
  margin: 7px 0 0;
  color: ${muted};
  font-size: 14px;
`;

const buttonBase = css`
  min-height: 42px;
  padding: 0 17px;
  border-radius: 9px;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, border 160ms ease;
  &:focus-visible { outline: 2px solid var(--admin-accent); outline-offset: 2px; }
`;

export const ActionButton = styled.button`
  ${buttonBase};
  border: 1px solid var(--admin-accent);
  background: var(--admin-accent);
  color: #10110d;
  font-family: var(--font-sansMedium);
  span { margin-right: 4px; font-size: 18px; }
  &:hover { background: #e5ff9a; }
`;

export const GhostButton = styled.button`
  ${buttonBase};
  border: 1px solid ${border};
  background: transparent;
  color: #fff;
  &:hover { background: rgba(255,255,255,.07); }
`;

export const SiteLink = styled.a`
  ${buttonBase};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(216,255,101,.3);
  background: rgba(216,255,101,.06);
  color: var(--admin-accent);
  text-decoration: none;
  &:hover { background: rgba(216,255,101,.12); }
`;

export const UploadButton = styled.button`
  ${buttonBase};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid var(--admin-accent);
  background: var(--admin-accent);
  color: #10110d;
  font-family: var(--font-sansMedium);
  span { font-size: 18px; }
  &:hover { background: #e5ff9a; }
`;

export const FileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
`;

export const MetricRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 24px;
  @media (max-width: 600px) { gap: 8px; }
`;

export const Metric = styled.button`
  min-width: 0;
  padding: 20px;
  border: 1px solid ${({ $active }) => $active ? "rgba(216,255,101,.62)" : border};
  border-radius: 12px;
  background: ${({ $active }) => $active ? "rgba(216,255,101,.055)" : "rgba(255,255,255,.025)"};
  color: #fff;
  text-align: left;
  cursor: pointer;
  &:focus-visible { outline: 2px solid var(--admin-accent); outline-offset: 2px; }
  @media (max-width: 600px) { padding: 15px 13px; }
`;

export const MetricLabel = styled.span`
  display: block;
  color: ${muted};
  font-size: 12px;
  letter-spacing: .08em;
`;

export const MetricValue = styled.strong`
  display: block;
  margin-top: 18px;
  font-family: var(--font-sansMedium);
  font-size: clamp(24px, 3vw, 38px);
  font-weight: 500;
  @media (max-width: 600px) { margin-top: 12px; }
`;

export const Panel = styled.section`
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid ${border};
  border-radius: 14px;
  background: rgba(255,255,255,.025);
`;

export const LayoutPanel = styled.section`
  overflow: visible;
  border: 1px solid ${border};
  border-radius: 14px;
  background: rgba(255,255,255,.025);
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 17px 18px;
  border-bottom: 1px solid ${border};
  @media (max-width: 760px) { align-items: stretch; flex-direction: column; }
`;

export const Tabs = styled.div`
  display: flex;
  gap: 5px;
`;

export const Tab = styled.button`
  min-height: 36px;
  padding: 0 14px;
  border: 0;
  border-radius: 8px;
  background: ${({ $active }) => $active ? "rgba(255,255,255,.11)" : "transparent"};
  color: ${({ $active }) => $active ? "#fff" : muted};
  cursor: pointer;
  &:focus-visible { outline: 2px solid var(--admin-accent); }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const fieldStyle = css`
  width: 100%;
  min-height: 42px;
  padding: 0 13px;
  border: 1px solid ${border};
  border-radius: 8px;
  outline: none;
  background: #111313;
  color: #fff;
  &:focus { border-color: rgba(216,255,101,.7); }
  &::placeholder { color: rgba(255,255,255,.3); }
`;

export const SearchInput = styled.input`
  ${fieldStyle};
  width: min(220px, 34vw);
  padding-left: 38px;
  background-color: #111313;
  background-image: radial-gradient(circle, transparent 5px, rgba(255,255,255,.55) 6px, rgba(255,255,255,.55) 7px, transparent 8px), linear-gradient(45deg, transparent 47%, rgba(255,255,255,.55) 48%, rgba(255,255,255,.55) 54%, transparent 55%);
  background-size: 16px 16px, 8px 8px;
  background-position: 13px 12px, 25px 25px;
  background-repeat: no-repeat;
  @media (max-width: 760px) { width: 100%; }
`;

export const Input = styled.input`${fieldStyle};`;
export const Select = styled.select`${fieldStyle}; cursor: pointer;`;
export const TextArea = styled.textarea`
  ${fieldStyle};
  min-height: 92px;
  padding-top: 11px;
  resize: vertical;
`;

export const TextEditor = styled.textarea`
  ${fieldStyle};
  min-height: 320px;
  padding: 15px;
  line-height: 1.75;
  resize: vertical;
`;

export const Table = styled.div`
  min-width: 740px;
  @media (max-width: 860px) { min-width: 680px; }
`;

export const TableHeader = styled.div``;
export const TableBody = styled.div``;
export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 44px minmax(320px, 1.8fr) minmax(110px, .7fr) 110px 70px 48px;
  align-items: center;
  min-height: 82px;
  border-bottom: 1px solid ${border};
  &:last-child { border-bottom: 0; }
  ${TableHeader} & { min-height: 45px; color: ${muted}; font-size: 11px; letter-spacing: .08em; }
`;

export const SelectionCheckbox = styled.input`
  width: 17px;
  height: 17px;
  margin: 0;
  accent-color: var(--admin-accent);
  cursor: pointer;
`;

export const BulkActionBar = styled.div`
  display: flex;
  min-width: 740px;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 18px;
  border-bottom: 1px solid ${border};
  background: rgba(216,255,101,.025);
  ${Select} { width: auto; min-width: 148px; min-height: 36px; }
  @media (max-width: 860px) { min-width: 680px; }
`;

export const BulkSelection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${muted};
  font-size: 12px;
  strong { color: #fff; font-weight: 500; }
  button {
    padding: 0;
    border: 0;
    background: transparent;
    color: rgba(255,255,255,.5);
    font-size: 11px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const BulkApplyButton = styled.button`
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid rgba(216,255,101,.52);
  border-radius: 7px;
  background: rgba(216,255,101,.11);
  color: var(--admin-accent);
  font-size: 12px;
  cursor: pointer;
  &:hover:not(:disabled), &:focus-visible { background: rgba(216,255,101,.18); outline: none; }
  &:disabled { border-color: ${border}; color: rgba(255,255,255,.28); cursor: default; }
`;

export const TableHead = styled.div`padding: 0 18px;`;
export const TableCell = styled.div`
  min-width: 0;
  padding: 10px 18px;
  color: rgba(255,255,255,.72);
  font-size: 13px;
`;

export const VideoIdentity = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 13px;
  strong, span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  strong { color: #fff; font-family: var(--font-sansMedium); font-size: 14px; font-weight: 500; }
  span { max-width: 360px; margin-top: 5px; color: ${muted}; font-size: 11px; }
  > div { min-width: 0; }
`;

export const Thumbnail = styled.img`
  width: 92px;
  aspect-ratio: 16 / 9;
  flex: 0 0 auto;
  border-radius: 6px;
  object-fit: cover;
  background: #1a1c1c;
`;

export const Badge = styled.span`
  display: inline-flex;
  min-height: 27px;
  align-items: center;
  gap: 7px;
  padding: 0 10px;
  border: 1px solid ${({ $status }) => $status === "published" ? "rgba(216,255,101,.24)" : border};
  border-radius: 999px;
  color: ${({ $status }) => $status === "published" ? "var(--admin-accent)" : muted};
  font-size: 11px;
`;

export const RowActions = styled.div`display: flex; justify-content: flex-end;`;
export const IconButton = styled.button`
  display: grid;
  width: 34px;
  height: 34px;
  padding: 0;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: rgba(255,255,255,.65);
  cursor: pointer;
  &:hover, &:focus-visible { border-color: ${border}; background: rgba(255,255,255,.06); color: #fff; outline: none; }
`;

export const EmptyState = styled.div`
  display: grid;
  min-height: 360px;
  place-content: center;
  gap: 8px;
  padding: 30px;
  text-align: center;
  strong { font-family: var(--font-sansMedium); font-size: 17px; }
  span { color: ${muted}; font-size: 13px; }
`;

export const PaginationBar = styled.div`
  display: flex;
  min-width: 680px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 18px;
  border-top: 1px solid ${border};
  @media (max-width: 760px) {
    min-width: 0;
    align-items: stretch;
    flex-direction: column;
  }
`;

export const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${muted};
  font-size: 12px;
  strong { color: #fff; font-weight: 500; }
  ${Select} { width: 112px; min-height: 36px; margin-left: 4px; }
`;

export const PaginationPages = styled.nav`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PaginationButton = styled.button`
  display: grid;
  width: 34px;
  height: 34px;
  padding: 0;
  place-items: center;
  border: 1px solid ${({ $active }) => $active ? "rgba(216,255,101,.68)" : border};
  border-radius: 7px;
  background: ${({ $active }) => $active ? "rgba(216,255,101,.12)" : "#111313"};
  color: ${({ $active }) => $active ? "var(--admin-accent)" : "rgba(255,255,255,.68)"};
  cursor: pointer;
  &:hover:not(:disabled), &:focus-visible { border-color: rgba(216,255,101,.48); color: #fff; outline: none; }
  &:disabled { cursor: default; opacity: .28; }
`;

export const Aside = styled.aside`
  position: fixed;
  inset: 0 0 0 auto;
  z-index: 100;
  width: ${({ $wide }) => $wide ? "min(980px, 100%)" : "min(470px, 100%)"};
  overflow-y: auto;
  padding: 28px;
  border-left: 1px solid rgba(255,255,255,.16);
  background: #0d0f0f;
  box-shadow: -24px 0 80px rgba(0,0,0,.5);

  &::before {
    content: "";
    position: fixed;
    inset: 0 ${({ $wide }) => $wide ? "min(980px, 100%)" : "min(470px, 100%)"} 0 0;
    background: rgba(0,0,0,.52);
    pointer-events: none;
  }
  @media (max-width: 520px) { padding: 22px 18px; }
`;

export const AsideHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns ? `repeat(${$columns}, minmax(0, 1fr))` : "1fr"};
  gap: ${({ $compact }) => $compact ? "8px" : "18px"};
  ${({ $compact }) => $compact && "grid-template-columns: 1fr auto;"}
`;

export const Field = styled.div`display: grid; gap: 8px;`;
export const FormLabel = styled.label`color: rgba(255,255,255,.76); font-size: 12px;`;

export const PreviewFrame = styled.div`
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 1px solid ${border};
  border-radius: 10px;
  background: #080909;
`;

export const PreviewImage = styled.img`width: 100%; height: 100%; object-fit: cover;`;
export const PreviewPlaceholder = styled.div`
  display: grid;
  height: 100%;
  place-content: center;
  gap: 9px;
  color: ${muted};
  text-align: center;
  font-size: 12px;
  span { color: #fff; font-size: 20px; }
`;

export const EditorWorkspace = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, .95fr);
  align-items: start;
  gap: 28px;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

export const EditorPreviewPanel = styled.section`
  position: sticky;
  top: 0;
  min-width: 0;
  padding: 16px;
  border: 1px solid ${border};
  border-radius: 12px;
  background: rgba(255,255,255,.025);
  @media (max-width: 820px) { position: static; }
`;

export const EditorPreviewTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  strong, span { display: block; }
  strong { color: #fff; font-size: 14px; font-weight: 500; }
  span { margin-top: 5px; color: ${muted}; font-size: 11px; line-height: 1.45; }
  > span { margin-top: 1px; color: var(--admin-accent); font-size: 10px; letter-spacing: .1em; }
`;

export const PreviewCompare = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: end;
  gap: 12px;
  > div { min-width: 0; }
  small { display: block; margin-top: 8px; color: ${muted}; font-size: 10px; text-align: center; }
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

export const PreviewCard = styled.article`
  position: relative;
  overflow: hidden;
  aspect-ratio: ${({ $variant }) => $variant === "mobile" ? "3 / 1" : "16 / 9"};
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 8px;
  background: #151717;
  ${({ $variant }) => $variant === "shorts" && "aspect-ratio: 9 / 16;"}
`;

export const PreviewCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(135deg, #252a2a, #0a0b0b);
`;

export const PreviewCardInfo = styled.div`
  position: absolute;
  inset: auto 0 0;
  padding: 34px 10px 10px;
  background: linear-gradient(transparent, rgba(0,0,0,.9));
  span, strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  strong { color: #fff; font-size: 12px; font-weight: 500; }
  > span:not(.preview-card-meta) { margin-top: 5px; color: rgba(255,255,255,.68); font-size: 10px; }
`;

export const PreviewCardMeta = styled.span`
  margin-bottom: 5px;
  color: rgba(255,255,255,.7);
  font-size: 9px;
  letter-spacing: .1em;
  text-transform: uppercase;
`;

export const PreviewCardPlay = styled.i`
  position: absolute;
  right: 9px;
  bottom: 10px;
  display: grid;
  width: 25px;
  height: 25px;
  place-items: center;
  border: 1px solid rgba(255,255,255,.72);
  border-radius: 50%;
  color: #fff;
  font-size: 9px;
  font-style: normal;
`;

export const MetadataNotice = styled.div`
  display: flex;
  min-height: 40px;
  align-items: center;
  gap: 9px;
  padding: 9px 11px;
  border: 1px solid ${({ $status }) =>
    $status === "duplicate" || $status === "error"
      ? "rgba(255,118,118,.3)"
      : $status === "success" ? "rgba(216,255,101,.26)" : border};
  border-radius: 8px;
  background: rgba(255,255,255,.025);
  color: ${({ $status }) =>
    $status === "duplicate" || $status === "error"
      ? "#ff9898"
      : "rgba(255,255,255,.65)"};
  font-size: 11px;
  line-height: 1.5;
  > span {
    width: 7px;
    height: 7px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: ${({ $status }) =>
      $status === "duplicate" || $status === "error" ? "#ff7676" : "var(--admin-accent)"};
    box-shadow: ${({ $status }) => $status === "loading" ? "0 0 0 5px rgba(216,255,101,.08)" : "none"};
  }
`;

export const MetadataSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  > div {
    min-width: 0;
    padding: 11px 12px;
    border: 1px solid ${border};
    border-radius: 8px;
    background: rgba(255,255,255,.02);
  }
  span, strong { display: block; }
  span { margin-bottom: 6px; color: ${muted}; font-size: 10px; }
  strong { overflow: hidden; color: #fff; font-size: 12px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
`;

export const AsideFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid ${border};
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

export const CategoryCard = styled.section`
  padding: 24px;
  border: 1px solid ${border};
  border-radius: 14px;
  background: rgba(255,255,255,.025);
  ${PageTitle} { font-size: 25px; }
`;

export const CategoryCount = styled.span`
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid ${border};
  border-radius: 50%;
  color: var(--admin-accent);
  font-size: 12px;
`;

export const CategoryList = styled.div`
  display: grid;
  gap: 7px;
  margin-bottom: 18px;
`;

export const CategoryItem = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 30px 34px;
  min-height: 52px;
  align-items: center;
  padding: 0 8px 0 12px;
  border: 1px solid ${border};
  border-radius: 8px;
  color: ${muted};
  font-size: 12px;
  opacity: ${({ $dragging }) => $dragging ? .46 : 1};
  transition: border-color 160ms ease, background 160ms ease, opacity 160ms ease;
  strong { color: #fff; font-size: 14px; font-weight: 500; }
  .handle { color: rgba(255,255,255,.3); cursor: grab; }
  &[aria-grabbed="true"] { border-color: rgba(216,255,101,.5); background: rgba(216,255,101,.05); }
`;

export const ControlButton = styled.button`
  min-height: 34px;
  padding: 0 11px;
  border: 1px solid ${({ $active }) => $active ? "rgba(216,255,101,.55)" : border};
  border-radius: 7px;
  background: ${({ $active }) => $active ? "rgba(216,255,101,.12)" : "#111313"};
  color: ${({ $active }) => $active ? "var(--admin-accent)" : "rgba(255,255,255,.65)"};
  font-size: 11px;
  cursor: pointer;
`;

export const LayoutHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 20px;
  border-bottom: 1px solid ${border};
  strong, span { display: block; }
  strong { font-size: 14px; }
  span { margin-top: 5px; color: ${muted}; font-size: 11px; }
  ${Select} { width: min(220px, 30vw); }

  @media (max-width: 700px) {
    align-items: stretch;
    flex-wrap: wrap;
    ${Tabs} { flex: 1; }
    ${Select} { width: 100%; order: 3; }
  }
`;

export const DeviceSwitch = styled.div`
  display: flex;
  padding: 3px;
  border: 1px solid ${border};
  border-radius: 9px;
  background: #0b0c0c;
`;

export const DeviceButton = styled.button`
  min-height: 32px;
  padding: 0 13px;
  border: 0;
  border-radius: 6px;
  background: ${({ $active }) => $active ? "rgba(255,255,255,.12)" : "transparent"};
  color: ${({ $active }) => $active ? "#fff" : muted};
  font-size: 12px;
  cursor: pointer;
`;

export const LayoutInspector = styled.div`
  position: sticky;
  top: 0;
  z-index: 45;
  display: grid;
  grid-template-columns: minmax(230px, 1fr) auto auto auto;
  align-items: center;
  gap: 24px;
  padding: 14px 20px;
  border-top: 1px solid rgba(216,255,101,.2);
  border-bottom: 1px solid rgba(216,255,101,.2);
  background: rgba(17, 19, 17, .98);
  box-shadow: 0 14px 30px rgba(0,0,0,.34);
  backdrop-filter: blur(16px);

  @media (max-width: 1220px) {
    grid-template-columns: 1fr 1fr;
    > :first-child { grid-column: 1 / -1; }
  }

  @media (max-width: 860px) { top: 58px; }
`;

export const LayoutSelection = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;

  ${Thumbnail} { width: 76px; }
  > div { min-width: 0; }
  span, strong, small { display: block; }
  span { margin-bottom: 4px; color: ${muted}; font-size: 10px; }
  strong { overflow: hidden; color: #fff; font-size: 13px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
  small { margin-top: 5px; color: var(--admin-accent); font-size: 11px; }
`;

export const DimensionControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  > span { min-width: 28px; color: ${muted}; font-size: 11px; }
`;

export const DimensionButton = styled.button`
  display: grid;
  width: 34px;
  height: 34px;
  padding: 0;
  place-items: center;
  border: 1px solid ${({ $active }) => $active ? "var(--admin-accent)" : border};
  border-radius: 7px;
  background: ${({ $active }) => $active ? "var(--admin-accent)" : "#111313"};
  color: ${({ $active }) => $active ? "#10110d" : "rgba(255,255,255,.65)"};
  cursor: pointer;
`;

export const MobileOrderNote = styled.p`
  margin: 0;
  color: ${muted};
  font-size: 11px;
  line-height: 1.5;
`;

export const LayoutCanvas = styled.div`
  display: grid;
  grid-template-columns: ${({ $device, $section }) => {
    if ($device !== "mobile") return "repeat(4, minmax(0, 1fr))";
    return $section === "shorts"
      ? "repeat(2, minmax(0, 180px))"
      : "minmax(260px, 390px)";
  }};
  grid-auto-flow: dense;
  grid-auto-rows: ${({ $device, $section }) =>
    $device === "mobile" && $section === "shorts"
      ? "auto"
      : $device === "mobile" ? "106px" : "clamp(82px, 8vw, 116px)"};
  justify-content: center;
  gap: 10px;
  min-width: 0;
  padding: clamp(14px, 2.5vw, 28px);
  background-image: radial-gradient(rgba(255,255,255,.08) .7px, transparent .7px);
  background-size: 14px 14px;
  @media (max-width: 700px) {
    grid-template-columns: ${({ $device, $section }) =>
      $device === "mobile" && $section === "shorts"
        ? "repeat(2, minmax(0, 1fr))"
        : $device === "mobile" ? "1fr" : "repeat(4, minmax(0, 1fr))"};
    grid-auto-rows: ${({ $device, $section }) =>
      $device === "mobile" && $section === "shorts"
        ? "auto"
        : $device === "mobile" ? "112px" : "82px"};
  }
`;

export const GridCard = styled.article`
  position: relative;
  grid-column: span ${({ $columns }) => $columns};
  grid-row: span ${({ $rows }) => $rows};
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.2);
  border-color: ${({ $selected }) => $selected ? "var(--admin-accent)" : "rgba(255,255,255,.2)"};
  box-shadow: ${({ $selected }) => $selected ? "0 0 0 2px rgba(216,255,101,.14)" : "none"};
  border-radius: 9px;
  background: #151717;
  cursor: grab;
  ${({ $device, $section }) => $device === "mobile" && $section === "shorts" && `
    aspect-ratio: 9 / 16;
  `}
  &:active { cursor: grabbing; }
  @media (max-width: 700px) { grid-column: span 1; grid-row: auto; }
`;

export const SizeBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 3;
  display: grid;
  min-width: 38px;
  height: 26px;
  padding: 0 8px;
  place-items: center;
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 7px;
  background: rgba(7,8,8,.78);
  color: #fff;
  font-size: 10px;
`;

export const GridCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $cropX, $cropY }) => `${$cropX}% ${$cropY}%`};
  opacity: .72;
  transform: ${({ $zoom }) => `scale(${$zoom / 100})`};
  transform-origin: ${({ $cropX, $cropY }) => `${$cropX}% ${$cropY}%`};
`;
export const GridCardInfo = styled.div`
  position: absolute;
  inset: auto 0 0;
  padding: 28px 12px 11px;
  background: linear-gradient(transparent, rgba(0,0,0,.9));
  span, strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  span { margin-bottom: 4px; color: rgba(255,255,255,.6); font-size: 9px; text-transform: uppercase; }
  strong { font-size: 12px; font-weight: 500; }
  .size-control { opacity: 0; }
`;

export const CropPreview = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: ${({ $device, $section, $columns, $rows }) => {
    if ($device === "mobile") return $section === "shorts" ? "9 / 16" : "3 / 1";
    return `${Math.max(1, $columns)} / ${Math.max(1, $rows)}`;
  }};
  max-height: 430px;
  border: 1px solid rgba(216,255,101,.32);
  border-radius: 10px;
  background: #070808;

  > span {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 2;
    padding: 6px 9px;
    border-radius: 6px;
    background: rgba(0,0,0,.7);
    color: #fff;
    font-size: 10px;
  }
`;

export const CropPreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $cropX, $cropY }) => `${$cropX}% ${$cropY}%`};
  transform: ${({ $zoom }) => `scale(${$zoom / 100})`};
  transform-origin: ${({ $cropX, $cropY }) => `${$cropX}% ${$cropY}%`};
`;

export const RangeControl = styled.div`
  display: grid;
  grid-template-columns: 115px 1fr;
  align-items: center;
  gap: 12px;

  label { color: ${muted}; font-size: 12px; }
  label strong { float: right; color: #fff; font-weight: 500; }
  input { width: 100%; accent-color: var(--admin-accent); }
`;

export const Toast = styled.div`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 120;
  padding: 14px 18px;
  border: 1px solid rgba(216,255,101,.3);
  border-radius: 9px;
  background: #171a14;
  color: #eaffae;
  box-shadow: 0 16px 45px rgba(0,0,0,.35);
  font-size: 13px;
`;

export const PhotoToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 20px;
  border-bottom: 1px solid ${border};

  > div { display: flex; align-items: baseline; gap: 9px; }
  strong { font-family: var(--font-sansMedium); font-size: 24px; }
  span, p { color: ${muted}; font-size: 12px; }
  p { margin: 0; }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  padding: 20px;
  @media (max-width: 1200px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  @media (max-width: 720px) { grid-template-columns: repeat(2, minmax(0, 1fr)); padding: 12px; }
`;

export const PhotoCard = styled.article`
  position: relative;
  min-width: 0;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  border: 1px solid ${border};
  border-radius: 8px;
  background: #161818;
  cursor: grab;
  &:active { cursor: grabbing; }
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PhotoOverlay = styled.div`
  position: absolute;
  inset: auto 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 9px 9px;
  background: linear-gradient(transparent, rgba(0,0,0,.82));
  color: rgba(255,255,255,.72);
  font-size: 10px;

  button {
    min-height: 26px;
    padding: 0 8px;
    border: 1px solid rgba(255,255,255,.25);
    border-radius: 6px;
    background: rgba(0,0,0,.42);
    color: #fff;
    font-size: 10px;
    cursor: pointer;
  }
`;

export const ManagementGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, .65fr);
  gap: 18px;
  align-items: start;
  @media (max-width: 1050px) { grid-template-columns: 1fr; }
`;

export const AssetPanel = styled.section`
  display: grid;
  gap: 16px;
  overflow: hidden;
  padding: 18px;
  border: 1px solid ${border};
  border-radius: 14px;
  background: rgba(255,255,255,.025);
`;

export const ManagementPanel = styled.section`
  display: grid;
  gap: 22px;
  padding: clamp(20px, 3vw, 32px);
  border: 1px solid ${border};
  border-radius: 14px;
  background: rgba(255,255,255,.025);

  ${PageTitle} { font-size: clamp(24px, 2.4vw, 34px); }
  ${SiteLink}, ${UploadButton} { width: fit-content; }
`;

export const HomeVideo = styled.video`
  width: 100%;
  aspect-ratio: ${({ $mobile }) => $mobile ? "9 / 16" : "16 / 9"};
  max-height: ${({ $mobile }) => $mobile ? "520px" : "none"};
  border-radius: 9px;
  background: #000;
  object-fit: cover;
`;

export const HomeVideoGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(300px, .55fr);
  gap: 18px;
  align-items: start;
  margin-bottom: 18px;

  @media (max-width: 1050px) { grid-template-columns: 1fr; }
`;

export const VideoSlot = styled.section`
  display: grid;
  gap: 16px;
  padding: 18px;
  border: 1px solid ${border};
  border-radius: 14px;
  background: rgba(255,255,255,.025);

  ${({ $mobile }) => $mobile && `
    ${HomeVideo} { width: min(100%, 292px); justify-self: center; }
  `}
`;

export const VideoSlotHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  > div { display: flex; align-items: center; gap: 10px; }
  strong { font-size: 14px; font-weight: 500; }
  > span { color: var(--admin-accent); font-size: 12px; }
`;

export const ResolutionNote = styled.div`
  padding: 14px;
  border: 1px solid rgba(216,255,101,.16);
  border-radius: 9px;
  background: rgba(216,255,101,.04);

  strong, span { display: block; }
  strong { color: #fff; font-size: 13px; font-weight: 500; }
  span { margin-top: 5px; color: ${muted}; font-size: 11px; line-height: 1.5; }
`;

export const AssetPreview = styled.img`
  width: 100%;
  max-height: 620px;
  border-radius: 9px;
  background: #080909;
  object-fit: contain;
`;
