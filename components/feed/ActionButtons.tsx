import { Video } from '@/types/types';
import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import React from 'react';

const ActionButtons = ({ video }: { video: Video }) => {
  return (
    <div>
      <aside className="absolute right-3 bottom-12 z-10 flex flex-col items-center gap-5">
        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2.5 rounded-full bg-black/20 backdrop-blur-sm group-active:scale-75 transition">
            <Heart className="w-7 h-7 text-white fill-transparent group-hover:text-red-500 transition-colors" />
          </div>
          <span className="text-xs font-medium text-white/90">
            {/* {video.likes} */}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2.5 rounded-full bg-black/20 backdrop-blur-sm group-active:scale-75 transition">
            <MessageCircle className="w-7 h-7 text-white fill-transparent" />
          </div>
          <span className="text-xs font-medium text-white/90">
            {/* {video.comments} */}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2.5 rounded-full bg-black/20 backdrop-blur-sm group-active:scale-75 transition">
            <Bookmark className="w-7 h-7 text-white fill-transparent group-hover:text-yellow-400 transition-colors" />
          </div>
          <span className="text-xs font-medium text-white/90">
            {/* {video.bookmarks} */}
          </span>
        </button>
      </aside>
    </div>
  );
};

export default ActionButtons;
