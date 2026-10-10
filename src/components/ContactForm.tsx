'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, MessageSquare, Phone, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/content';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Website Development',
    business: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Phone, Email, Message).');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          budget: formData.business ? `Business: ${formData.business}` : undefined,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Could not send enquiry right now. Please reach us directly via WhatsApp or phone call.');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-10 px-4 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#00A651]/20 text-[#00A651] flex items-center justify-center mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-3xl font-medium tracking-tight text-white mb-3" style={{ fontFamily: 'var(--font-bricolage)' }}>
          Enquiry Received!
        </h3>
        <p className="text-zinc-400 text-base max-w-sm mb-8 leading-relaxed">
          Thank you for reaching out. A Classic Goals digital strategist will review your requirements and get in touch within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <a
            href={`https://wa.me/91${site.phone}?text=Hi%20Classic%20Goals,%20I%20just%20submitted%20an%20enquiry%20from%20your%20website`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#00A651] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[#008f45] transition-colors"
          >
            <MessageSquare size={14} /> Quick WhatsApp
          </a>
          <button
            onClick={() => {
              setFormData({
                name: '',
                phone: '',
                email: '',
                service: 'Website Development',
                business: '',
                message: '',
              });
              setStatus('idle');
            }}
            className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-white/20 transition-colors"
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <p>{errorMessage}</p>
            <div className="mt-2 flex gap-3 text-xs">
              <a
                href={`tel:${site.phone}`}
                className="underline hover:text-white flex items-center gap-1 font-semibold"
              >
                <Phone size={12} /> Call: {site.phone}
              </a>
              <a
                href={`https://wa.me/91${site.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white flex items-center gap-1 font-semibold"
              >
                <MessageSquare size={12} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Your Name <span className="text-[#0DAACC]">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Sahil Sharma"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#0DAACC] focus:ring-1 focus:ring-[#0DAACC] transition-all text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Phone Number <span className="text-[#0DAACC]">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#0DAACC] focus:ring-1 focus:ring-[#0DAACC] transition-all text-sm"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Email Address <span className="text-[#0DAACC]">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. hello@yourbrand.com"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#0DAACC] focus:ring-1 focus:ring-[#0DAACC] transition-all text-sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-business" className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Business / Brand
          </label>
          <input
            id="contact-business"
            name="business"
            type="text"
            value={formData.business}
            onChange={handleChange}
            placeholder="e.g. Royal Jewels Jaipur"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#0DAACC] focus:ring-1 focus:ring-[#0DAACC] transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-service" className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          Service Required
        </label>
        <select
          id="contact-service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#0DAACC] focus:ring-1 focus:ring-[#0DAACC] transition-all text-sm appearance-none cursor-pointer"
        >
          <option value="Website Development">Website Development (Static / Dynamic)</option>
          <option value="Social Media & Ads">Social Media Marketing & Paid Ads</option>
          <option value="Google Business / Local SEO">Google Business Profile & Local SEO</option>
          <option value="Complete Digital Package">Complete Growth Package (All Services)</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          Project Details <span className="text-[#0DAACC]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={3}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your business, current challenges, and goals..."
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-[#0DAACC] focus:ring-1 focus:ring-[#0DAACC] transition-all resize-none text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-white text-zinc-950 font-bold uppercase tracking-widest text-xs py-4 rounded-xl mt-2 hover:bg-zinc-200 transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-white/10"
        style={{ color: '#09090b' }}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin text-zinc-900" />
            <span>Sending Enquiry...</span>
          </>
        ) : (
          <>
            <span>Send Enquiry</span>
            <ArrowUpRight size={15} />
          </>
        )}
      </button>

      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-white/5">
        <span>🔒 Confidential & direct to team</span>
        <a
          href={`https://wa.me/91${site.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#00A651] transition-colors flex items-center gap-1 text-[#00A651]"
        >
          <MessageSquare size={12} /> Instant WhatsApp
        </a>
      </div>
    </form>
  );
}
