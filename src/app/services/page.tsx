import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Globe, Share2, Search, Target, CheckCircle2, Phone, Mail } from 'lucide-react';
import { site, services } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Our Services — Classic Goals Pvt Limited | Jaipur Digital Agency',
  description: 'Explore our 4 core digital services in Jaipur: Website Development, Social Media Management, SEO & Google Business Profile, and Digital Advertising.',
};

const serviceMeta: Record<string, { accent: string; accentBg: string; border: string; badge: string }> = {
  website: { accent: '#1565C0', accentBg: 'rgba(21,101,192,0.08)', border: 'rgba(21,101,192,0.25)', badge: '01 · WEB' },
  social:  { accent: '#00A651', accentBg: 'rgba(0,166,81,0.08)',  border: 'rgba(0,166,81,0.25)',  badge: '02 · SOCIAL' },
  seo:     { accent: '#0DAACC', accentBg: 'rgba(13,170,204,0.08)', border: 'rgba(13,170,204,0.25)', badge: '03 · GOOGLE BUSINESS & SEO' },
  ads:     { accent: '#F04E23', accentBg: 'rgba(240,78,35,0.08)', border: 'rgba(240,78,35,0.25)', badge: '04 · ADS' },
};

const serviceIcons: Record<string, React.ElementType> = {
  website: Globe,
  social: Share2,
  seo: Search,
  ads: Target,
};

export default function ServicesHubPage() {
  return (
    <div className="bg-zinc-950 text-white min-h-[100dvh] w-full max-w-full overflow-x-hidden" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
      {/* Mini top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" aria-label="Classic Goals Home">
            <img src="/logo.png" alt="Classic Goals" className="h-9 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/#services"
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors hidden sm:inline-block"
            >
              Services Overview
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-white hover:text-zinc-950 transition-colors"
            >
              Get Started <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#1565C0]/20 via-[#00A651]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium mb-10 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/10 bg-white/5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#00A651] animate-pulse" />
              Comprehensive Digital Growth
            </div>

            <h1
              className="text-[clamp(2.8rem,5.5vw,5.5rem)] font-medium tracking-tighter leading-[1.0] mb-6"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              Everything You Need to Grow Online.
            </h1>

            <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mb-8">
              Four specialized pillars built for performance and measurable return. Explore each dedicated service page below.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 pb-32 px-6">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-8">
          {services.map((srv) => {
            const meta = serviceMeta[srv.id] || serviceMeta.website;
            const Icon = serviceIcons[srv.id] || Globe;

            return (
              <div
                key={srv.id}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 hover:border-white/20 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: meta.accent }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border"
                      style={{ color: meta.accent, backgroundColor: meta.accentBg, borderColor: meta.border }}
                    >
                      {meta.badge}
                    </span>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: meta.accentBg }}
                    >
                      <Icon size={22} style={{ color: meta.accent }} strokeWidth={1.7} />
                    </div>
                  </div>

                  <h2
                    className="text-3xl md:text-4xl font-medium tracking-tight mb-4 group-hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-bricolage)' }}
                  >
                    {srv.title}
                  </h2>

                  <p className="text-zinc-400 text-base leading-relaxed mb-8">
                    {srv.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {srv.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={srv.href}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide px-6 py-3.5 rounded-full transition-transform hover:scale-105"
                    style={{ backgroundColor: meta.accent, color: '#09090b' }}
                  >
                    {srv.cta} <ArrowUpRight size={15} />
                  </Link>

                  <Link
                    href="/#contact"
                    className="text-xs text-zinc-500 hover:text-white uppercase tracking-wider font-semibold transition-colors"
                  >
                    Quick Enquiry →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Consultation CTA */}
      <section className="py-24 px-6 border-t border-white/5 bg-zinc-900/30">
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-medium tracking-tighter leading-none mb-6"
            style={{ fontFamily: 'var(--font-bricolage)' }}
          >
            Need Guidance Choosing?
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Speak directly with our team in Jaipur. We will audit your current status and recommend the right path forward.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="bg-white text-zinc-950 font-bold uppercase tracking-wide text-sm px-9 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Get Free Consultation <ArrowUpRight size={15} className="inline ml-1" />
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="border border-white/20 text-white font-bold uppercase tracking-wide text-sm px-8 py-4 rounded-full hover:bg-white/5 transition-colors"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Mini footer */}
      <footer className="px-6 py-8 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-sm">
          <div>© {new Date().getFullYear()} Classic Goals Pvt Limited. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/services/website" className="hover:text-white transition-colors">Website</Link>
            <Link href="/services/social-media" className="hover:text-white transition-colors">Social Media</Link>
            <Link href="/services/seo" className="hover:text-white transition-colors">SEO</Link>
            <Link href="/services/ads" className="hover:text-white transition-colors">Ads</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
