'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import {
  Globe, LayoutDashboard, Smartphone, Gauge, Search, ShieldCheck,
  PenTool, CalendarCheck, Users, BarChart2, Video,
  MapPin, Building2, FileSearch, Link as LinkIcon, Star,
  Monitor, Share2, TrendingUp, Target, FileBarChart, Tv,
} from 'lucide-react';
import { site } from '@/lib/content';

const iconMap: Record<string, React.ElementType> = {
  Globe, LayoutDashboard, Smartphone, Gauge, Search, ShieldCheck,
  PenTool, CalendarCheck, Users, BarChart2, Youtube: Video, Instagram: Tv,
  MapPin, Building2, FileSearch, Link: LinkIcon, Star,
  Monitor, Share2, TrendingUp, Target, FileBarChart,
};

interface Offering {
  icon: string;
  title: string;
  desc: string;
}

interface ServicePageClientProps {
  id: string;
  number: string;
  accent: string;
  accentBg: string;
  label: string;
  headline: string;
  subheadline: string;
  intro: string;
  offerings: Offering[];
  whyPoints: string[];
  imageSrc: string;
}

export default function ServicePageClient({
  id, number, accent, accentBg, label, headline, subheadline, intro, offerings, whyPoints, imageSrc,
}: ServicePageClientProps) {
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduce ? {} : {
      initial: { opacity: 0, y: 32 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 as const },
      transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    };

  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formLoading, setFormLoading] = React.useState(false);

  const scrollToConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('consultation-name') as HTMLInputElement | null;
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 500);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  React.useLayoutEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.documentElement.scrollLeft = 0;
      document.body.scrollTop = 0;
      document.body.scrollLeft = 0;
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.documentElement.scrollLeft = 0;
      document.body.scrollTop = 0;
      document.body.scrollLeft = 0;
    }
  }, []);

  return (
    <div className="bg-zinc-950 text-white min-h-[100dvh] w-full max-w-full overflow-x-hidden" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
      {/* Sticky mini navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" aria-label="Classic Goals Home">
            <img src="/logo.png" alt="Classic Goals" className="h-9 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="/#services"
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors hidden sm:inline-block"
            >
              All Services
            </a>
            <a
              href="#consultation"
              onClick={scrollToConsultation}
              className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-white hover:text-zinc-950 transition-colors"
            >
              Get Started <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden w-full max-w-full">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] max-w-[90vw] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-30"
          style={{ backgroundColor: accent }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Back link */}
          <motion.div {...fadeUp(0)}>
            <a
              href="/#services"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium mb-12 group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to Services
            </a>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <motion.div {...fadeUp(0.05)}>
                <div
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 border"
                  style={{ color: accent, backgroundColor: accentBg, borderColor: accent + '33' }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: accent }}
                  />
                  {label} · {number}
                </div>
              </motion.div>

              <motion.h1
                className="text-[clamp(2.8rem,5.5vw,5.5rem)] font-medium tracking-tighter leading-[1.0] mb-6"
                style={{ fontFamily: 'var(--font-bricolage)' }}
                {...fadeUp(0.1)}
              >
                {headline}
              </motion.h1>

              <motion.p
                className="text-zinc-400 text-xl leading-relaxed mb-10 max-w-xl"
                {...fadeUp(0.15)}
              >
                {subheadline}
              </motion.p>

              <motion.div className="flex flex-wrap gap-4 items-center" {...fadeUp(0.2)}>
                <a
                  href="#consultation"
                  onClick={scrollToConsultation}
                  className="inline-flex items-center gap-2 text-zinc-950 font-bold uppercase tracking-wide text-sm px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
                  style={{ backgroundColor: accent }}
                >
                  Get a Free Consultation <ArrowUpRight size={15} />
                </a>
                <a
                  href="/#services"
                  className="inline-flex items-center gap-2 border border-white/15 text-white font-bold uppercase tracking-wide text-sm px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  All Services
                </a>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div
              className="rounded-3xl overflow-hidden aspect-video lg:aspect-square relative"
              {...fadeUp(0.12)}
            >
              <img
                src={imageSrc}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-[900px] mx-auto">
          <motion.p
            className="text-zinc-300 text-xl md:text-2xl leading-relaxed"
            {...fadeUp(0)}
          >
            {intro}
          </motion.p>
        </div>
      </section>

      {/* OFFERINGS GRID */}
      <section className="py-16 pb-32 px-6 bg-zinc-900/40">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2
            className="text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tighter leading-none mb-16"
            style={{ fontFamily: 'var(--font-bricolage)' }}
            {...fadeUp(0)}
          >
            What We Deliver
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Globe;
              return (
                <motion.div
                  key={item.title}
                  className="bg-white/5 border border-white/8 p-8 rounded-3xl hover:bg-white/8 transition-colors"
                  initial={reduce ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduce ? {} : { y: -3, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: accentBg }}
                  >
                    <Icon size={22} style={{ color: accent }} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-xl font-medium tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-bricolage)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US STRIP */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tighter leading-[1.1] mb-4"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              Why Choose Classic Goals for {label}?
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              We are a Jaipur-based digital agency with a focused, specialist approach — not a generalist shop trying to do everything at once.
            </p>
          </motion.div>

          <motion.ul className="flex flex-col gap-5" {...fadeUp(0.1)}>
            {whyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-4">
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                  style={{ backgroundColor: accentBg }}
                >
                  <Check size={13} style={{ color: accent }} strokeWidth={2.5} />
                </div>
                <span className="text-zinc-300 text-base leading-relaxed">{point}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* DEDICATED CONSULTATION & CONTACT FORM */}
      <section id="consultation" className="py-24 px-6 border-t border-white/5 relative overflow-hidden bg-zinc-900/30">
        <div id="contact" className="absolute -top-24 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 20%, ${accent}, transparent 65%)` }}
        />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: accent, backgroundColor: accentBg, borderColor: accent + '33' }}
            >
              Get Free Consultation
            </div>
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium tracking-tighter leading-[1.05] mb-4"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              Ready to Accelerate Your {label}?
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Tell us about your business goals. We will analyze your requirements and share an actionable plan with transparent pricing.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-zinc-950/70 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-xl">
              {formSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: accentBg }}
                  >
                    <Check size={32} style={{ color: accent }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-bricolage)' }}>
                    Consultation Request Received!
                  </h3>
                  <p className="text-zinc-400 max-w-md mx-auto mb-8">
                    Thank you! Our {label} specialists in Jaipur will review your details and reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs uppercase tracking-widest font-bold text-zinc-400 hover:text-white underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="consultation-name" className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Full Name *
                      </label>
                      <input
                        id="consultation-name"
                        type="text"
                        required
                        placeholder="e.g. Sahil Sharma"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 97998 81247"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Business Name / Website
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. My Clinic / mybusiness.in"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@business.com"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Service Selected
                    </label>
                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm flex items-center justify-between text-zinc-300">
                      <span className="font-semibold text-white">{label}</span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md" style={{ backgroundColor: accentBg, color: accent }}>
                        {number}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      How can we help? (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your objectives, budget or timeline..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full mt-2 font-bold uppercase tracking-wide text-sm py-4 rounded-full text-zinc-950 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-xl"
                    style={{ backgroundColor: accent }}
                  >
                    {formLoading ? 'Submitting...' : 'Book Free Consultation'}
                    <ArrowUpRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Quick Contact Sidecar */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-bricolage)' }}>
                  Prefer Instant Contact?
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Have an urgent requirement or prefer a quick conversation with our founder? Reach out directly:
                </p>

                <div className="flex flex-col gap-4">
                  <a
                    href={`https://wa.me/91${site.phone}?text=Hi%20Classic%20Goals,%20I'm%20interested%20in%20a%20free%20consultation%20for%20${encodeURIComponent(label)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#00A651]/15 border border-[#00A651]/30 hover:bg-[#00A651]/25 transition-colors group"
                  >
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-[#00A651]">WhatsApp Direct</div>
                      <div className="text-white font-medium">+91 {site.phone}</div>
                    </div>
                    <ArrowUpRight size={18} className="text-[#00A651] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href={`tel:${site.phone}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-zinc-400">Direct Phone Call</div>
                      <div className="text-white font-medium">{site.phone}</div>
                    </div>
                    <ArrowUpRight size={18} className="text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-zinc-400">Email Address</div>
                      <div className="text-white font-medium text-sm">{site.email}</div>
                    </div>
                    <ArrowUpRight size={18} className="text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/40 text-xs text-zinc-400 flex items-center justify-between">
                <span>Looking for the homepage contact form?</span>
                <Link href="/#contact" className="text-white hover:underline font-semibold">
                  Visit Main Contact →
                </Link>
              </div>
            </div>
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

