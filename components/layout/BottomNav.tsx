"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-125 bg-black/80 backdrop-blur-md border-t border-zinc-800/80 px-6 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-4 transition-colors ${
                isActive
                  ? "text-white font-semibold"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-transform ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              />
              <span className="text-[10px] tracking-wider">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
