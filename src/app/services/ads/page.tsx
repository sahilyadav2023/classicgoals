import type { Metadata } from "next";
import ServicePageClient from "@/components/ServicePageClient";

export const metadata: Metadata = {
  title: "Digital Advertising — Classic Goals Pvt Limited",
  description: "Website ads, social media ads and Google Ads for businesses in Jaipur. Performance-focused paid campaigns that drive real enquiries.",
};

export default function AdsPage() {
  return (
    <ServicePageClient
      id="ads"
      number="04"
      accent="#F04E23"
      accentBg="rgba(240,78,35,0.08)"
      label="Digital Advertising"
      headline="Put Your Business in Front of the Right People."
      subheadline="Paid campaigns across websites, social media and Google — built for measurable results, not just impressions."
      intro="Organic growth is essential, but advertising accelerates it. We plan, launch and manage paid campaigns across three channels — website display ads, social media platforms and Google Search — targeting the exact audience most likely to enquire. Every rupee spent is tracked and optimized for maximum return."
      offerings={[
        {
          icon: "Monitor",
          title: "Website Ads",
          desc: "Display and banner advertising on relevant websites and networks to keep your brand visible to potential customers while they browse.",
        },
        {
          icon: "Share2",
          title: "Social Media Ads",
          desc: "Targeted paid campaigns on Facebook and Instagram using precise audience demographics, interests and behaviours to reach people most likely to convert.",
        },
        {
          icon: "TrendingUp",
          title: "Google Ads",
          desc: "Search and display advertising on Google — capturing customers at the exact moment they are searching for your product or service in Jaipur.",
        },
        {
          icon: "Target",
          title: "Audience Targeting",
          desc: "Deep audience research and segmentation so your budget goes to the people who matter most to your business.",
        },
        {
          icon: "BarChart2",
          title: "Campaign Strategy",
          desc: "Full campaign planning: objectives, ad creative direction, bidding strategy, landing page recommendations and A/B testing.",
        },
        {
          icon: "FileBarChart",
          title: "Performance Reporting",
          desc: "Clear monthly reports showing spend, reach, clicks, conversions and cost-per-enquiry — so you always know your return on investment.",
        },
      ]}
      whyPoints={[
        "Three ad channels managed from a single point of contact",
        "No wasted budget — audience targeting before any campaign goes live",
        "Creative ad copy and visuals included",
        "Transparent reporting every month",
        "Campaigns built around your enquiry and revenue goals",
      ]}
      imageSrc="/images/service-website.jpg"
    />
  );
}
