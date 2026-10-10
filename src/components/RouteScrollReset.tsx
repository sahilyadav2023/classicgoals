'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

export default function RouteScrollReset() {
  const pathname = usePathname();

  const reset = () => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;

      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }
  };

  useLayoutEffect(() => {
    reset();
  }, [pathname]);

  useEffect(() => {
    reset();
    const t = setTimeout(reset, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
