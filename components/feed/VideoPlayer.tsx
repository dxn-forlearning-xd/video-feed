import { useSavedStore } from "@/store/useSavedStore";
import { Video } from "@/types/types";
import { Play, Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
type VideoPlayerProps = {
  video: Video;
  isMuted: boolean;
  onToggleMute: () => void;
  onActive: () => void;
};
const BGM_LIST = [
  "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
  "https://cdn.pixabay.com/audio/2022/10/14/audio_9939f792cb.mp3",
  "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3",
  "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3",
];
const VideoPlayer = ({
  video,
  isMuted,
  onToggleMute,
  onActive,
}: VideoPlayerProps) => {
  const currentBgm = BGM_LIST[video.id % BGM_LIST.length];

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const videoSrc = video.video_files?.[0]?.link;

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          onActive?.();
          videoRef.current.play().catch(() => {});
          if (audioRef.current) {
            audioRef.current.muted = isMuted;
            audioRef.current.play().catch(() => {});
          }
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
  }, [isMuted]);

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

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (video) {
      const current = video.currentTime;
      const total = video.duration;

      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
    if (video && audio) {
      if (Math.abs(audio.currentTime - video.currentTime) > 0.8) {
        audio.currentTime = video.currentTime;
      }
    }
  };

  const handleToggleMuteBtn = (e: React.MouseEvent) => {
    e.stopPropagation();

    const nextMuted = !isMuted;
    onToggleMute();

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;

      if (!nextMuted && isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log(err);
        });
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current || !videoRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const percentage = Math.max(0, Math.min(1, clickX / width));

    const newTime = percentage * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    if (videoRef.current && audioRef.current) {
      audioRef.current.currentTime = videoRef.current.currentTime;
    }
    setProgress(percentage * 100);
  };

  return (
    <section
      key={video.id}
      id={`video-${video.id}`}
      className="relative w-full h-full snap-start snap-always flex items-center justify-center bg-zinc-900"
    >
      <div
        ref={containerRef}
        onClick={togglePlay}
        className="relative w-full h-full max-w-125 mx-auto bg-black overflow-hidden flex items-center justify-center"
      >
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <Play className="w-16 h-16 text-white/80" />
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
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
        />
        <audio ref={audioRef} src={currentBgm} loop muted={isMuted} />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>
      <div
        ref={progressBarRef}
        onClick={handleSeek}
        className="absolute bottom-0 sleft-0 w-full h-2 cursor-pointer z-20 flex items-end"
      >
        <div className="w-full h-1.5 group-hover:h-2 bg-white/30 transition-all duration-150">
          <div className="h-full bg-white" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <button
        onClick={handleToggleMuteBtn}
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
