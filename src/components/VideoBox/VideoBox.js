import React from "react";
import WorkGallery from "../WorkGallery/WorkGallery";

const VideoBox = ({ items = [] }) => {
  return (
    <WorkGallery items={items} typeLabel="Video" />
  );
};

export default VideoBox;
