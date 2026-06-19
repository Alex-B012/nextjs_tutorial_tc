"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-row min-h-[calc(100vh-2rem)] border-4 border-blue-500 rounded-xl m-4 overflow-hidden">
      <aside className="w-64 bg-blue-50 p-6 border-r border-blue-100 flex flex-col">
        <div className="mb-8 text-xs font-bold text-blue-500 uppercase tracking-widest font-sans">
          Dashboard Layout
        </div>
        <nav className="flex flex-col gap-4 text-black">
          <span className="font-bold text-sm text-zinc-400">Navigation</span>
          <Link
            href={`/dashboard`}
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href={`/dashboard/settings`}
            className="hover:text-blue-600 transition-colors"
          >
            Settings
          </Link>
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
      <main className="flex flex-col flex-1 bg-white p-8">{children}</main>
    </div>
  );
}
