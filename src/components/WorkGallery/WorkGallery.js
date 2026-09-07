import React, { useState } from "react";

import ModalPortal from "../../modal/ModalPortal";
import YoutubeModal from "../../modal/YoutubeModal";
import {
  Card,
  CardImage,
  CardMeta,
  CardNumber,
  CardOverlay,
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

const WorkGallery = ({ items = [], typeLabel }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <>
      <GalleryGrid>
        {items.map((item, index) => {
          const desktopLayout =
            item.layout?.desktop || DEFAULT_DESKTOP_LAYOUT[index] || "standard";
          const mobileLayout = item.layout?.mobile || "standard";
          const order = item.layout?.order ?? index;
          const number = String(index + 1).padStart(2, "0");

          return (
            <Card
              as="button"
              type="button"
              key={`${item.src}-${index}`}
              $desktopLayout={desktopLayout}
              $mobileLayout={mobileLayout}
              $order={order}
              onClick={() => setSelectedVideo(item.src)}
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
              <CardOverlay>
                <CardMeta>
                  {index === 0 ? "Featured" : typeLabel}
                  <CardNumber>{number}</CardNumber>
                </CardMeta>
                <CardTitle>{item.title}</CardTitle>
                <PlayButton aria-hidden="true">
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
