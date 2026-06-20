"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "High-Performance File Server",
    desc: "This is an ElysiaJS microservice for streaming and large file processing with minimum overhead.",
    category: "elysia",
    stars: 120,
    date: "2026-04-10",
  },
  {
    id: 2,
    title: "LMS Education Dashboard",
    desc: "A modern learning management dashboard built with ElysiaJS, providing analytics, course management, and real-time student progress tracking.",
    category: "education",
    stars: 98,
    date: "2026-03-22",
  },
  {
    id: 3,
    title: "Real-Time Analytics Platform",
    desc: "A scalable analytics platform powered by ElysiaJS for collecting, processing, and visualizing real-time application metrics.",
    category: "analytics",
    stars: 143,
    date: "2026-02-18",
  },
  {
    id: 4,
    title: "Edge Authentication Service",
    desc: "A lightweight authentication and authorization service designed for edge environments with JWT support and high-performance session validation.",
    category: "security",
    stars: 176,
    date: "2026-01-30",
  },
  {
    id: 5,
    title: "Dark Minimalist UI Library",
    desc: "A customizable component library featuring a dark aesthetic, accessibility-first design, and seamless integration with modern frontend frameworks.",
    category: "ui",
    stars: 215,
    date: "2025-12-12",
  },
];

export function ProjectsLibrary() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "newest";

  const label_class =
    "text-[10px] font-black text-zinc-500 uppercase tracking-widest";

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase());

      const matchesCategory = category === "all" || p.category === category;

      return matchesQuery && matchesCategory;
    }).sort((a, b) => {
      return sort === "popular"
        ? b.stars - a.stars
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [query, category, sort]);

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="min-h-screen gb-black text-zinc-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-2">
            Project Library
          </h1>
          <p className="text-zinc-500 font-medium">
            State management: Search, Filters, Sorting
          </p>
        </div>

        <div className="h-8 flex items-center">
          {isPending && (
            <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase animate-pulse">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              Synchronizing...
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-8">
          <div className="space-y-3">
            <label className={label_class}>Search</label>
            <input
              type="text"
              value={searchParams.get("query") || ""}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams.toString());

                if (e.target.value) {
                  params.set("query", e.target.value);
                } else {
                  params.delete("query");
                }

                startTransition(() => {
                  router.replace(`${pathname}?${params.toString()}`, {
                    scroll: false,
                  });
                });
              }}
              placeholder="Name or description"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          <div className="space-y-3">
            <label className={label_class}>Technology</label>
            <div className="flex flex-wrap gap-2">
              {[
                "all",
                "elysia",
                "nextjs",
                "education",
                "analytics",
                "security",
                "ui",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateParams("category", cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${category === cat ? `bg-blue-600 text-white` : `bg-zinc-900 text-zinc-500 hover:bg-zinc-800`}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className={label_class}>Sorting</label>
            <select
              value={sort}
              onChange={(e) => updateParams("sort", e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none"
            >
              <option value="newest">Latest</option>
              <option value="popular">Most popular</option>
            </select>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-blue-600/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold bg-blue-600/10 text-blue-500 px-2 py-1 rounded uppercase">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-600">
                    ⭐ {project.stars}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {project.desc}
                </p>
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-800 rounded-3xl">
                <p className="text-zinc-600 font-medium">No projects found.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
