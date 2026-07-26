import React from "react";
import VideoPlayer from "./VideoPlayer";
import ActionButtons from "./ActionButtons";
import VideoOverlay from "./VideoOverlay";
import { Video } from "@/types/types";
type VideoCardProps = {
  video: Video;
  isMuted: boolean;
  onToggleMute: () => void;
  onActive: () => void;
  isLoading: boolean;
};
const VideoCard = ({
  video,
  isMuted,
  onToggleMute,
  onActive,
  isLoading,
}: VideoCardProps) => {
  return (
    <section className="relative max-w-125 mx-auto h-full text-white overflow-hidden select-none snap-start">
      <VideoPlayer
        video={video}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onActive={onActive}
      />
      <ActionButtons video={video} isLoading={isLoading} />
      <VideoOverlay video={video} isLoading={isLoading} />
    </section>
  );
};

export default VideoCard;
