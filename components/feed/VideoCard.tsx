import React from 'react';
import VideoPlayer from './VideoPlayer';
import ActionButtons from './ActionButtons';
import VideoOverlay from './VideoOverlay';
import { Video } from '@/types/types';
type VideoCardProps = {
  video: Video;
  isMuted: boolean;
  onToggleMute: () => void;
};
const VideoCard = ({ video, isMuted, onToggleMute }: VideoCardProps) => {
  return (
    <section className="relative w-full h-full bg-black text-white overflow-hidden select-none snap-start">
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
