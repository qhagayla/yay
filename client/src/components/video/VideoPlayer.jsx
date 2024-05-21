import React from "react";

function VideoPlayer({ srcVid }) {
  return (
    <video className="h-full w-full rounded-lg" controls>
      <source src={srcVid} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
