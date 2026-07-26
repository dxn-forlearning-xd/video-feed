"use client";

import { Heart } from "lucide-react";
import { useSavedStore } from "@/store/useSavedStore";
import { useState } from "react";
import { SavedVideosModal } from "@/components/profile/SavedVideosModal";
import { BackButton } from "@/components/ui/BackButton";
import { useRouter } from "next/navigation";
import UserProfileCard from "@/components/profile/UserProfileCard";
import SavedVideoGrid from "@/components/profile/SavedVideoGrid";
import BatchDeleteBar from "@/components/profile/BatchDeleteBar";
export default function ProfilePage() {
  const router = useRouter();

  const savedVideos = useSavedStore((state) => state.savedVideos);
  const setSavedVideos = useSavedStore((state) => state.setSavedVideos);
  const hasHydrated = useSavedStore((state) => state._hasHydrated);

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelect = (targetId: number) => {
    const isSelected = selectedIds.includes(targetId);
    if (isSelected) {
      setSelectedIds(selectedIds.filter((id) => id !== targetId));
    } else {
      setSelectedIds([...selectedIds, targetId]);
    }
  };

  const handleDelete = () => {
    const newSavedVideos = savedVideos.filter(
      (video) => !selectedIds.includes(video.id),
    );
    setSavedVideos(newSavedVideos);

    // 清空选中并退出编辑状态
    setSelectedIds([]);
    setIsSelectMode(false);
  };

  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null,
  );

  if (!hasHydrated) {
    return <div className="w-full max-w-125 mx-auto h-40 bg-transparent" />;
  }

  return (
    <div className="w-full min-h-screen bg-black text-white max-w-125 mx-auto relative border-x border-zinc-800 pb-20">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <BackButton onClick={() => router.back()} />
        <span className="font-semibold text-base">Guest User</span>

        {savedVideos.length > 0 ? (
          <button
            onClick={() => {
              setIsSelectMode(!isSelectMode);
              setSelectedIds([]);
            }}
            className="text-xs font-medium text-zinc-300 hover:text-white transition cursor-pointer w-8"
          >
            {isSelectMode ? "Cancel" : "Select"}
          </button>
        ) : (
          <div className="w-6" />
        )}
      </header>
      <UserProfileCard />
      <main className="p-1 w-full mx-auto">
        {savedVideos.length > 0 ? (
          <SavedVideoGrid
            videos={savedVideos}
            isSelectMode={isSelectMode}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onVideoClick={(index) => setSelectedVideoIndex(index)}
          />
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-16 text-zinc-500">
            <Heart className="w-12 h-12 stroke-[1.5] mb-2" />
            <p className="text-sm">No liked videos yet</p>
          </div>
        )}

        {selectedVideoIndex !== null && (
          <SavedVideosModal
            videos={savedVideos}
            initialIndex={selectedVideoIndex}
            onClose={() => setSelectedVideoIndex(null)}
          />
        )}
      </main>

      {isSelectMode && (
        <BatchDeleteBar
          selectedCount={selectedIds.length}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
