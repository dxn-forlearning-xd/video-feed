import { Video } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedStore = {
  savedVideos: Video[];
  activeIndex: number;
  _hasHydrated: boolean;

  toggleSave: (video: Video) => void;
  setActiveIndex: (index: number) => void;
  setHasHydrated: (state: boolean) => void;
};

export const useSavedStore = create<SavedStore>()(
  persist(
    (set) => ({
      savedVideos: [],
      activeVideoId: null,
      activeIndex: 0,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),
      toggleSave: (video) =>
        set(({ savedVideos }) => {
          const isExist = savedVideos.some((item) => item.id === video.id);
          return {
            savedVideos: isExist
              ? savedVideos.filter((item) => item.id !== video.id)
              : [...savedVideos, video],
          };
        }),

      setActiveIndex: (index) => set({ activeIndex: index }),
    }),
    {
      name: "my-app-saved-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
