import { site, whyUs } from '@/lib/content';

export default function About() {
  return (
    <section id="about" className="py-32 bg-zinc-950 text-white border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#0DAACC] mb-6">About Classic Goals</div>
            <h2 className="text-[clamp(3rem,5vw,5rem)] font-medium tracking-tighter leading-[1.1] mb-8" style={{ fontFamily: 'var(--font-bricolage)' }}>
              Built Around One Goal:<br />Your Success.
            </h2>
            <p className="text-zinc-400 text-xl leading-relaxed max-w-lg mb-8">
              Classic Goals works across digital presence, websites, social media, advertising and local search visibility. We are a Jaipur-based digital agency focused on delivering strategic growth without the fluff.
            </p>
            <p className="text-[#0DAACC] text-xl font-medium" style={{ fontFamily: 'var(--font-bricolage)' }}>
              {site.tagline}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#0DAACC]/20 flex items-center justify-center mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#0DAACC]" />
                </div>
                <h4 className="text-xl font-medium tracking-tight mb-3" style={{ fontFamily: 'var(--font-bricolage)' }}>
                  {item.title}
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
