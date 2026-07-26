import Image from "next/image";
import { Play, Heart, Check } from "lucide-react";
import { Video } from "@/types/types";

interface SavedVideoGridProps {
  videos: Video[];
  isSelectMode: boolean;
  selectedIds: number[];
  onSelect: (id: number) => void;
  onVideoClick: (index: number) => void;
}

export default function SavedVideoGrid({
  videos,
  isSelectMode,
  selectedIds,
  onSelect,
  onVideoClick,
}: SavedVideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 text-zinc-500">
        <Heart className="w-12 h-12 stroke-[1.5] mb-2" />
        <p className="text-sm">No liked videos yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 pb-11">
      {videos.map((video, index) => {
        const isChecked = selectedIds.includes(video.id);

        return (
          <div
            key={video.id}
            onClick={
              isSelectMode
                ? () => onSelect(video.id)
                : () => onVideoClick(index)
            }
            className="relative aspect-3/4 bg-zinc-900 rounded-sm overflow-hidden group cursor-pointer"
          >
            {isSelectMode && (
              <div
                className={`absolute right-2 top-2 z-10 rounded-full h-5 w-5 flex items-center justify-center border transition ${
                  isChecked
                    ? "bg-red-600 border-red-600 text-white"
                    : "bg-black/40 border-white/60 text-transparent"
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-3" />
              </div>
            )}

            <Image
              src={video.image}
              alt="saved video cover"
              width={300}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
              <div className="flex items-center gap-1 text-xs text-white/90 font-medium">
                <Play className="w-3 h-3 fill-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
