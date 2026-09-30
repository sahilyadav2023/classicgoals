'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { hero } from '@/lib/content';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-text-line', 
      { y: 100, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.5 }
    )
    .fromTo('.hero-desc',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-visual',
      { scale: 0.8, opacity: 0, y: 100 },
      { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
      '-=1'
    );

    // Subtle parallax on scroll
    gsap.to('.hero-visual-inner', {
      y: 150,
      scale: 1.05,
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

  }, { scope: container });

  const headlineLines = hero.headline.split('\n');

  return (
    <section ref={container} id="home" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-32 pb-20 bg-zinc-950 text-white perspective-[1000px]">
      
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] w-full mx-auto px-6 z-10 flex flex-col items-center text-center">
        
        <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tighter font-medium mb-8" style={{ fontFamily: 'var(--font-bricolage)' }}>
          {headlineLines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <div className="hero-text-line transform-gpu origin-bottom">
                {line}
              </div>
            </div>
          ))}
        </h1>
        
        <p className="hero-desc text-zinc-400 text-[clamp(1rem,1.5vw,1.25rem)] max-w-2xl mx-auto leading-relaxed mb-12">
          {hero.copy}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={hero.primaryCta.href} className="hero-cta bg-white text-zinc-950 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide flex items-center gap-2 hover:scale-105 transition-transform" style={{ color: '#09090b' }}>
            {hero.primaryCta.label}
          </a>
          <a href={hero.secondaryCta.href} className="hero-cta text-white border border-white/20 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide flex items-center gap-2 hover:bg-white/5 transition-colors" style={{ color: '#fff' }}>
            {hero.secondaryCta.label} <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Abstract Premium Visual */}
      <div className="hero-visual mt-32 max-w-[1000px] w-full mx-auto px-6 relative z-0 h-[40vh] md:h-[60vh] flex items-center justify-center">
        <div className="hero-visual-inner relative w-full h-full flex items-center justify-center perspective-[1200px]">
          
          {/* Central glowing core */}
          <div className="absolute w-48 h-48 md:w-80 md:h-80 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse" />
          
          <div className="relative w-32 h-32 md:w-56 md:h-56 rounded-full border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden z-10">
            <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)]" />
          </div>

          {/* Floating glass pills */}
          <div className="absolute top-[20%] left-[10%] md:left-[20%] w-32 md:w-48 h-12 md:h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center px-4 gap-3 transform -rotate-12 hover:scale-105 transition-transform duration-500 z-20">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            <div className="h-1.5 w-12 md:w-20 bg-white/20 rounded-full" />
          </div>

          <div className="absolute bottom-[20%] right-[10%] md:right-[15%] w-40 md:w-56 h-12 md:h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center px-4 gap-3 transform rotate-6 hover:scale-105 transition-transform duration-500 z-20">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="h-1.5 w-full bg-white/20 rounded-full" />
              <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />
            </div>
          </div>

          {/* Orbiting rings */}
          <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-white/5 rounded-full transform rotate-45" />
          <div className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] border border-white/5 rounded-full transform -rotate-12" />
          
        </div>
      </div>
    </section>
  );
}
