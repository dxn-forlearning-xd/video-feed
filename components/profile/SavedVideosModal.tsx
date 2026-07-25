import { Video } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import VideoCard from "../feed/VideoCard";
import { BackButton } from "../ui/BackButton";

interface SavedVideosModalProps {
  videos: Video[];
  initialIndex: number;
  onClose: () => void;
}

export const SavedVideosModal = ({
  videos,
  initialIndex,
  onClose,
}: SavedVideosModalProps) => {
  const [modalVideos] = useState(videos);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (initialIndex > 0 && containerRef.current) {
      const targetElement = containerRef.current.children[
        initialIndex
      ] as HTMLElement;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "instant", block: "start" });
      }
    }
  }, [initialIndex]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <header className="absolute top-0 w-full z-20 flex items-center justify-center px-4 py-4 bg-linear-to-b from-black/60 to-transparent max-w-125 mx-auto">
        <div className="flex items-center gap-6 text-base font-semibold">
          <BackButton onClick={onClose} className="absolute left-4.5 top-3" />
          <div
            className={`relative py-1 transition text-white font-bold
            `}
          >
            Saved
          </div>
        </div>
      </header>

      <div
        ref={containerRef}
        className="w-full h-full max-w-125 overflow-y-scroll snap-y snap-mandatory scrollbar-none"
      >
        {modalVideos.map((video, index) => {
          const isNearby = Math.abs(index - activeIndex) <= 1;

          return (
            <div key={video.id} className="w-full h-full snap-start relative">
              {isNearby ? (
                <VideoCard
                  key={video.id}
                  video={video}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted((prev) => !prev)}
                  onActive={() => setActiveIndex(index)}
                />
              ) : (
                <div className="w-full h-full bg-black" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
