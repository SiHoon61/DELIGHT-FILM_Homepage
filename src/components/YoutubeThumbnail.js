import React, { useState } from "react";

const ThumbnailImage = ({ videoId, section, alt = "", ...imageProps }) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const base = `https://i.ytimg.com/vi/${videoId}`;
  const sources = [
    ...(section === "shorts" ? [`${base}/oar2.jpg`] : []),
    `${base}/maxresdefault.jpg`,
    `${base}/sddefault.jpg`,
    `${base}/hqdefault.jpg`,
    `${base}/mqdefault.jpg`,
  ];
  const advanceSource = () => setSourceIndex((current) => Math.min(current + 1, sources.length - 1));

  return (
    <img
      {...imageProps}
      alt={alt}
      src={sources[sourceIndex]}
      onError={advanceSource}
      onLoad={(event) => {
        // YouTube sometimes returns a small placeholder with HTTP 200.
        if (event.currentTarget.naturalWidth <= 120) advanceSource();
      }}
    />
  );
};

const YoutubeThumbnail = ({ videoId, section, ...imageProps }) => (
  <ThumbnailImage key={`${videoId}:${section}`} videoId={videoId} section={section} {...imageProps} />
);

export default YoutubeThumbnail;
