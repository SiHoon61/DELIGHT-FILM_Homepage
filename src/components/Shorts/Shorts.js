import React, { useState } from "react";

import videoList from "../../workList.json";
import spareVideoList from "../../spareWorkList.json";
import { selectShorts } from "../../data/workSections";
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
  const source = videoList || spareVideoList || {};
  const shorts = selectShorts(source.videoJson || [], source.broadcastJson || []);

  return (
    <>
      <Grid>
        {shorts.map((item) => (
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
