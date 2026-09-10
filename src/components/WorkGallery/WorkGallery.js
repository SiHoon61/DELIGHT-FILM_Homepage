import React, { useState } from "react";

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

  return (
    <>
      <GalleryGrid>
        {items.map((item, index) => {
          const columnSpan = Math.min(4, Math.max(1, item.layout?.desktopColumnSpan || 1));
          const rowSpan = Math.min(4, Math.max(1, item.layout?.desktopRowSpan || 1));
          const emphasized = columnSpan > 1 || rowSpan > 1;
          const number = String(index + 1).padStart(2, "0");
          const subtitle = item.subtitle || REFERENCE_SUBTITLES[item.src];

          return (
            <Card
              as="button"
              type="button"
              key={`${item.src}-${index}`}
              $columnSpan={columnSpan}
              $rowSpan={rowSpan}
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
              <CardOverlay $emphasized={emphasized}>
                <CardMeta $emphasized={emphasized}>
                  {index === 0 ? "Featured" : item.category || typeLabel}
                  <CardNumber>{number}</CardNumber>
                </CardMeta>
                <CardTitle $emphasized={emphasized}>{item.title}</CardTitle>
                {subtitle && (
                  <CardSubtitle $emphasized={emphasized}>
                    {subtitle}
                  </CardSubtitle>
                )}
                <PlayButton $emphasized={emphasized} aria-hidden="true">
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
