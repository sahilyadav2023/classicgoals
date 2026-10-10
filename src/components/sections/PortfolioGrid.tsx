'use client';
import { portfolio } from '@/lib/content';

export default function PortfolioGrid() {
  return (
    <section id="work" className="py-32 bg-zinc-950 text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <h2 className="text-[clamp(3rem,6vw,6rem)] font-medium tracking-tighter leading-none" style={{ fontFamily: 'var(--font-bricolage)' }}>
            Work That Speaks<br />for Itself.
          </h2>
          <p className="text-zinc-500 max-w-sm text-lg">
            A selection of digital foundations, local wins, and systems built to keep working.
          </p>
        </div>
        
        {/* Typographic List instead of Empty Image Cards */}
        <div className="border-t border-white/10">
          {portfolio.map((item, i) => (
            <div key={i} className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer px-4 -mx-4 rounded-xl">
              
              {/* Left side: Client and Industry */}
              <div className="flex flex-col gap-2 md:w-1/3 mb-6 md:mb-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-[#0DAACC] flex items-center gap-3">
                  0{i + 1}
                  <span className="w-8 h-px bg-[#0DAACC]/30" />
                  {item.industry}
                </div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tighter text-white group-hover:text-[#5DD8EE] transition-colors" style={{ fontFamily: 'var(--font-bricolage)' }}>
                  {item.client}
                </h3>
              </div>

              {/* Middle: Description */}
              <div className="md:w-1/3 pr-8 mb-6 md:mb-0">
                <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {item.desc}
                </p>
              </div>

              {/* Right: Service Tag */}
              <div className="flex items-center justify-between md:justify-end gap-8 md:w-1/4">
                <div className="text-xs font-semibold uppercase tracking-widest text-zinc-300 border border-zinc-700 bg-zinc-900 rounded-full px-4 py-2">
                  {item.service}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
