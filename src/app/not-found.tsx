import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-[80vh] text-center p-10">
      <h1 className="text-6xl font-black text-zinc-400 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-zinc-400 mb-2">Page not found</h2>
      <p className="text-zinc-500 mb-8 max-w-md">
        Oops! This page doesn’t exist or may have been moved.
      </p>
      <Link
        href={"/"}
        className="px-10 py-3 bg-zinc-300 text-black rounded-full font-medium hover:bg-zinc-400 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
