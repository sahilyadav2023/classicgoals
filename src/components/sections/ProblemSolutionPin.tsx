'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolutionPin() {
  const container = useRef<HTMLDivElement>(null);
  const pinWrap = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: () => (typeof window !== 'undefined' && window.innerWidth < 768 ? '+=1800' : '+=3000'),
        pin: true,
        scrub: 1,
      }
    });

    // Initial state: Problem visible
    tl.to('.problem-text', { opacity: 0, y: -50, duration: 1 })
      .fromTo('.solution-1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .to('.solution-1', { opacity: 0, y: -50, duration: 1, delay: 0.5 })
      .fromTo('.solution-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .to('.solution-2', { opacity: 0, y: -50, duration: 1, delay: 0.5 })
      .fromTo('.solution-3', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .to('.solution-3', { opacity: 0, y: -50, duration: 1, delay: 0.5 })
      .fromTo('.solution-4', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });

  }, { scope: container });

  return (
    <section ref={container} className="h-screen bg-white text-zinc-950 flex flex-col justify-center items-center overflow-hidden relative">
      <div className="absolute top-12 text-xs font-bold tracking-widest text-zinc-400 uppercase">
        The Reality
      </div>
      
      <div ref={pinWrap} className="relative w-full max-w-4xl mx-auto text-center px-6 h-[400px] md:h-[480px]">
        <div className="problem-text absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.9] tracking-tighter mb-6" style={{ fontFamily: 'var(--font-bricolage)' }}>
            Your Customers Are Searching.<br />Will They Find You?
          </h2>
          <div className="flex flex-col gap-3 text-zinc-500 text-lg md:text-xl">
            <p>Your website doesn&apos;t represent your business.</p>
            <p>Your social media is inconsistent.</p>
            <p>Your business isn&apos;t visible enough on Google.</p>
          </div>
        </div>

        <div className="solution-1 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="text-sm font-bold uppercase tracking-widest text-[#0e8ab4] mb-4">Phase 1</div>
          <h2 className="text-[clamp(3rem,6vw,6rem)] font-medium leading-none tracking-tighter" style={{ fontFamily: 'var(--font-bricolage)' }}>
            Strategy
          </h2>
        </div>

        <div className="solution-2 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="text-sm font-bold uppercase tracking-widest text-[#0e8ab4] mb-4">Phase 2</div>
          <h2 className="text-[clamp(3rem,6vw,6rem)] font-medium leading-none tracking-tighter" style={{ fontFamily: 'var(--font-bricolage)' }}>
            Execution
          </h2>
        </div>

        <div className="solution-3 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="text-sm font-bold uppercase tracking-widest text-[#0e8ab4] mb-4">Phase 3</div>
          <h2 className="text-[clamp(3rem,6vw,6rem)] font-medium leading-none tracking-tighter" style={{ fontFamily: 'var(--font-bricolage)' }}>
            Measurement
          </h2>
        </div>

        <div className="solution-4 absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="text-sm font-bold uppercase tracking-widest text-[#0e8ab4] mb-4">The Result</div>
          <h2 className="text-[clamp(4rem,8vw,8rem)] font-medium leading-none tracking-tighter text-[#0e8ab4]" style={{ fontFamily: 'var(--font-bricolage)' }}>
            Growth.
          </h2>
        </div>
      </div>
    </section>
  );
}
