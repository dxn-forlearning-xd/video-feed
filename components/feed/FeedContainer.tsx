'use client';
import useSWR from 'swr';
import VideoCard from './VideoCard';
import { GetVideoResponse, Video } from '@/types/types';
import { fetcher } from '@/services/fetcher';
import { useState } from 'react';

const FeedContainer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const { data, error, isLoading } = useSWR<GetVideoResponse>(
    'https://api.pexels.com/v1/videos/popular',
    fetcher,
  );
  const videos = data?.videos;
  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };
  return (
    <main className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-none">
      {videos?.map((video: Video) => {
        return (
          <VideoCard
            key={video.id}
            video={video}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        );
      })}
    </main>
  );
};

export default FeedContainer;
