'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';
import { services } from '@/lib/content';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const serviceAccents: Record<string, { label: string; bg: string; hex: string }> = {
  website: { hex: '#1565C0', label: 'text-[#1565C0]', bg: 'bg-[#1565C0]/10' },
  social:  { hex: '#00A651', label: 'text-[#00A651]', bg: 'bg-[#00A651]/10' },
  seo:     { hex: '#0DAACC', label: 'text-[#0DAACC]', bg: 'bg-[#0DAACC]/10' },
  ads:     { hex: '#F04E23', label: 'text-[#F04E23]', bg: 'bg-[#F04E23]/10' },
};

const serviceImages: Record<string, string> = {
  website: '/images/service-website.jpg',
  social:  '/images/service-social.jpg',
  seo:     '/images/service-gmb.jpg',
  ads:     '/images/service-website.jpg',
};

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(() => {
    if (reduce) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-stack-card');

      cards.forEach((card, i) => {
        // Pin each card until the sentinel (.services-end) bottom leaves the viewport
        ScrollTrigger.create({
          trigger: card,
          start: 'top 15%',
          endTrigger: '.services-end',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });
      });
    });

    return () => mm.revert();
  }, { scope: container, dependencies: [reduce] });

  return (
    <section ref={container} id="services" className="bg-zinc-100 text-zinc-950 relative z-20">
      {/* Section header */}
      <motion.div
        className="max-w-[1400px] mx-auto px-6 pt-24 pb-16 text-center"
        initial={reduce ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="text-[clamp(3rem,6vw,6rem)] font-medium tracking-tighter leading-none"
          style={{ fontFamily: 'var(--font-bricolage)' }}
        >
          Everything You Need<br />to Grow Online.
        </h2>
        <p className="text-zinc-500 text-xl mt-6 max-w-xl mx-auto leading-relaxed">
          Four focused service areas. One agency. Your goals, our playbook.
        </p>
      </motion.div>

      {/* Stack container — cards pin via GSAP; .services-end is the unpin sentinel */}
      <div className="max-w-[1000px] mx-auto px-6 pb-16 md:pb-[30vh] services-end">
        {services.map((service, idx) => {
          const accent = serviceAccents[service.id] ?? serviceAccents.website;
          return (
            <div
              key={service.id}
              className="service-stack-card w-full bg-white rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-zinc-200 mb-6 md:mb-0 will-change-transform md:sticky md:top-28"
              style={{ zIndex: idx + 1 }}
            >
              <div className="grid md:grid-cols-2 min-h-[440px]">
                {/* Left: content */}
                <div className="flex flex-col justify-between p-8 md:p-12">
                  <div>
                    {/* Number + label */}
                    <div className="flex items-center gap-3 mb-8">
                      <div
                        className={`w-9 h-9 rounded-full ${accent.bg} flex items-center justify-center`}
                      >
                        <span className={`text-xs font-bold ${accent.label}`}>0{idx + 1}</span>
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-widest ${accent.label}`}>
                        {service.id === 'website' ? 'Web' : service.id === 'social' ? 'Social' : service.id === 'seo' ? 'Google Business & SEO' : 'Ads'}
                      </span>
                    </div>

                    <h3
                      className="text-[clamp(2rem,3.5vw,3.2rem)] font-medium tracking-tighter leading-[1.05] mb-5"
                      style={{ fontFamily: 'var(--font-bricolage)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-base md:text-lg leading-relaxed mb-8">
                      {service.shortDesc}
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mb-10">
                      {service.features.slice(0, 4).map(feat => (
                        <span
                          key={feat}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${accent.bg} ${accent.label}`}
                        >
                          {feat}
                        </span>
                      ))}
                      {service.features.length > 4 && (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-500">
                          +{service.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={service.href}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                      }
                    }}
                    className="inline-flex self-start items-center gap-2 bg-zinc-950 text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-zinc-800 transition-colors group/btn"
                  >
                    {service.cta}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </Link>
                </div>

                {/* Right: image */}
                <div className="relative overflow-hidden min-h-[260px] md:min-h-0 rounded-b-3xl md:rounded-b-none md:rounded-r-3xl">
                  <img
                    src={serviceImages[service.id]}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Subtle accent tint */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ background: `linear-gradient(135deg, ${accent.hex}80, transparent)` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
