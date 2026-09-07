import React, { useState } from "react";
import videoList from "../../workList.json";
import spareVideoList from "../../spareWorkList.json";
import {
  createVideoCatalog,
  VIDEO_CATEGORIES,
} from "../../data/workSections";
import CategoryAccordion from "../CategoryAccordion/CategoryAccordion";
import WorkGallery from "../WorkGallery/WorkGallery";

const VideoBox = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const source = videoList || spareVideoList || {};
  const videoCatalog = createVideoCatalog(
    source.videoJson || [],
    source.broadcastJson || []
  );
  const categories = VIDEO_CATEGORIES.filter(
    (category) =>
      category === "All" || videoCatalog.some((item) => item.category === category)
  );
  const visibleItems = selectedCategory === "All"
    ? videoCatalog
    : videoCatalog.filter((item) => item.category === selectedCategory);

  return (
    <>
      <CategoryAccordion
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        items={videoCatalog}
      />
      <WorkGallery items={visibleItems} typeLabel="Video" />
    </>
  );
};

export default VideoBox;
