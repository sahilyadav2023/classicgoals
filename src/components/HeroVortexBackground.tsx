'use client';
import { useRef, useEffect, useCallback } from 'react';

/**
 * HeroVortexBackground
 * ---------------------
 * Renders a full-size <canvas> that draws an animated hourglass / double-cone
 * vortex made of curved filament lines.  Positioned absolute inside the hero,
 * behind all content.
 *
 * Performance:
 * – Uses 2D canvas (no heavy GL deps).
 * – pauses when hero is off-screen (IntersectionObserver).
 * – pauses when tab is hidden (visibilitychange).
 * – reduces line count on mobile (< 768 px).
 * – respects prefers-reduced-motion.
 */

// ── helpers ──────────────────────────────────────────────────────────────────
function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

// ── Vortex math ──────────────────────────────────────────────────────────────
// Each "filament" is a 3-D parametric curve: a circle of radius r(t) at
// height t ∈ [-1,1], where r(t) = waist + spread·|t|^power.
// We sample many points along t, rotate them by the filament's base angle
// plus a global rotation offset, and project with simple perspective.

interface FilamentParams {
  /** base angle around the vertical axis (radians) */
  baseAngle: number;
  /** angular offset that drifts over time (breathing) */
  breathPhase: number;
  breathSpeed: number;
  /** slight per-filament radius jitter multiplier */
  radiusJitter: number;
  /** opacity multiplier */
  alpha: number;
}

function createFilaments(count: number): FilamentParams[] {
  const out: FilamentParams[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      baseAngle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.25,
      breathPhase: Math.random() * Math.PI * 2,
      breathSpeed: 0.15 + Math.random() * 0.35,
      radiusJitter: 0.85 + Math.random() * 0.3,
      alpha: 0.12 + Math.random() * 0.28,
    });
  }
  return out;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function HeroVortexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafId = useRef(0);
  const visible = useRef(true);
  const tabVisible = useRef(true);
  const time = useRef(0);
  const lastFrame = useRef(0);

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      filaments: FilamentParams[],
      frozen: boolean,
    ) => {
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      // Vortex dimensions scale to hero size
      const vortexHeight = h * 0.9;       // almost full hero height
      const waist = w * 0.012;            // narrow pinch
      const spread = w * 0.22;            // how wide the flare goes
      const power = 1.6;                  // flare curvature
      const stepsPerFilament = 120;       // number of sample points along t
      const perspD = w * 1.2;             // perspective divisor
      const globalRotSpeed = 0.08;        // radians per second

      const t = frozen ? 0 : time.current;
      const globalRot = t * globalRotSpeed;

      // We draw each filament as a path of projected 3-D points.
      for (let fi = 0; fi < filaments.length; fi++) {
        const f = filaments[fi];
        const breathOffset = frozen
          ? 0
          : Math.sin(t * f.breathSpeed + f.breathPhase) * 0.06;

        ctx.beginPath();

        let started = false;
        for (let si = 0; si <= stepsPerFilament; si++) {
          // t parameter from -1 (top) to +1 (bottom)
          const tParam = -1 + (2 * si) / stepsPerFilament;
          const absT = Math.abs(tParam);

          // Radius at this height
          const r =
            (waist + spread * Math.pow(absT, power)) * f.radiusJitter;

          // Angle = base + global rotation + slight spiral twist along t
          const angle =
            f.baseAngle + globalRot + breathOffset + tParam * 0.45;

          // 3-D coords (y is vertical, x and z form the circle)
          const x3 = r * Math.cos(angle);
          const z3 = r * Math.sin(angle);
          const y3 = tParam * (vortexHeight / 2);

          // Simple perspective projection
          const scale = perspD / (perspD + z3);
          const sx = cx + x3 * scale;
          const sy = cy + y3 * scale;

          if (!started) {
            ctx.moveTo(sx, sy);
            started = true;
          } else {
            ctx.lineTo(sx, sy);
          }
        }

        // Thinner lines further from viewer get slightly less alpha
        const baseAlpha = f.alpha;
        ctx.strokeStyle = `rgba(255,255,255,${baseAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // -- Scattered dots for the sparse-outer-edge texture ----------------
      const dotCount = filaments.length * 2;
      for (let di = 0; di < dotCount; di++) {
        const tParam = (Math.random() * 2 - 1);
        const absT = Math.abs(tParam);
        const maxR = (waist + spread * Math.pow(absT, power)) * 1.4;
        const r = maxR * (0.6 + Math.random() * 0.8); // scatter beyond the surface
        const angle = Math.random() * Math.PI * 2 + globalRot;
        const x3 = r * Math.cos(angle);
        const z3 = r * Math.sin(angle);
        const y3 = tParam * (vortexHeight / 2);

        const scale = perspD / (perspD + z3);
        const sx = cx + x3 * scale;
        const sy = cy + y3 * scale;

        ctx.beginPath();
        ctx.arc(sx, sy, 0.8 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.08})`;
        ctx.fill();
      }
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frozen = prefersReducedMotion();
    const mobile = isMobile();
    const filamentCount = mobile ? 100 : 260;
    const filaments = createFilaments(filamentCount);

    // -- resize handler ---------------------------------------------------
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // -- visibility -------------------------------------------------------
    const onVisibility = () => {
      tabVisible.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    const observer = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    // -- animation loop ---------------------------------------------------
    const loop = (now: number) => {
      rafId.current = requestAnimationFrame(loop);

      if (!visible.current || !tabVisible.current) {
        lastFrame.current = now;
        return;
      }

      const dt = Math.min((now - (lastFrame.current || now)) / 1000, 0.1);
      lastFrame.current = now;
      if (!frozen) time.current += dt;

      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      draw(ctx, rect.width, rect.height, filaments, frozen);
    };

    rafId.current = requestAnimationFrame(loop);

    // If frozen (reduced-motion), draw once
    if (frozen) {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) draw(ctx, rect.width, rect.height, filaments, true);
    }

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
        /* Radial vignette: transparent centre fading to the hero bg colour */
        maskImage:
          'radial-gradient(ellipse 70% 65% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 70% 65% at 50% 50%, black 30%, transparent 100%)',
      }}
    />
  );
}
