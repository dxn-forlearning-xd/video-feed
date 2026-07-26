"use client";
import VideoCard from "./VideoCard";
import { GetVideoResponse, Video } from "@/types/types";
import { fetcher, getKey } from "@/services/fetcher";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSavedStore } from "@/store/useSavedStore";
import useSWRInfinite from "swr/infinite";

const FeedContainer = () => {
  const [isMuted, setIsMuted] = useState(true);

  const activeIndex = useSavedStore((state) => state.activeIndex);
  const setActiveIndex = useSavedStore((state) => state.setActiveIndex);

  const { data, error, isLoading, size, setSize, isValidating } =
    useSWRInfinite<GetVideoResponse>(getKey, fetcher);
  const videos = useMemo(() => {
    return data ? data.flatMap((page) => page.videos) : [];
  }, [data]);

  useEffect(() => {
    const isNearBottom = activeIndex > videos.length - 3;
    if (isNearBottom && !isValidating) {
      setSize(size + 1);
    }
  }, [activeIndex, videos.length, isValidating, setSize, size]);

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (videos && videos.length > 0 && isInitialMount.current) {
      isInitialMount.current = false;

      if (activeIndex > 0) {
        setTimeout(() => {
          const targetVideo = videos[activeIndex];
          if (targetVideo) {
            const el = document.getElementById(`video-${targetVideo.id}`);
            el?.scrollIntoView({ behavior: "instant", block: "start" });
          }
        }, 0);
      }
    }
  }, [videos, activeIndex]);
  return (
    <main className="w-full h-[calc(100vh-70px)] overflow-y-scroll snap-y snap-mandatory scrollbar-none ">
      {videos?.map((video: Video, index: number) => {
        const isNearby = Math.abs(index - activeIndex) <= 1;
        if (!isNearby) {
          return (
            <div
              key={video.id}
              className="w-full h-full snap-start snap-always"
            />
          );
        }
        return (
          <VideoCard
            key={video.id}
            video={video}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onActive={() => setActiveIndex(index)}
          />
        );
      })}
    </main>
  );
};

export default FeedContainer;
