'use client';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import TrustGrid from '@/components/sections/TrustGrid';
import ProblemSolutionPin from '@/components/sections/ProblemSolutionPin';
import Services from '@/components/sections/Services';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import About from '@/components/sections/About';
import Pricing from '@/components/sections/Pricing';
import ContactForm from '@/components/ContactForm';
import { testimonials, faqs, site } from '@/lib/content';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="bg-zinc-950">
        <Hero />
        <TrustGrid />
        <About />
        <ProblemSolutionPin />
        <Services />
        <ProcessTimeline />
        <PortfolioGrid />
        <Pricing />

        {/* Testimonials (Added as requested: Dummy realistic testimonials) */}
        <section className="py-32 bg-zinc-50 text-zinc-950">
          <div className="max-w-[1400px] mx-auto px-6">
             <h2 className="text-[clamp(3rem,5vw,5rem)] font-medium tracking-tighter leading-none mb-16 text-center" style={{ fontFamily: 'var(--font-bricolage)' }}>
                Client Feedback.
             </h2>
             <div className="grid md:grid-cols-3 gap-8">
               {testimonials.map((test, i) => (
                 <div key={i} className="bg-white p-10 rounded-3xl shadow-xl shadow-black/5 border border-zinc-100">
                    <div className="text-4xl text-[#0DAACC]/40 mb-6 font-serif">"</div>
                    <p className="text-zinc-600 text-lg leading-relaxed mb-8">{test.text}</p>
                    <div>
                      <div className="font-bold tracking-tight">{test.author}</div>
                      <div className="text-sm text-zinc-500">{test.role}</div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white text-zinc-950 border-t border-zinc-100">
          <div className="max-w-[800px] mx-auto px-6">
            <h2 className="text-[clamp(3rem,5vw,5rem)] font-medium tracking-tighter leading-none mb-16 text-center" style={{ fontFamily: 'var(--font-bricolage)' }}>
                Questions?
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-zinc-50 rounded-2xl border border-zinc-100 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-lg">
                    {faq.q}
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-zinc-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-zinc-950 text-white relative overflow-hidden">
          {/* subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1565C0]/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-[clamp(4rem,7vw,7rem)] font-medium tracking-tighter leading-none mb-6" style={{ fontFamily: 'var(--font-bricolage)' }}>
                Let&apos;s Build Something<br />That Grows.
              </h2>
              <p className="text-zinc-400 text-xl max-w-md mb-12">
                Tell us about your business and what you want to achieve online.
              </p>
              
              <div className="flex flex-col gap-6">
                <a href={`tel:${site.phone}`} className="text-3xl font-medium tracking-tight hover:text-[#0DAACC] transition-colors">
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="text-xl text-zinc-400 hover:text-white transition-colors">
                  {site.email}
                </a>
                <p className="text-zinc-500 mt-8 max-w-xs leading-relaxed">
                  {site.address}
                </p>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-xl">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-zinc-950 text-white border-t border-white/10 pt-24 pb-12">
          <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-4 gap-12 mb-24">
            <div className="md:col-span-2">
              <div className="font-bold text-2xl tracking-tight leading-tight uppercase mb-6" style={{ fontFamily: 'var(--font-bricolage)' }}>
                CLASSIC GOALS<br />PVT LIMITED
              </div>
              <p className="text-zinc-500 max-w-sm">
                {site.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs text-zinc-500 mb-6">Company</h4>
              <ul className="flex flex-col gap-4 text-zinc-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs text-zinc-500 mb-6">Services</h4>
              <ul className="flex flex-col gap-4 text-zinc-400">
                <li><a href="/services/website" className="hover:text-white transition-colors">Website Development</a></li>
                <li><a href="/services/social-media" className="hover:text-white transition-colors">Social Media</a></li>
                <li><a href="/services/seo" className="hover:text-white transition-colors">SEO</a></li>
                <li><a href="/services/ads" className="hover:text-white transition-colors">Digital Advertising</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-sm">
            <div>© {new Date().getFullYear()} Classic Goals Pvt Limited. All rights reserved.</div>
            <div>Jaipur, Rajasthan</div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
