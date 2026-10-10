'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const scrollToTarget = (targetSelector: string, immediate = false) => {
      if (!targetSelector || targetSelector === '#' || targetSelector === '/') return;
      try {
        const target = document.querySelector(targetSelector);
        if (target) {
          lenis.scrollTo(target as HTMLElement, {
            offset: -20,
            immediate,
            duration: immediate ? 0 : 0.9,
          });
        }
      } catch {
        // ignore invalid selector
      }
    };

    // If landing from another page with a hash (e.g. /#services), smoothly scroll like the navbar
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        scrollToTarget(hash, false);
      }, 120);
    }

    const onHashChange = () => {
      if (window.location.hash) {
        scrollToTarget(window.location.hash, false);
      }
    };
    window.addEventListener('hashchange', onHashChange);

    // Intercept in-page anchor clicks for smooth scrolling without refreshing ScrollTrigger
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;

      if (href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          scrollToTarget(href, false);
          window.history.pushState(null, '', href);
        }
      } else if (href.startsWith('/#') && window.location.pathname === '/') {
        const targetId = href.replace('/', '');
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          scrollToTarget(targetId, false);
          window.history.pushState(null, '', targetId);
        }
      }
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

