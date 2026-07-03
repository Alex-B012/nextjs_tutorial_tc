"use client";

import { Container } from "@/components/shared/container";
import { authClient } from "@/lib/tools/auth-client";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FILM = "Film";
const PLOT = "Plot";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkTransparency = () => {
    if (/^\/film\/[^/]+$/.test(pathname)) return true;
    if (pathname === "/" && !isAuthenticated) return true;
    return false;
  };

  const isTransparentPage = checkTransparency();
  const shouldBeTransparent = isTransparentPage && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full h-16 transition-all duration-300 ease-in-out",
        shouldBeTransparent
          ? "bg-transparent"
          : "bg-card/95 backdrop-blur-md border-b border-border/40",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-b from-black/90 via-black/50 to-transparent h-32 pointer-events-none transition-opacity duration-500",
          shouldBeTransparent ? "opacity-100" : "opacity-0",
        )}
      >
        <Container className="relative z-10 flex h-full items-center justify-between">
          <Link href="/" className="mr-8 flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tighter text-foreground uppercase">
              {FILM}
              <span className="text-primary">{PLOT}</span>
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <nav className="flex items-center space-x-6 text-sm font-semibold uppercase tracking-wider text-muted">
              <Link
                href="/films"
                className="transition-colors hover:text-foreground"
              >
                Films
              </Link>
              {/* <UserNav /> */}
            </nav>
          </div>
        </Container>
      </div>
    </header>
  );
}
