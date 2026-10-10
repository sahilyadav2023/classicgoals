'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ────────────────────────────────────────────────────────────────
// Brand-appropriate SVG icons for the accent loop
// Each is a simple single-path icon designed at 16×16, rendered
// at the dot's size via the container. All use currentColor.
// ────────────────────────────────────────────────────────────────

const ACCENT_ICONS = [
  // 0 — plain dot/circle (rest state)
  <svg key="dot" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="5" />
  </svg>,

  // 1 — upward trend arrow
  <svg key="trend" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12 L7 6 L10 9 L14 4" />
    <path d="M10 4 H14 V8" />
  </svg>,

  // 2 — location pin
  <svg key="pin" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.5A4.25 4.25 0 0 0 3.75 5.75C3.75 9.25 8 14.5 8 14.5s4.25-5.25 4.25-8.75A4.25 4.25 0 0 0 8 1.5zm0 6a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5z" />
  </svg>,

  // 3 — star
  <svg key="star" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.5l1.76 4.27 4.54.4-3.44 2.96 1.04 4.47L8 11.1 4.1 13.6l1.04-4.47L1.7 6.17l4.54-.4z" />
  </svg>,

  // 4 — small diamond / brand accent shape
  <svg key="diamond" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2 L13 8 L8 14 L3 8 Z" />
  </svg>,
];

// Characters to cycle through during scramble effect
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?+';

// ────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────

interface AnimatedHeadlineProps {
  /** The full headline text. Newlines (\n) become line-breaks. */
  text: string;
  /** Words to highlight with accent color. */
  highlightWords?: string[];
}

