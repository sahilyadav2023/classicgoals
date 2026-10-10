import type { Metadata } from "next";
import ServicePageClient from "@/components/ServicePageClient";

export const metadata: Metadata = {
  title: "Social Media Management — Classic Goals Pvt Limited",
  description: "Consistent social media content, scheduling and community management for businesses in Jaipur. Facebook, Instagram, YouTube and more.",
};

export default function SocialMediaPage() {
  return (
    <ServicePageClient
      id="social"
      number="02"
      accent="#00A651"
      accentBg="rgba(0,166,81,0.08)"
      label="Social Media"
      headline="Keep Your Brand in the Feed and Front of Mind."
      subheadline="Consistent, quality content that builds your audience, drives engagement and keeps your business relevant — every week, without the stress."
      intro="Social media is a daily commitment. We handle the strategy, content creation, scheduling and community management so you can focus on running your business. From eye-catching posts to weekly reels, we keep your profiles active, professional and growing."
      offerings={[
        {
          icon: "PenTool",
          title: "Content Creation",
          desc: "Professionally designed graphics, captions and videos tailored to your brand voice and audience.",
        },
        {
          icon: "CalendarCheck",
          title: "Content Scheduling",
          desc: "Consistent posting schedule — 3 posts, 2 stories and 1 reel per week — so your feed stays active without gaps.",
        },
        {
          icon: "Instagram",
          title: "Facebook & Instagram",
          desc: "Full management of your Meta accounts including posts, stories, reels, hashtag strategy and audience interaction.",
        },
        {
          icon: "Youtube",
          title: "YouTube Management",
          desc: "Video optimization, thumbnails, descriptions and community engagement to grow your YouTube presence.",
        },
        {
          icon: "Users",
          title: "Community Management",
          desc: "Responding to comments and messages to build genuine relationships with your audience.",
        },
        {
          icon: "BarChart2",
          title: "Performance Tracking",
          desc: "Monthly reports showing reach, engagement, follower growth and content performance so you can see exactly what is working.",
        },
      ]}
      whyPoints={[
        "Dedicated content team that learns your brand",
        "Platform-native content — not recycled templates",
        "Monthly reporting with real numbers",
        "Flexible plans starting at ₹15,000/month",
        "Consistent weekly delivery, no delays",
      ]}
      imageSrc="/images/service-social.jpg"
    />
  );
}
