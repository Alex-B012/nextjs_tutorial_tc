"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const [text, setText] = useState("");
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/dashboard" },
    { name: "Settings", href: "/dashboard/settings" },
    { name: "Analytics", href: "/dashboard/analytics" },
  ];

  return (
    <aside className="w-64 bg-blue-50 p-6 border-r border-blue-100 flex flex-col">
      <div className="mb-8 text-xs font-bold text-blue-500 uppercase tracking-widest font-sans">
        Dashboard Layout
      </div>
      <nav className="flex flex-col gap-4 text-black">
        <span className="font-bold text-sm text-zinc-400">Navigation</span>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href ?? index}
              href={item.href}
              className={`transition-colors hover:text-blue-600 ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "hover:text-zinc-400 text-zinc-700"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-blue-200">
        <label className="block text-[10px] font-bold text-blue-400 uppercase mb-2">
          Persistent State (Layout)
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text will be saved"
          className="w-full p-2 text-sm border border-blue-200 rounded bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </aside>
  );
}
