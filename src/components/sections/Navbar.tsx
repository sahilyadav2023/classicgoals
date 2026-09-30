'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { nav, site } from '@/lib/content';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference text-white">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="Classic Goals" className="h-10 w-auto object-contain brightness-0 invert" />
        </div>
        <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest">
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="hover:opacity-60 transition-opacity">
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <a href="#contact" className="hidden md:flex items-center gap-2 border border-white/20 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
