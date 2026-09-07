import React from "react";
import broadcastList from "../../workList.json";
import spareBroadcastList from "../../spareWorkList.json";
import { excludeShorts } from "../../data/workSections";
import WorkGallery from "../WorkGallery/WorkGallery";

const Broadcast = () => {
  const broadcastJson = excludeShorts(
    broadcastList?.broadcastJson || spareBroadcastList?.broadcastJson || []
  );

  return <WorkGallery items={broadcastJson} typeLabel="Broadcast" />;
};

export default Broadcast;
