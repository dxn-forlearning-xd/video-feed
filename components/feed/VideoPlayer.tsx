import { Video } from '@/types/types';
import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ video }: { video: Video }) => {
  const videoSrc = video.video_files?.[0]?.link;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.6 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <section
      key={video.id}
      className="relative w-full h-full snap-start snap-always flex items-center justify-center bg-zinc-900"
    >
      <div
        ref={containerRef}
        onClick={togglePlay}
        className="relative w-full h-full max-w-125 mx-auto bg-black overflow-hidden flex items-center justify-center"
      >
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <Play className="w-16 h-16 text-white/80 animate-pulse" />
          </div>
        )}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={video.image}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default VideoPlayer;
