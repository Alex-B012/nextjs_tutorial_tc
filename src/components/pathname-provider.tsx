"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PathnameProvider() {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return null;
}
