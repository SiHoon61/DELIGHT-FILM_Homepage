import React, { useState } from "react";

import videoList from "../../workList.json";
import spareVideoList from "../../spareWorkList.json";
import {
  createShortsCatalog,
} from "../../data/workSections";
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
  Grid,
  ImageFrame,
  PlayButton,
  PlayIcon,
} from "./style";

const Shorts = ({ selectedCategory = "All" }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const source = videoList || spareVideoList || {};
  const shortsCatalog = createShortsCatalog(
    source.videoJson || [],
    source.broadcastJson || []
  );
  const visibleItems = selectedCategory === "All"
    ? shortsCatalog
    : shortsCatalog.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Grid>
        {visibleItems.map((item, index) => (
          <Card
            as="button"
            type="button"
            key={item.src}
            onClick={() => setSelectedVideo(item.src)}
            aria-label={`${item.title} 쇼츠 영상 재생`}
          >
            <ImageFrame>
              <CardImage
                src={`https://i.ytimg.com/vi/${item.src}/oar2.jpg`}
                alt=""
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = `https://img.youtube.com/vi/${item.src}/maxresdefault.jpg`;
                }}
              />
              <CardOverlay>
                <CardMeta>
                  <span>{item.category || "Shorts"}</span>
                  <CardNumber>{String(index + 1).padStart(2, "0")}</CardNumber>
                </CardMeta>
                <CardTitle>{item.title}</CardTitle>
                {item.subtitle && <CardSubtitle>{item.subtitle}</CardSubtitle>}
              </CardOverlay>
              <PlayButton aria-hidden="true"><PlayIcon /></PlayButton>
            </ImageFrame>
          </Card>
        ))}
      </Grid>

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

export default Shorts;
