'use client';
import { useState } from 'react';
import { pricing } from '@/lib/content';

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'quarterly' | 'halfYearly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-32 bg-zinc-50 text-zinc-950">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-[clamp(3rem,6vw,6rem)] font-medium tracking-tighter leading-none mb-6 text-center" style={{ fontFamily: 'var(--font-bricolage)' }}>
          Fair Pricing.<br />Clear Value.
        </h2>
        <p className="text-center text-zinc-500 mb-16 max-w-xl mx-auto">
          We don&apos;t believe in hidden costs. Choose a foundation or a growth plan that fits your current business scale. All prices are exclusive of +18% GST.
        </p>
        
        {/* Billing Toggle for recurring plans */}
        <div className="flex justify-center mb-16 px-2">
          <div className="bg-zinc-200/60 p-1 rounded-full inline-flex max-w-full overflow-x-auto scrollbar-none shadow-inner border border-zinc-200">
            {['monthly', 'quarterly', 'halfYearly', 'yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setBilling(period as any)}
                className={`px-3.5 sm:px-6 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest whitespace-nowrap transition-all ${
                  billing === period
                    ? 'bg-zinc-950 text-white shadow-md'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {period === 'halfYearly' ? 'Half-Yearly' : period.replace('Yearly', ' Yearly')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Website Development */}
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-black/5 border border-zinc-100 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-widest text-[#0e8ab4] mb-4">Website Development</div>
            <h3 className="text-4xl font-medium tracking-tight mb-8" style={{ fontFamily: 'var(--font-bricolage)' }}>One-Time</h3>
            <ul className="flex flex-col gap-4 text-zinc-600 mb-12 flex-1">
              <li className="flex justify-between items-end border-b border-zinc-100 pb-2">
                <span>Static Website</span>
                <strong className="text-zinc-950 text-xl font-medium">₹{pricing.website.static}</strong>
              </li>
              <li className="flex justify-between items-end border-b border-zinc-100 pb-2">
                <span>Dynamic Website</span>
                <strong className="text-zinc-950 text-xl font-medium">₹{pricing.website.dynamic}</strong>
              </li>
              <li className="flex justify-between items-end border-b border-zinc-100 pb-2">
                <span>Additional Page</span>
                <strong className="text-zinc-950 text-xl font-medium">₹{pricing.website.page}</strong>
              </li>
            </ul>
            <a href="#contact" className="w-full text-center bg-zinc-950 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors" style={{ color: '#fff' }}>
              Get Started
            </a>
          </div>

          {/* Social Media & Ads */}
          <div className="bg-zinc-950 p-10 rounded-3xl shadow-xl shadow-black/10 border border-zinc-800 flex flex-col text-white transform md:-translate-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#0DAACC] mb-4">Social Media & Ads</div>
            <h3 className="text-5xl font-medium tracking-tight mb-8" style={{ fontFamily: 'var(--font-bricolage)' }}>
              ₹{pricing.social[billing]}
              <span className="text-base text-zinc-500 font-sans tracking-normal ml-2">/{billing.replace('Yearly', ' yr').replace('monthly', 'mo').replace('quarterly', 'qtr')}</span>
            </h3>
            <ul className="flex flex-col gap-4 text-zinc-300 mb-12 flex-1">
              {pricing.social.includes.map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0DAACC]" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="w-full text-center bg-white text-zinc-950 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors" style={{ color: '#09090b' }}>
              Get Started
            </a>
          </div>

          {/* Google Business / Local SEO */}
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-black/5 border border-zinc-100 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-widest text-[#0e8ab4] mb-4">Google Business / Local SEO</div>
            <h3 className="text-4xl font-medium tracking-tight mb-8" style={{ fontFamily: 'var(--font-bricolage)' }}>Recurring</h3>
            <ul className="flex flex-col gap-4 text-zinc-600 mb-12 flex-1">
              <li className="flex justify-between items-end border-b border-zinc-100 pb-2">
                <span className="max-w-[120px] text-sm">Local Area<br/><span className="text-xs text-zinc-400">One Category</span></span>
                <strong className="text-zinc-950 text-xl font-medium text-right">₹{pricing.gmb.local[billing]}<br/><span className="text-[10px] text-zinc-400 font-normal uppercase tracking-widest">/{billing}</span></strong>
              </li>
              <li className="flex justify-between items-end border-b border-zinc-100 pb-2">
                <span className="max-w-[120px] text-sm">City-wide<br/><span className="text-xs text-zinc-400">One Category</span></span>
                <strong className="text-zinc-950 text-xl font-medium text-right">₹{pricing.gmb.city[billing]}<br/><span className="text-[10px] text-zinc-400 font-normal uppercase tracking-widest">/{billing}</span></strong>
              </li>
            </ul>
            <a href="#contact" className="w-full text-center border border-zinc-200 text-zinc-950 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-50 transition-colors" style={{ color: '#09090b' }}>
              Get Started
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
