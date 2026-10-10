'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { nav, site } from '@/lib/content';
import { ArrowUpRight, Menu, X, Phone, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 px-4 md:px-8 bg-zinc-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40'
            : 'py-5 px-6 md:px-8 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Classic Goals Home"
            onClick={handleLinkClick}
          >
            <img src="/logo.png" alt="Classic Goals" className="h-9 md:h-10 w-auto object-contain" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-300">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0DAACC] hover:after:w-full after:transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${site.phone}`}
              className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Phone size={13} className="text-[#0DAACC]" />
              <span>+91 {site.phone}</span>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white hover:text-zinc-950 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-all duration-200"
            >
              Get Started <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${site.phone}`}
              aria-label="Call Classic Goals"
              className="p-2 text-zinc-300 hover:text-white rounded-full bg-white/5 border border-white/10"
            >
              <Phone size={16} className="text-[#0DAACC]" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0DAACC]"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Menu Content */}
          <div className="relative z-10 w-full bg-zinc-950/95 border-b border-white/10 pt-24 pb-8 px-6 shadow-2xl flex flex-col min-h-screen justify-between overflow-y-auto">
            <div className="flex flex-col gap-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 pb-2 border-b border-white/10">
                Navigation
              </div>

              <div className="flex flex-col gap-4">
                {nav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="text-2xl font-medium text-white hover:text-[#0DAACC] transition-colors py-2 flex items-center justify-between"
                    style={{ fontFamily: 'var(--font-bricolage)' }}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={18} className="text-zinc-600" />
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                  Services
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    href="/services/website"
                    onClick={handleLinkClick}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Web Development
                  </Link>
                  <Link
                    href="/services/social-media"
                    onClick={handleLinkClick}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Social Media
                  </Link>
                  <Link
                    href="/services/seo"
                    onClick={handleLinkClick}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Google SEO & Maps
                  </Link>
                  <Link
                    href="/services/ads"
                    onClick={handleLinkClick}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Digital Ads
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-8 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full text-center bg-white text-zinc-950 font-bold uppercase tracking-wide py-3.5 rounded-xl hover:bg-zinc-200 transition-colors text-sm"
              >
                Get Started
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-3 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors"
                >
                  <Phone size={14} className="text-[#0DAACC]" /> Call Now
                </a>
                <a
                  href={`https://wa.me/91${site.phone}?text=Hi%20Classic%20Goals,%20I%20would%20like%20to%20enquire%20about%20your%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#00A651]/20 border border-[#00A651]/40 text-[#00A651] py-3 rounded-xl text-xs font-semibold hover:bg-[#00A651]/30 transition-colors"
                >
                  <MessageSquare size={14} /> WhatsApp
                </a>
              </div>
              <p className="text-[11px] text-zinc-500 text-center mt-2">
                Jaipur, Rajasthan · {site.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
