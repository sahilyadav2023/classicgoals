import type { Metadata } from "next";
import ServicePageClient from "@/components/ServicePageClient";

export const metadata: Metadata = {
  title: "Website Development — Classic Goals Pvt Limited",
  description: "Modern, responsive static and dynamic websites for businesses in Jaipur. Built to establish your brand and convert visitors into enquiries.",
};

export default function WebsitePage() {
  return (
    <ServicePageClient
      id="website"
      number="01"
      accent="#1565C0"
      accentBg="rgba(21,101,192,0.08)"
      label="Website Development"
      headline="Websites Built to Work as Hard as You Do."
      subheadline="From a clean static presence to a fully dynamic platform — we build sites that load fast, look great and convert visitors into customers."
      intro="Your website is your most important digital asset. We design and develop websites that are visually sharp, mobile-first and engineered for performance. Whether you need a professional static site or a feature-rich dynamic web application, we handle everything — design, development and launch."
      offerings={[
        {
          icon: "Globe",
          title: "Static Websites",
          desc: "Fast, secure, low-maintenance sites ideal for professionals, small businesses and portfolio showcases. Built with modern frameworks and optimized for speed.",
        },
        {
          icon: "LayoutDashboard",
          title: "Dynamic Websites",
          desc: "Database-driven platforms with content management, user accounts, forms and advanced functionality — built for businesses that need flexibility.",
        },
        {
          icon: "Smartphone",
          title: "Responsive Design",
          desc: "Every site we build adapts flawlessly across all devices — desktop, tablet and mobile. No pinching, no horizontal scroll.",
        },
        {
          icon: "Gauge",
          title: "Performance Optimized",
          desc: "Fast load times, optimized assets and clean code that keeps bounce rates low and search engines happy.",
        },
        {
          icon: "Search",
          title: "SEO Ready",
          desc: "Built-in SEO structure: proper headings, meta tags, schema markup and sitemap — so your site can be found from day one.",
        },
        {
          icon: "ShieldCheck",
          title: "Secure & Reliable",
          desc: "HTTPS by default, regular updates, and secure coding practices to protect your business and your visitors.",
        },
      ]}
      whyPoints={[
        "Clean, modern design with your brand identity baked in",
        "Mobile-first development — looks perfect on every screen",
        "Delivered on time, within budget",
        "Ongoing support post-launch",
        "Static from ₹15,000 · Dynamic from ₹25,000 + GST",
      ]}
      imageSrc="/images/service-website.jpg"
    />
  );
}
