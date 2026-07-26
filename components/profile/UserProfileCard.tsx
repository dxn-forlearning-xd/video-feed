import { User } from "lucide-react";
import React from "react";

const UserProfileCard = () => {
  return (
    <section className="flex flex-col items-center pt-6 px-4 pb-4">
      <div className="relative w-18 h-18 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden mb-3">
        <User className="w-12 h-12 text-zinc-400" />
      </div>

      <h1 className="font-bold tracking-wide">Guest User</h1>
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
  );
};

export default UserProfileCard;
