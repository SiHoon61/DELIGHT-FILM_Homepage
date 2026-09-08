import styled from "styled-components";

export const Grid = styled.div`
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

export const Card = styled.article`
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 5px;
  }

  &:hover img,
  &:focus-visible img {
    filter: brightness(1.08) contrast(1.02);
  }
`;

export const ImageFrame = styled.span`
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 9 / 16;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: #111;
  transition: border-color 180ms ease, box-shadow 200ms ease;

  ${Card}:hover &,
  ${Card}:focus-visible & {
    border-color: rgba(255, 255, 255, 0.46);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.26);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.96);
  transition: filter 200ms ease;
`;

export const PlayButton = styled.span`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(4px);
  opacity: 0.5;
  transition: opacity 180ms ease, background-color 180ms ease;

  ${Card}:hover &,
  ${Card}:focus-visible & {
    opacity: 1;
    border-color: #fee500;
    background: rgba(0, 0, 0, 0.38);
  }

  @media (max-width: 700px) {
    right: 9px;
    bottom: 9px;
    width: 31px;
    height: 31px;
    border-width: 1px;
    opacity: 1;
  }
`;

export const PlayIcon = styled.span`
  width: 0;
  height: 0;
  margin-left: 3px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 9px solid #fff;
  transition: border-left-color 180ms ease;

  ${Card}:hover &,
  ${Card}:focus-visible & {
    border-left-color: #fee500;
  }
`;

export const CardInfo = styled.span`
  display: block;
  padding-top: 12px;
`;

export const CardMeta = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.48);
  font-family: var(--font-sansBold);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const CardNumber = styled.span`
  flex: 0 0 auto;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

export const CardTitle = styled.h2`
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  font-family: var(--font-sansMedium);
  font-size: clamp(16px, 1.3vw, 21px);
  font-weight: 500;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

export const CardSubtitle = styled.p`
  display: -webkit-box;
  margin: 5px 0 0;
  overflow: hidden;
  font-family: var(--font-sansRegular);
  font-size: 14px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.55);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (min-width: 701px) {
    visibility: hidden;
    opacity: 0;
    transform: translateY(5px);
    transition: opacity 180ms ease, transform 220ms ease, visibility 0s linear 220ms;

    ${Card}:hover &,
    ${Card}:focus-visible & {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0s;
    }
  }

  @media (max-width: 700px) {
    font-size: 12px;
  }
`;
