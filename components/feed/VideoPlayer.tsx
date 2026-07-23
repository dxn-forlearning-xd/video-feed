import { Video } from '@/types/types';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
type VideoPlayerProps = {
  video: Video;
  isMuted: boolean;
  onToggleMute: () => void;
};
const BGM_LIST = [
  'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
  'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73467.mp3',
  'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3',
];
const VideoPlayer = ({ video, isMuted, onToggleMute }: VideoPlayerProps) => {
  const currentBgm = BGM_LIST[video.id % BGM_LIST.length];

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const videoSrc = video.video_files?.[0]?.link;

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
          audioRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          audioRef.current?.pause();
        }
      },
      { threshold: 0.6 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!videoRef.current || !audioRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      audioRef.current.play();
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
          muted={true}
          playsInline
          onVolumeChange={() => {
            if (videoRef.current) {
              console.log('🔊 当前视频实际静音状态:', videoRef.current.muted);
            }
          }}
          className="w-full h-full object-cover"
        />
        <audio ref={audioRef} src={currentBgm} loop muted={isMuted} />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleMute();
        }}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    </section>
  );
};

export default VideoPlayer;