export default function AnimatedHeadline({ text, highlightWords }: AnimatedHeadlineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const accentTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrambleTimersRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // ── Detect reduced motion ──────────────────────────────────
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // ── Build character spans ──────────────────────────────────
  // The headline is split into lines at \n, then each line into
  // characters. We identify the ACCENT SLOT: the period after
  // "Presence" (last char of line 1).
  const lines = text.split('\n');

  type CharMeta = {
    char: string;
    isSpace: boolean;
    isAccent: boolean;
    lineIdx: number;
    globalIdx: number;
  };

  const allChars: CharMeta[] = [];
  let globalIdx = 0;
  lines.forEach((line, lineIdx) => {
    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      // Accent slot: the period at end of "Presence." (last char of first line)
      const isAccent = lineIdx === 0 && c === line.length - 1 && ch === '.';
      allChars.push({
        char: ch,
        isSpace: ch === ' ',
        isAccent,
        lineIdx,
        globalIdx: globalIdx++,
      });
    }
  });

  // ── Scramble-in entrance (GSAP) ────────────────────────────
  useGSAP(() => {
    if (prefersReducedMotion) {
      // Just show it instantly
      gsap.set('.anim-char', { opacity: 1, y: 0 });
      return;
    }

    const charEls = gsap.utils.toArray<HTMLElement>('.anim-char');
    if (!charEls.length) return;

    // Set initial state
    gsap.set(charEls, { opacity: 0, y: 20 });

    // For each character, run a scramble interval then resolve
    const baseStagger = 0.045; // ~45ms between each char start
    const totalChars = charEls.length;

    charEls.forEach((el, i) => {
      const finalChar = el.getAttribute('data-char') || '';
      const isSpace = el.getAttribute('data-space') === 'true';
      const isAccent = el.getAttribute('data-accent') === 'true';

      if (isSpace) {
        // Spaces just fade in
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          delay: 0.8 + i * baseStagger,
        });
        return;
      }

      // Random jitter ±30ms
      const jitter = (Math.random() - 0.5) * 0.06;
      const charDelay = 0.8 + i * baseStagger + jitter;

      // Start the scramble cycle
      const scrambleDuration = 0.75; // seconds of scrambling
      const scrambleInterval = 70; // ms between glyph swaps
      let scrambleTimer: ReturnType<typeof setInterval> | null = null;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: charDelay,
        onStart: () => {
          if (isAccent) {
            // For accent slot, just show the dot briefly then we replace with icon loop later
            el.textContent = '.';
            return;
          }
          // Begin scramble cycling
          scrambleTimer = setInterval(() => {
            el.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }, scrambleInterval);
          scrambleTimersRef.current.push(scrambleTimer);
        },
      });

      // Resolve to final character after scramble duration
      if (!isAccent) {
        gsap.delayedCall(charDelay + scrambleDuration, () => {
          if (scrambleTimer) clearInterval(scrambleTimer);
          el.textContent = finalChar;
        });
      }
    });

    // After the full entrance (~2.8s), start the accent loop
    const entranceDone = 0.8 + totalChars * baseStagger + 0.75 + 0.3;
    gsap.delayedCall(entranceDone, () => {
      startAccentLoop();
    });
  }, { scope: wrapperRef, dependencies: [prefersReducedMotion] });

  // ── Accent icon loop ───────────────────────────────────────
  const startAccentLoop = useCallback(() => {
    const accentEl = accentRef.current;
    if (!accentEl || prefersReducedMotion) return;

    // Get all icon wrappers inside the accent slot
    const icons = accentEl.querySelectorAll<HTMLElement>('.accent-icon');
    if (!icons.length) return;

    // Show the first icon
    gsap.set(icons[0], { opacity: 1, scale: 1, rotation: 0 });

    const tl = gsap.timeline({ repeat: -1, delay: 0.5 });

    for (let i = 0; i < icons.length; i++) {
      const current = icons[i];
      const next = icons[(i + 1) % icons.length];

      // Fade + scale out current
      tl.to(current, {
        opacity: 0,
        scale: 0.6,
        rotation: -12,
        duration: 0.35,
        ease: 'power2.in',
      }, `swap${i}`)
      // Fade + scale in next
      .fromTo(next,
        { opacity: 0, scale: 0.6, rotation: 12 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.35, ease: 'power2.out' },
        `swap${i}+=0.15`
      )
      // Pause between swaps
      .to({}, { duration: 2.8 });
    }

    accentTimelineRef.current = tl;
  }, [prefersReducedMotion]);

  // ── Pause on out-of-view / tab hidden ──────────────────────
  useEffect(() => {
    const accentEl = accentRef.current;
    if (!accentEl || prefersReducedMotion) return;

    // IntersectionObserver — pause when hero scrolls away
    const io = new IntersectionObserver(
      ([entry]) => {
        const tl = accentTimelineRef.current;
        if (!tl) return;
        if (entry.isIntersecting) {
          tl.play();
        } else {
          tl.pause();
        }
      },
      { threshold: 0 }
    );
    if (wrapperRef.current) io.observe(wrapperRef.current);

    // visibilitychange — pause when tab hidden
    const onVisibility = () => {
      const tl = accentTimelineRef.current;
      if (!tl) return;
      if (document.hidden) {
        tl.pause();
      } else {
        tl.play();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [prefersReducedMotion]);

  // ── Cleanup scramble intervals on unmount ──────────────────
  useEffect(() => {
    return () => {
      scrambleTimersRef.current.forEach(clearInterval);
      scrambleTimersRef.current = [];
      accentTimelineRef.current?.kill();
    };
  }, []);

  // ── Render ─────────────────────────────────────────────────
  let charCounter = 0;

  return (
    <div
      ref={wrapperRef}
      className="animated-headline-wrap"
      aria-label={text.replace('\n', ' ')}
      role="heading"
      aria-level={1}
    >
      {lines.map((line, lineIdx) => {
        // Pre-compute which character positions should be highlighted
        const hlRanges: [number, number][] = [];
        if (highlightWords) {
          for (const w of highlightWords) {
            let from = 0;
            let idx: number;
            while ((idx = line.indexOf(w, from)) !== -1) {
              hlRanges.push([idx, idx + w.length - 1]);
              from = idx + 1;
            }
          }
        }
        const isHL = (ci: number) => hlRanges.some(([s, e]) => ci >= s && ci <= e);

        return (
        <div key={lineIdx} className="overflow-hidden">
          <div className="hero-text-line transform-gpu origin-bottom">
            {line.split('').map((char, charIdx) => {
              const meta = allChars.find(
                (c) => c.lineIdx === lineIdx && c.globalIdx === charCounter
              );
              charCounter++;

              if (meta?.isAccent) {
                // ACCENT SLOT — period replaced with cycling icon container
                return (
                  <span
                    key={`accent-${lineIdx}-${charIdx}`}
                    ref={accentRef}
                    className="anim-char anim-accent-slot"
                    data-char="."
                    data-space="false"
                    data-accent="true"
                    aria-hidden="true"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '0.55em',
                      height: '0.55em',
                      position: 'relative',
                      verticalAlign: 'baseline',
                      marginBottom: '0.05em',
                    }}
                  >
                    {ACCENT_ICONS.map((icon, iconIdx) => (
                      <span
                        key={iconIdx}
                        className="accent-icon"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: iconIdx === 0 && prefersReducedMotion ? 1 : 0,
                          color: iconIdx === 0 ? 'currentColor' : '#0DAACC',
                        }}
                      >
                        {icon}
                      </span>
                    ))}
                  </span>
                );
              }

              if (meta?.isSpace) {
                return (
                  <span
                    key={`space-${lineIdx}-${charIdx}`}
                    className="anim-char"
                    data-char=" "
                    data-space="true"
                    data-accent="false"
                    aria-hidden="true"
                    style={{ display: 'inline', width: '0.3em' }}
                  >
                    &nbsp;
                  </span>
                );
              }

              const highlighted = isHL(charIdx);
              return (
                <span
                  key={`char-${lineIdx}-${charIdx}`}
                  className="anim-char"
                  data-char={char}
                  data-space="false"
                  data-accent="false"
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    textAlign: 'center',
                    color: highlighted ? '#0DAACC' : undefined,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
        );
      })}
    </div>
  );
}
