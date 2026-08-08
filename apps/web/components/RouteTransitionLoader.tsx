"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CentralLoader } from "./CentralLoader";

// Ported from rrm-landing/src/router/Router.tsx's RouterContent — a fixed
// 1500ms loader on every route change (not tied to data readiness).
export function RouteTransitionLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // "Storing information from previous renders" pattern, done during render
  // per https://react.dev/reference/react/useState#storing-information-from-previous-renders
  // — avoids the extra render an effect-based comparison would cost, and
  // (unlike a ref) stays compatible with the React Compiler.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsLoading(true);
  }

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return <CentralLoader open={isLoading} />;
}
