'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services, pricing } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const cards = gsap.utils.toArray('.service-panel') as HTMLElement[];
      
      cards.forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 15%',
            endTrigger: '.services-end',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
          }
        });
      });
    });

  }, { scope: container });

  return (
    <section ref={container} id="services" className="bg-zinc-100 text-zinc-950 py-24 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 mb-24 text-center">
        <h2 className="text-[clamp(3rem,6vw,6rem)] font-medium tracking-tighter leading-none" style={{ fontFamily: 'var(--font-bricolage)' }}>
          Everything You Need<br />to Grow Online.
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative pb-[20vh] services-end">
        {services.map((service, idx) => (
          <div key={service.id} className={`service-panel w-full bg-white rounded-3xl p-8 md:p-16 shadow-2xl shadow-black/5 mb-8 md:mb-0 border border-zinc-200 relative`} style={{ zIndex: idx, top: `${idx * 20}px` }}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-6">0{idx + 1}</div>
                <h3 className="text-[clamp(2.5rem,4vw,4rem)] font-medium tracking-tighter leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-bricolage)' }}>
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-lg md:text-xl mb-8 leading-relaxed">
                  {service.shortDesc}
                </p>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm font-medium text-zinc-700 mb-10">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="inline-flex bg-zinc-950 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-zinc-800 transition-colors" style={{ color: '#fff' }}>
                  {service.cta}
                </a>
              </div>
              
              {/* Visual Demo Side */}
              <div className="aspect-square md:aspect-auto md:h-full min-h-[400px] bg-zinc-50 rounded-2xl border border-zinc-100 p-8 flex flex-col justify-center relative overflow-hidden">
                {service.id === 'website' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-64 h-8 bg-zinc-200 rounded-full mb-4 animate-pulse" />
                    <div className="w-full max-w-[80%] h-48 bg-white shadow-xl rounded-xl border border-zinc-100 flex p-4 gap-4">
                      <div className="w-1/3 bg-zinc-100 rounded-lg" />
                      <div className="w-2/3 flex flex-col gap-2">
                         <div className="w-full h-4 bg-zinc-100 rounded-sm" />
                         <div className="w-3/4 h-4 bg-zinc-100 rounded-sm" />
                         <div className="w-1/2 h-4 bg-indigo-100 rounded-sm mt-auto" />
                      </div>
                    </div>
                  </div>
                )}
                {service.id === 'social' && (
                  <div className="absolute inset-0 flex items-center justify-center gap-4">
                    <div className="w-32 h-48 bg-white shadow-lg rounded-xl border border-zinc-100 p-2 transform -rotate-6">
                       <div className="w-full h-24 bg-zinc-100 rounded-lg mb-2" />
                       <div className="w-3/4 h-2 bg-zinc-200 rounded-sm mb-1" />
                       <div className="w-1/2 h-2 bg-zinc-200 rounded-sm" />
                    </div>
                    <div className="w-32 h-56 bg-white shadow-xl rounded-xl border border-zinc-100 p-2 z-10">
                       <div className="w-full h-32 bg-indigo-500/10 rounded-lg mb-2 flex items-center justify-center">
                         <div className="w-8 h-8 rounded-full bg-indigo-500/20" />
                       </div>
                       <div className="w-3/4 h-2 bg-zinc-200 rounded-sm mb-1" />
                       <div className="w-full h-2 bg-zinc-100 rounded-sm" />
                    </div>
                  </div>
                )}
                {service.id === 'gmb' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-full max-w-[80%] bg-white shadow-xl rounded-xl border border-zinc-100 p-4">
                      <div className="flex gap-4 items-center mb-4 border-b border-zinc-100 pb-4">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-full" />
                        <div>
                          <div className="w-32 h-4 bg-zinc-800 rounded-sm mb-2" />
                          <div className="w-24 h-3 bg-zinc-200 rounded-sm" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-8 bg-zinc-100 rounded-full" />
                        <div className="flex-1 h-8 bg-indigo-500/10 text-indigo-600 flex items-center justify-center rounded-full text-[10px] font-bold">DIRECTIONS</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
