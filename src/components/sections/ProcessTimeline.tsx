'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { process } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTimeline() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      // Horizontal scroll on desktop
      gsap.to(track.current, {
        xPercent: -100,
        x: () => window.innerWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => '+=' + track.current?.offsetWidth,
          pin: true,
          scrub: 1,
        }
      });
    });

  }, { scope: container });

  return (
    <section ref={container} className="bg-zinc-950 text-white overflow-hidden py-24 lg:py-0 lg:h-screen flex items-center relative">
      
      <div className="lg:hidden px-6 max-w-2xl mx-auto py-24">
         <h2 className="text-[clamp(3rem,6vw,6rem)] font-medium tracking-tighter leading-none mb-16" style={{ fontFamily: 'var(--font-bricolage)' }}>
          How We Work
        </h2>
        <div className="flex flex-col gap-12 border-l border-white/10 pl-8 relative">
          {process.map((step, i) => (
             <div key={i} className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-zinc-950 border-4 border-[#0DAACC]" />
                <div className="text-sm font-bold uppercase tracking-widest text-[#0DAACC] mb-2">{step.step}</div>
                <h3 className="text-3xl font-medium tracking-tighter mb-4" style={{ fontFamily: 'var(--font-bricolage)' }}>{step.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">{step.desc}</p>
             </div>
          ))}
        </div>
      </div>

      <div ref={track} className="hidden lg:flex w-max items-center h-full pl-[10vw]">
        <div className="w-[30vw] shrink-0 mr-[10vw]">
          <h2 className="text-[6rem] font-medium tracking-tighter leading-none" style={{ fontFamily: 'var(--font-bricolage)' }}>
            How We<br />Work.
          </h2>
        </div>
        
        <div className="flex gap-24 items-center">
          {process.map((step, i) => (
            <div key={i} className="w-[400px] shrink-0 relative bg-zinc-900/50 border border-white/5 p-12 rounded-3xl">
               <div className="text-sm font-bold uppercase tracking-widest text-[#0DAACC] mb-6">{step.step}</div>
               <h3 className="text-4xl font-medium tracking-tighter mb-6" style={{ fontFamily: 'var(--font-bricolage)' }}>{step.title}</h3>
               <p className="text-zinc-400 text-xl leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
