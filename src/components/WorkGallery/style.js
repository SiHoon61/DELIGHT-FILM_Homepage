import styled from "styled-components";

const desktopColumns = ({ $desktopLayout }) => {
  if ($desktopLayout === "featured" || $desktopLayout === "wide") {
    return "span 2";
  }
  return "span 1";
};

const desktopRows = ({ $desktopLayout }) =>
  $desktopLayout === "featured" ? "span 2" : "span 1";

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-flow: dense;
  grid-auto-rows: clamp(190px, 17vw, 280px);
  gap: clamp(12px, 1.35vw, 22px);
  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: clamp(210px, 28vw, 300px);
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

export const Card = styled.article`
  position: relative;
  grid-column: ${desktopColumns};
  grid-row: ${desktopRows};
  order: ${({ $order }) => $order};
  min-width: 0;
  overflow: hidden;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  background: #101010;
  color: #fff;
  text-align: left;
  cursor: pointer;
  isolation: isolate;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: rgba(255, 255, 255, 0.06);
    opacity: 0;
    transition: opacity 220ms ease;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
  }

  &:hover img,
  &:focus-visible img {
    transform: scale(1.025);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
  }

  @media (max-width: 1100px) {
    grid-column: ${({ $desktopLayout }) =>
      $desktopLayout === "standard" ? "span 1" : "span 2"};
  }

  @media (max-width: 700px) {
    width: 100%;
    aspect-ratio: ${({ $mobileLayout }) =>
      $mobileLayout === "portrait" ? "4 / 5" : "3 / 1"};
    min-height: 0;
    border-width: 0 0 1px;
    border-radius: 0;
  }
`;

export const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 480ms cubic-bezier(0.2, 0.75, 0.25, 1);
`;

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ $desktopLayout }) =>
    $desktopLayout === "standard" ? "18px" : "clamp(18px, 2.15vw, 36px)"};
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.04) 24%,
    rgba(0, 0, 0, 0.82) 100%
  );

  @media (max-width: 700px) {
    align-items: flex-start;
    justify-content: center;
    padding: 14px 78px 14px 16px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.66) 38%,
      rgba(0, 0, 0, 0.08) 100%
    );
  }
`;

export const CardMeta = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  font-family: var(--font-sansBold);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);

  ${({ $desktopLayout }) =>
    $desktopLayout === "standard" &&
    `
      gap: 8px;
      margin-bottom: 7px;
      font-size: 10px;
    `}

  @media (max-width: 700px) {
    gap: 7px;
    margin-bottom: 5px;
    font-size: 9px;
  }
`;

export const CardNumber = styled.span`
  &::before {
    content: "";
    display: inline-block;
    width: 24px;
    height: 1px;
    margin: 0 10px 3px 0;
    background: currentColor;
  }

  @media (max-width: 700px) {
    &::before {
      width: 14px;
      margin-right: 7px;
    }
  }
`;

export const CardTitle = styled.h2`
  max-width: ${({ $desktopLayout }) =>
    $desktopLayout === "standard" ? "calc(100% - 48px)" : "calc(100% - 66px)"};
  margin: 0;
  overflow: hidden;
  font-family: var(--font-sansMedium);
  font-size: ${({ $desktopLayout }) =>
    $desktopLayout === "standard"
      ? "clamp(16px, 1.2vw, 20px)"
      : "clamp(17px, 1.55vw, 27px)"};
  font-weight: 500;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $desktopLayout }) =>
    $desktopLayout === "standard" ? 3 : 2};

  @media (max-width: 700px) {
    max-width: 220px;
    font-size: 15px;
    line-height: 1.3;
  }
`;

export const CardSubtitle = styled.p`
  display: -webkit-box;
  max-width: ${({ $desktopLayout }) =>
    $desktopLayout === "standard" ? "calc(100% - 48px)" : "calc(100% - 66px)"};
  margin: 7px 0 0;
  overflow: hidden;
  font-family: var(--font-sansRegular);
  font-size: ${({ $desktopLayout }) =>
    $desktopLayout === "standard" ? "13px" : "clamp(13px, 1vw, 16px)"};
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.68);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 700px) {
    max-width: 210px;
    margin-top: 4px;
    font-size: 11px;
    line-height: 1.35;
    -webkit-line-clamp: 1;
  }
`;

export const PlayButton = styled.span`
  position: absolute;
  right: ${({ $desktopLayout }) =>
    $desktopLayout === "standard" ? "16px" : "clamp(18px, 2vw, 32px)"};
  bottom: ${({ $desktopLayout }) =>
    $desktopLayout === "standard" ? "16px" : "clamp(18px, 2vw, 32px)"};
  display: grid;
  width: ${({ $desktopLayout }) =>
    $desktopLayout === "standard" ? "38px" : "clamp(42px, 3.5vw, 56px)"};
  height: ${({ $desktopLayout }) =>
    $desktopLayout === "standard" ? "38px" : "clamp(42px, 3.5vw, 56px)"};
  place-items: center;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(4px);

  @media (max-width: 700px) {
    right: 14px;
    bottom: 14px;
    width: 30px;
    height: 30px;
    border-width: 1px;
  }
`;

export const PlayIcon = styled.span`
  width: 0;
  height: 0;
  margin-left: 3px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 11px solid #fff;

  @media (max-width: 700px) {
    border-top-width: 5px;
    border-bottom-width: 5px;
    border-left-width: 8px;
  }
`;

export const ScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
