import React from "react";
import VideoPlayer from "./VideoPlayer";
import ActionButtons from "./ActionButtons";
import VideoOverlay from "./VideoOverlay";
import { Video } from "@/types/types";
import Header from "../layout/Header";
type VideoCardProps = {
  video: Video;
  isMuted: boolean;
  onToggleMute: () => void;
};
const VideoCard = ({ video, isMuted, onToggleMute }: VideoCardProps) => {
  return (
    <section className="relative max-w-125 mx-auto h-full text-white overflow-hidden select-none snap-start">
      <Header />
      <VideoPlayer
        video={video}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
      />
      <ActionButtons video={video} />
      <VideoOverlay video={video} />
    </section>
  );
};

export default VideoCard;
