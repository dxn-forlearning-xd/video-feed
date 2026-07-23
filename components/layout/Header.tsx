'use client';
import { Volume2, VolumeX } from 'lucide-react';
import React, { useState } from 'react';

const Header = () => {
  const [activeTab, setActiveTab] = useState<'following' | 'forYou'>('forYou');
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div>
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-4 py-4 bg-linear-to-b from-black/60 to-transparent">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white/80 active:scale-95 transition"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
        <div className="flex items-center gap-6 text-base font-semibold">
          <button
            onClick={() => setActiveTab('following')}
            className={`relative py-1 transition ${
              activeTab === 'following'
                ? 'text-white font-bold'
                : 'text-white/60'
            }`}
          >
            Following
            {activeTab === 'following' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('forYou')}
            className={`relative py-1 transition ${
              activeTab === 'forYou' ? 'text-white font-bold' : 'text-white/60'
            }`}
          >
            For you
            {activeTab === 'forYou' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white rounded-full" />
            )}
          </button>
        </div>
        <div className="w-9" />
      </header>
    </div>
  );
};

export default Header;
