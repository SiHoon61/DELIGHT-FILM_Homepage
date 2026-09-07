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
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4px;
    padding: 8px 12px;
    border-bottom: 1px solid ${border};
    background: rgba(11, 12, 12, .95);
    backdrop-filter: blur(16px);

    ${NavButton} {
      display: flex;
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

export const Table = styled.div`
  min-width: 740px;
  @media (max-width: 860px) { min-width: 680px; }
`;

export const TableHeader = styled.div``;
export const TableBody = styled.div``;
export const TableRow = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1.8fr) minmax(110px, .7fr) 110px 70px 48px;
  align-items: center;
  min-height: 82px;
  border-bottom: 1px solid ${border};
  &:last-child { border-bottom: 0; }
  ${TableHeader} & { min-height: 45px; color: ${muted}; font-size: 11px; letter-spacing: .08em; }
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

export const Aside = styled.aside`
  position: fixed;
  inset: 0 0 0 auto;
  z-index: 100;
  width: min(470px, 100%);
  overflow-y: auto;
  padding: 28px;
  border-left: 1px solid rgba(255,255,255,.16);
  background: #0d0f0f;
  box-shadow: -24px 0 80px rgba(0,0,0,.5);

  &::before {
    content: "";
    position: fixed;
    inset: 0 min(470px, 100%) 0 0;
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
  strong { color: #fff; font-size: 14px; font-weight: 500; }
  .handle { color: rgba(255,255,255,.3); cursor: grab; }
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

export const LayoutCanvas = styled.div`
  display: grid;
  grid-template-columns: ${({ $device }) => $device === "mobile" ? "minmax(260px, 390px)" : "repeat(4, minmax(0, 1fr))"};
  grid-auto-rows: ${({ $device }) => $device === "mobile" ? "106px" : "clamp(155px, 15vw, 220px)"};
  justify-content: center;
  gap: 10px;
  padding: clamp(14px, 2.5vw, 28px);
  background-image: radial-gradient(rgba(255,255,255,.08) .7px, transparent .7px);
  background-size: 14px 14px;
  @media (max-width: 1150px) and (min-width: 861px) { grid-template-columns: ${({ $device }) => $device === "mobile" ? "minmax(260px, 390px)" : "repeat(2, minmax(0, 1fr))"}; }
  @media (max-width: 700px) { grid-template-columns: 1fr; grid-auto-rows: 112px; }
`;

export const GridCard = styled.article`
  position: relative;
  grid-column: ${({ $size }) => $size === "standard" || $size === "mobile" ? "span 1" : "span 2"};
  grid-row: ${({ $size }) => $size === "featured" ? "span 2" : "span 1"};
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 9px;
  background: #151717;
  cursor: grab;
  &:active { cursor: grabbing; }
  &:hover .size-control,
  &:focus-within .size-control { opacity: 1; }
  .size-control {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 3;
    padding: 4px;
    border-radius: 8px;
    background: rgba(7, 8, 8, .8);
    opacity: 0;
    transition: opacity 150ms ease;
  }
  @media (max-width: 700px) { grid-column: span 1; grid-row: span 1; }
`;

export const GridCardImage = styled.img`width: 100%; height: 100%; object-fit: cover; opacity: .72;`;
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
