# Classic Goals — Official Website

Premium agency site for **Classic Goals**, a digital marketing agency in Jaipur, Rajasthan.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS design system
- **Animation**: GSAP + ScrollTrigger, Framer Motion, Lenis smooth scroll
- **Fonts**: Syne (display) + DM Sans (body) via Google Fonts
- **Email**: Resend
- **Deployment**: Vercel

---

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in your RESEND_API_KEY in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `RESEND_API_KEY` | Resend API key for contact form emails | Yes (for emails) |
| `CONTACT_TO_EMAIL` | Email to receive enquiries | No (defaults to `theclassicgoals00@gmail.com`) |
| `NEXT_PUBLIC_SITE_URL` | Production URL (no trailing slash) | Yes for SEO |

Get a free Resend key at [resend.com](https://resend.com).

---

## How to Edit Content

**All copy, prices, and client data live in a single file:**

```
src/lib/content.ts
```

### Update prices

```ts
// GMB SEO pricing
export const GMB_PRICING = {
  plans: [
    {
      name: "Local Area",
      prices: {
        Monthly: 7000,   // ← change these numbers
        Quarterly: 15000,
        "Half-yearly": 25000,
        Yearly: 40000,
      },
    },
    // ...
  ],
};
```

### Add/update client portfolio URLs

```ts
export const WEB_PORTFOLIO = {
  static: [
    {
      name: "Jaipur Tour by Car and Driver",
      url: "https://yoururl.com", // ← replace [PLACEHOLDER] with real URL
      category: "Tourism",
    },
    // ...
  ],
};
```

### Add testimonials

```ts
export const TESTIMONIALS = [
  {
    name: "Reviewer Name",
    role: "Business Name",
    rating: 5,
    text: "Real review text from Google.",
  },
  // ...
];
```

### Update business hours

```ts
export const COMPANY = {
  // ...
  businessHours: "Mon–Sat, 9 AM – 6 PM", // ← update here
};
```

### Search for all placeholders

```bash
grep -r "\[PLACEHOLDER" src/
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   ├── sitemap.ts          # Auto-generated sitemap.xml
│   ├── robots.ts           # robots.txt
│   ├── services/
│   │   ├── page.tsx        # Services overview
│   │   ├── web/page.tsx    # Website Development
│   │   ├── gmb-seo/page.tsx # GMB SEO
│   │   └── smo-ads/page.tsx # SMO & Ads
│   ├── work/page.tsx       # Portfolio
│   ├── pricing/page.tsx    # Pricing (all services)
│   ├── about/page.tsx      # About
│   ├── contact/page.tsx    # Contact
│   └── api/contact/route.ts # Contact form API (Resend)
├── components/
│   ├── sections/           # Full-page sections (Hero, About, etc.)
│   └── ui/                 # Reusable UI components
└── lib/
    ├── content.ts          # ← ALL COPY AND PRICES HERE
    └── utils.ts            # cn(), formatINR(), animation presets
```

---

## Adding the Real Logo

Replace the SVG logo mark in:
- `src/components/Navbar.tsx` — `<LogoMark />` function
- `src/components/sections/FooterSection.tsx` — `<LogoMark />` function
- `src/components/Preloader.tsx` — the preloader logo text

Drop your SVG into `public/logo.svg` and use `<img src="/logo.svg" alt="Classic Goals" />` or an inline SVG.

---

## Deployment on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### After deploying

1. Set `NEXT_PUBLIC_SITE_URL` to your live domain (e.g. `https://classicgoals.in`)
2. Update DNS to point to Vercel
3. Validate your sitemap at `https://classicgoals.in/sitemap.xml`
4. Add the site to Google Search Console
5. Test JSON-LD at [schema.org/SchemaApp](https://validator.schema.org/)

---

## QA Checklist

- [ ] `npm run build` — zero errors
- [ ] `npm run lint` — zero warnings
- [ ] Lighthouse mobile score 90+ (LCP < 2.5s, CLS ≈ 0)
- [ ] Test `prefers-reduced-motion` in Chrome DevTools → animations replaced by fades
- [ ] Test at 360px, 768px, 1280px, 1920px
- [ ] Contact form → email received at configured address
- [ ] WhatsApp button opens correct number
- [ ] Keyboard navigation through all interactive elements
- [ ] JSON-LD validated at schema.org
- [ ] sitemap.xml and robots.txt accessible
- [ ] All `[PLACEHOLDER]` tokens replaced with real data

---

## Assets Still Needed

| Asset | Status | Where to use |
|---|---|---|
| Logo SVG/PNG | ⏳ Pending | `public/logo.svg` |
| Client site URLs (12 sites) | ⏳ Pending | `content.ts → WEB_PORTFOLIO` |
| GMB ranking screenshots | ⏳ Pending | `public/rankings/` |
| Real Google reviews | ⏳ Pending | `content.ts → TESTIMONIALS` |
| Business hours | ⏳ Pending | `content.ts → COMPANY.businessHours` |
| Resend API key | ⏳ Pending | `.env.local` |
| Confirm 3,500+ calls / 8,000+ directions stat | ⏳ Pending | `content.ts → RESULTS` |
