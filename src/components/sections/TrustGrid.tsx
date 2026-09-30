'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trustCards } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function TrustGrid() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.trust-card', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-zinc-950 text-white z-10 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustCards.map((card, i) => (
            <div key={i} className="trust-card bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:bg-zinc-800/50 transition-colors group">
              <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4 group-hover:text-white transition-colors">{card.title}</h3>
              <p className="text-xl font-medium tracking-tight" style={{ fontFamily: 'var(--font-bricolage)' }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
