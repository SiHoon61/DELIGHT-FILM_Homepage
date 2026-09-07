import React, { useState } from "react";

import videoList from "../../workList.json";
import spareVideoList from "../../spareWorkList.json";
import {
  createShortsCatalog,
  SHORTS_CATEGORIES,
} from "../../data/workSections";
import CategoryAccordion from "../CategoryAccordion/CategoryAccordion";
import ModalPortal from "../../modal/ModalPortal";
import YoutubeModal from "../../modal/YoutubeModal";
import {
  Card,
  CardImage,
  CardInfo,
  CardSubtitle,
  CardTitle,
  Grid,
  ImageFrame,
  PlayButton,
  PlayIcon,
} from "./style";

const Shorts = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const source = videoList || spareVideoList || {};
  const shortsCatalog = createShortsCatalog(
    source.videoJson || [],
    source.broadcastJson || []
  );
  const categories = SHORTS_CATEGORIES.filter(
    (category) =>
      category === "All" || shortsCatalog.some((item) => item.category === category)
  );
  const visibleItems = selectedCategory === "All"
    ? shortsCatalog
    : shortsCatalog.filter((item) => item.category === selectedCategory);

  return (
    <>
      <CategoryAccordion
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        items={shortsCatalog}
      />
      <Grid>
        {visibleItems.map((item) => (
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
              <PlayButton aria-hidden="true">
                <PlayIcon />
              </PlayButton>
            </ImageFrame>
            <CardInfo>
              <CardTitle>{item.title}</CardTitle>
              {item.subtitle && <CardSubtitle>{item.subtitle}</CardSubtitle>}
            </CardInfo>
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
