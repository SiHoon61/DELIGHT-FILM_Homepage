import React from "react";
import broadcastList from "../../workList.json";
import spareBroadcastList from "../../spareWorkList.json";
import WorkGallery from "../WorkGallery/WorkGallery";

const Broadcast = () => {
  const broadcastJson =
    broadcastList?.broadcastJson || spareBroadcastList?.broadcastJson || [];

  return <WorkGallery items={broadcastJson} typeLabel="Broadcast" />;
};

export default Broadcast;
