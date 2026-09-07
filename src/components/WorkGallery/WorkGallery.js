import React, { useEffect, useRef, useState } from "react";

import ModalPortal from "../../modal/ModalPortal";
import YoutubeModal from "../../modal/YoutubeModal";
import {
  Card,
  CardImage,
  CardMeta,
  CardNumber,
  CardOverlay,
  CardSubtitle,
  CardTitle,
  GalleryGrid,
  PlayButton,
  PlayIcon,
  ScreenReaderText,
} from "./style";

// 관리자 페이지 연결 전 사용하는 기본 배치입니다.
// 각 항목에 layout.desktop / layout.mobile / layout.order 값이 생기면
// 기본값 대신 관리자 설정을 바로 사용합니다.
const DEFAULT_DESKTOP_LAYOUT = ["featured", "wide", "wide"];

// 기존 JSON에 subtitle이 추가되면 그 값을 우선 사용합니다.
// 아래 값은 현재 레퍼런스를 확인하기 위한 임시 표시 문구입니다.
const REFERENCE_SUBTITLES = {
  "ve1Wm9f-X68": "낯선 시작이, 특별한 이야기가 되는 순간.",
  jcxnomGbMLI: "사랑이 만드는 힘.",
  ulp_oEwCXHQ: "그날의 웃음들.",
  fbRPtoAUsiQ: "AI가 만드는 새로운 가능성.",
  Rfr9dOzMkoI: "사람 중심의 혁신, AX의 시대.",
};

const WorkGallery = ({ items = [], typeLabel }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 700px)");
    let animationFrame;

    const updateCenteredCard = () => {
      if (!mobileQuery.matches) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - cardCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveMobileIndex((current) => current === closestIndex ? current : closestIndex);
      });
    };

    updateCenteredCard();
    window.addEventListener("scroll", updateCenteredCard, { passive: true });
    window.addEventListener("resize", updateCenteredCard);
    mobileQuery.addEventListener?.("change", updateCenteredCard);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateCenteredCard);
      window.removeEventListener("resize", updateCenteredCard);
      mobileQuery.removeEventListener?.("change", updateCenteredCard);
    };
  }, [items]);

  const handleCardClick = (event, item, index) => {
    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    if (isMobile && activeMobileIndex !== index) {
      setActiveMobileIndex(index);
      event.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSelectedVideo(item.src);
  };

  return (
    <>
      <GalleryGrid>
        {items.map((item, index) => {
          const desktopLayout =
            item.layout?.desktop || DEFAULT_DESKTOP_LAYOUT[index] || "standard";
          const mobileLayout = item.layout?.mobile || "standard";
          const order = item.layout?.order ?? index;
          const number = String(index + 1).padStart(2, "0");
          const subtitle = item.subtitle || REFERENCE_SUBTITLES[item.src];

          return (
            <Card
              as="button"
              type="button"
              key={`${item.src}-${index}`}
              ref={(node) => { cardRefs.current[index] = node; }}
              $desktopLayout={desktopLayout}
              $mobileLayout={mobileLayout}
              $mobileActive={activeMobileIndex === index}
              $order={order}
              onClick={(event) => handleCardClick(event, item, index)}
              onFocus={() => setActiveMobileIndex(index)}
              aria-label={`${item.title} 영상 재생`}
            >
              <CardImage
                src={`https://img.youtube.com/vi/${item.src}/maxresdefault.jpg`}
                alt=""
                loading={index > 2 ? "lazy" : "eager"}
                onError={(event) => {
                  event.currentTarget.src = `https://img.youtube.com/vi/${item.src}/hqdefault.jpg`;
                }}
              />
              <CardOverlay $desktopLayout={desktopLayout}>
                <CardMeta $desktopLayout={desktopLayout}>
                  {index === 0 ? "Featured" : item.category || typeLabel}
                  <CardNumber>{number}</CardNumber>
                </CardMeta>
                <CardTitle $desktopLayout={desktopLayout}>{item.title}</CardTitle>
                {subtitle && (
                  <CardSubtitle $desktopLayout={desktopLayout}>
                    {subtitle}
                  </CardSubtitle>
                )}
                <PlayButton $desktopLayout={desktopLayout} aria-hidden="true">
                  <PlayIcon />
                </PlayButton>
              </CardOverlay>
              <ScreenReaderText>영상 레이어에서 재생됩니다.</ScreenReaderText>
            </Card>
          );
        })}
      </GalleryGrid>

      {selectedVideo && (
        <ModalPortal>
          <YoutubeModal
            onClose={() => setSelectedVideo(null)}
            show={Boolean(selectedVideo)}
            srcState={selectedVideo}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default WorkGallery;
