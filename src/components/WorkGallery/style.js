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
    gap: 14px;
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
      $mobileLayout === "portrait" ? "4 / 5" : "16 / 10"};
    min-height: 0;
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
  padding: clamp(18px, 2.15vw, 36px);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.04) 24%,
    rgba(0, 0, 0, 0.82) 100%
  );

  @media (max-width: 700px) {
    padding: 20px;
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
`;

export const CardTitle = styled.h2`
  max-width: calc(100% - 66px);
  margin: 0;
  overflow: hidden;
  font-family: var(--font-sansMedium);
  font-size: clamp(17px, 1.55vw, 27px);
  font-weight: 500;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 700px) {
    font-size: 19px;
  }
`;

export const PlayButton = styled.span`
  position: absolute;
  right: clamp(18px, 2vw, 32px);
  bottom: clamp(18px, 2vw, 32px);
  display: grid;
  width: clamp(42px, 3.5vw, 56px);
  height: clamp(42px, 3.5vw, 56px);
  place-items: center;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(4px);

  @media (max-width: 700px) {
    right: 18px;
    bottom: 18px;
    width: 44px;
    height: 44px;
  }
`;

export const PlayIcon = styled.span`
  width: 0;
  height: 0;
  margin-left: 3px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 11px solid #fff;
`;

export const ScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
