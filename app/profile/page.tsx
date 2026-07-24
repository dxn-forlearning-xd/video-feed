"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, Heart, Play, User } from "lucide-react";
import Image from "next/image";

const MOCK_LIKED_VIDEOS = [
  {
    id: "1",
    title: "Cherry Blossom",
    views: "12.4K",
    cover:
      "https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "2",
    title: "Ocean Waves",
    views: "85.1K",
    cover:
      "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "3",
    title: "Urban Vibes",
    views: "3.2K",
    cover:
      "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"Liked" | "Saved">("Liked");

  return (
    <div className="min-h-screen bg-black text-white max-w-125 mx-auto relative border-x border-zinc-800 pb-10">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <Link
          href="/"
          className="p-1 rounded-full hover:bg-zinc-800 transition"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <span className="font-semibold text-base">Guest User</span>
        <div className="w-6" />
      </header>

      <section className="flex flex-col items-center pt-6 px-4 pb-4">
        <div className="relative w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden mb-3">
          <User className="w-12 h-12 text-zinc-400" />
        </div>

        <h1 className="text-xl font-bold tracking-wide">Guest User</h1>
        <p className="text-xs text-zinc-400 mt-1">@guest_123456</p>

        <div className="flex items-center gap-8 my-5">
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm">0</span>
            <span className="text-xs text-zinc-400">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm">0</span>
            <span className="text-xs text-zinc-400">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm">12</span>
            <span className="text-xs text-zinc-400">Likes</span>
          </div>
        </div>

        <div className="w-full flex gap-2 justify-center max-w-xs">
          <button className="flex-1 py-2 rounded-md bg-red-700 hover:bg-red-800 font-medium text-sm transition cursor-pointer">
            Log in / Sign up
          </button>
        </div>
      </section>

      <div className="flex border-b border-zinc-800 mt-2">
        <button
          onClick={() => setActiveTab("Liked")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition border-b-2 cursor-pointer ${activeTab === "Liked" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
        >
          <Heart className="w-4 h-4" />
          Liked
        </button>
        <button
          onClick={() => setActiveTab("Saved")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition border-b-2 cursor-pointer ${activeTab === "Saved" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
        >
          <Bookmark className="w-4 h-4" />
          Saved
        </button>
      </div>

      <main className="p-1">
        {MOCK_LIKED_VIDEOS.length > 0 ? (
          <div className="grid grid-cols-3 gap-1">
            {MOCK_LIKED_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="relative aspect-3/4 bg-zinc-900 rounded-sm overflow-hidden group cursor-pointer"
              >
                <Image
                  src={video.cover}
                  alt={video.title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                  <div className="flex items-center gap-1 text-xs text-white/90 font-medium">
                    <Play className="w-3 h-3 fill-white" />
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
            <Heart className="w-12 h-12 stroke-[1.5] mb-2" />
            <p className="text-sm">No liked videos yet</p>
          </div>
        )}
      </main>
    </div>
  );
}
