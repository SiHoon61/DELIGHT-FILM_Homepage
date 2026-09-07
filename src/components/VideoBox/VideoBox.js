import React from "react";
import videoList from "../../workList.json";
import spareVideoList from "../../spareWorkList.json";
import { excludeShorts } from "../../data/workSections";
import WorkGallery from "../WorkGallery/WorkGallery";

const VideoBox = () => {
  const videoJson = excludeShorts(
    videoList?.videoJson || spareVideoList?.videoJson || []
  );

  return <WorkGallery items={videoJson} typeLabel="Video" />;
};

export default VideoBox;
