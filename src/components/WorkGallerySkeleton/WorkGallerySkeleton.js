import React from "react";

import {
  ScreenReaderStatus,
  ShortsSkeletonCard,
  ShortsSkeletonGrid,
  SkeletonLine,
  SkeletonLines,
  SkeletonPlay,
  VideoSkeletonCard,
  VideoSkeletonGrid,
} from "./style";

const VIDEO_SKELETONS = [
  { columnSpan: 2, rowSpan: 2 },
  { columnSpan: 2, rowSpan: 1 },
  { columnSpan: 2, rowSpan: 1 },
  { columnSpan: 1, rowSpan: 1 },
  { columnSpan: 1, rowSpan: 1 },
  { columnSpan: 1, rowSpan: 1 },
  { columnSpan: 1, rowSpan: 1 },
  { columnSpan: 2, rowSpan: 1 },
];

const SkeletonDetails = ({ compact = false }) => (
  <>
    <SkeletonLines $compact={compact} aria-hidden="true">
      <SkeletonLine $short />
      <SkeletonLine />
    </SkeletonLines>
    <SkeletonPlay aria-hidden="true" />
  </>
);

const WorkGallerySkeleton = ({ section }) => {
  const isShorts = section === "shorts";

  return (
    <div aria-busy="true" aria-live="polite">
      <ScreenReaderStatus role="status">
        작품 배치를 불러오는 중입니다.
      </ScreenReaderStatus>
      {isShorts ? (
        <ShortsSkeletonGrid aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <ShortsSkeletonCard key={index} $index={index}>
              <SkeletonDetails compact />
            </ShortsSkeletonCard>
          ))}
        </ShortsSkeletonGrid>
      ) : (
        <VideoSkeletonGrid aria-hidden="true">
          {VIDEO_SKELETONS.map((item, index) => (
            <VideoSkeletonCard
              key={index}
              $columnSpan={item.columnSpan}
              $rowSpan={item.rowSpan}
              $index={index}
            >
              <SkeletonDetails />
            </VideoSkeletonCard>
          ))}
        </VideoSkeletonGrid>
      )}
    </div>
  );
};

export default WorkGallerySkeleton;
