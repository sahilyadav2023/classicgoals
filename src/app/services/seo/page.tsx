import type { Metadata } from "next";
import ServicePageClient from "@/components/ServicePageClient";

export const metadata: Metadata = {
  title: "SEO & Google Business — Classic Goals Pvt Limited",
  description: "Local and citywide SEO for businesses in Jaipur. Google Business Profile optimization, keyword strategy and Google Maps ranking.",
};

export default function SeoPage() {
  return (
    <ServicePageClient
      id="seo"
      number="03"
      accent="#0DAACC"
      accentBg="rgba(13,170,204,0.08)"
      label="Google Business and SEO"
      headline="Get Found by Customers Who Are Already Searching."
      subheadline="Local area SEO or citywide dominance — we put your business at the top of Google Maps and search results where it counts."
      intro="When someone searches for your service in Jaipur, they should find you first. We optimize your Google Business Profile, build your local authority through citation building, and apply keyword strategies that move you up in local and citywide search rankings — generating more calls, direction requests and walk-ins."
      offerings={[
        {
          icon: "MapPin",
          title: "Google Business Profile",
          desc: "Complete GBP setup and ongoing optimization — categories, photos, posts, Q&A and attributes — so your profile works as a second website.",
        },
        {
          icon: "Search",
          title: "Local SEO",
          desc: "Local-area ranking strategy targeting customers in your neighbourhood — ideal for clinics, shops and service providers.",
        },
        {
          icon: "Building2",
          title: "Citywide SEO",
          desc: "Broader keyword targeting to dominate search results across Jaipur and surrounding areas, not just your immediate locality.",
        },
        {
          icon: "FileSearch",
          title: "Keyword Research",
          desc: "In-depth analysis of the terms your ideal customers are actually typing into Google — then we build your strategy around them.",
        },
        {
          icon: "Link",
          title: "Citation Building",
          desc: "Consistent business name, address and phone across directories and platforms — a key local ranking signal.",
        },
        {
          icon: "Star",
          title: "Review Management",
          desc: "Strategy for generating more genuine reviews, responding professionally and building your reputation score.",
        },
      ]}
      whyPoints={[
        "Proven results: 1,360+ calls for Heart & General Hospital in 4 months",
        "Local area plans from ₹7,000/month, citywide from ₹16,000/month",
        "Monthly performance reports with calls, direction requests and visibility data",
        "No black-hat tactics — only sustainable, Google-compliant methods",
        "Real rankings tracked, not vanity metrics",
      ]}
      imageSrc="/images/service-gmb.jpg"
    />
  );
}
