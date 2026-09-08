import React from "react";
import videoList from "../../workList.json";
import spareVideoList from "../../spareWorkList.json";
import { createVideoCatalog } from "../../data/workSections";
import WorkGallery from "../WorkGallery/WorkGallery";

const VideoBox = ({ selectedCategory = "All" }) => {
  const source = videoList || spareVideoList || {};
  const videoCatalog = createVideoCatalog(
    source.videoJson || [],
    source.broadcastJson || []
  );
  const visibleItems = selectedCategory === "All"
    ? videoCatalog
    : videoCatalog.filter((item) => item.category === selectedCategory);

  return (
    <WorkGallery items={visibleItems} typeLabel="Video" />
  );
};

export default VideoBox;
