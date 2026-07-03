import Link from "next/link";

const COURSE_URL = "https://github.com/teacoder52";
const LINK_NAME = "Next.js Course";

export function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border/40 py-6 mt-auto">
      <div className="max-w-275 mx-auto px-4 flex items-center justify-center">
        <p className="text-xs font-medium uppercase tracking-widest text-muted/60 text-center select-none">
          Build with passion as part of Next.js course by{" "}
          <Link
            href={COURSE_URL}
            className="text-muted hover:text-primary transition-colors cursor-pointer font-semibold"
            target="_blank"
          >
            {LINK_NAME}
          </Link>
        </p>
      </div>
    </footer>
  );
}
