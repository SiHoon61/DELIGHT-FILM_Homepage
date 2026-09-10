import styled, { css, keyframes } from "styled-components";

const shimmer = keyframes`
  from { transform: translateX(-115%); }
  to { transform: translateX(115%); }
`;

const skeletonSurface = css`
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: #101010;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(
      105deg,
      transparent 28%,
      rgba(255, 255, 255, 0.025) 40%,
      rgba(255, 255, 255, 0.11) 50%,
      rgba(255, 255, 255, 0.025) 60%,
      transparent 72%
    );
    transform: translateX(-115%);
    animation: ${shimmer} 1.55s cubic-bezier(0.65, 0, 0.35, 1) infinite;
    animation-delay: ${({ $index = 0 }) => `${Math.min($index, 4) * 55}ms`};
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(180deg, transparent 34%, rgba(0, 0, 0, 0.5));
  }

  @media (prefers-reduced-motion: reduce) {
    &::before { animation: none; transform: none; opacity: .45; }
  }
`;

export const VideoSkeletonGrid = styled.div`
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

export const VideoSkeletonCard = styled.div`
  ${skeletonSurface};
  grid-column: span ${({ $columnSpan }) => $columnSpan};
  grid-row: span ${({ $rowSpan }) => $rowSpan};

  @media (max-width: 1100px) {
    grid-column: span ${({ $columnSpan }) => Math.min(2, $columnSpan)};
  }

  @media (max-width: 700px) {
    width: 100%;
    aspect-ratio: 3 / 1;
    border-width: 0 0 1px;
    border-radius: 0;
  }
`;

export const ShortsSkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(24px, 3vw, 48px) clamp(14px, 2vw, 28px);
  width: 100%;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 12px;
  }
`;

export const ShortsSkeletonCard = styled.div`
  ${skeletonSurface};
  aspect-ratio: 9 / 16;
  border-radius: 8px;
`;

export const SkeletonLines = styled.div`
  position: absolute;
  right: ${({ $compact }) => ($compact ? "16px" : "18px")};
  bottom: ${({ $compact }) => ($compact ? "18px" : "20px")};
  left: ${({ $compact }) => ($compact ? "16px" : "18px")};
  z-index: 1;
  display: grid;
  gap: 9px;

  @media (max-width: 700px) {
    right: 64px;
    bottom: 16px;
    left: 16px;
    gap: 7px;
  }
`;

export const SkeletonLine = styled.span`
  display: block;
  width: ${({ $short }) => ($short ? "28%" : "62%")};
  height: ${({ $short }) => ($short ? "7px" : "13px")};
  border-radius: 999px;
  background: ${({ $short }) =>
    $short ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.16)"};
`;

export const SkeletonPlay = styled.span`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 1;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;

  @media (max-width: 700px) {
    right: 14px;
    bottom: 14px;
    width: 30px;
    height: 30px;
  }
`;

export const ScreenReaderStatus = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
