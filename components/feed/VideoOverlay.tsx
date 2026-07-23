import { Video } from '@/types/types';
import React from 'react';

const VideoOverlay = ({ video }: { video: Video }) => {
  return (
    <div>
      <div className="absolute left-4 bottom-6 right-16 z-10 flex flex-col gap-2 text-left">
        <h3 className="text-base font-bold text-white drop-shadow">
          {video.user.name}
        </h3>
        <p className="text-sm text-white/90 line-clamp-2 font-normal leading-snug drop-shadow">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
          fugiat accusantium at possimus delectus vitae veniam perferendis porro
          labore quibusdam similique ratione dignissimos voluptas dolorem
          debitis cum, modi reprehenderit autem?
        </p>
      </div>
    </div>
  );
};

export default VideoOverlay;
