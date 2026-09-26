"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DoneForYou from "../../components/DoneForYou";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../../components/ui/Button";
import {
  QrCode,
  Globe,
  Megaphone,
  Inbox,
  Filter,
  Pencil,
  MessagesSquare,
  PieChart,
  MapPin,
  Navigation,
  ClipboardCheck,
  Building2,
  LayoutList,
  MonitorSmartphone,
  Users,
  Plug,
  ArrowRight,
  Star,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  img: string;
  icon: LucideIcon;
  title: string;
  desc: string;
};

type Pillar = {
  id: string;
  badge: string;
  title: string;
  sub: string;
  features: Feature[];
};

const pillars: Pillar[] = [
  {
    id: "collect",
    badge: "Collect",
    title: "Collect reviews on autopilot",
    sub: "QR, links, WhatsApp, SMS and email — plus campaigns that send themselves.",
    features: [
      {
        img: "/features/features19.png",
        icon: QrCode,
        title: "Collect Reviews",
        desc: "Collect 5-star reviews with QR codes, links, WhatsApp, SMS, email and more.",
      },
      {
        img: "/features/features9.png",
        icon: Globe,
        title: "60+ Review Platforms",
        desc: "Collect reviews from 60+ platforms including Google, Facebook, Justdial, Zomato and Tripadvisor.",
      },
      {
        img: "/features/features16.png",
        icon: Megaphone,
        title: "Review Campaigns",
        desc: "Run automated review request campaigns via email, SMS and WhatsApp.",
      },
      {
        img: "/features/features11.png",
        icon: Inbox,
        title: "Private Feedback Inbox",
        desc: "Capture private feedback with custom forms and resolve issues before they go public.",
      },
    ],
  },
  {
    id: "ai",
    badge: "Automate with AI",
    title: "AI that writes, replies and analyses",
    sub: "Filter the noise, reply in seconds and turn feedback into action.",
    features: [
      {
        img: "/features/features18.png",
        icon: Pencil,
        title: "AI Review Writer",
        desc: "Let AI turn customer feedback into authentic, high-quality, on-brand reviews.",
      },
      {
        img: "/features/features17.png",
        icon: MessagesSquare,
        title: "AI Review Reply",
        desc: "Generate smart, personalized replies to your reviews with AI.",
      },
      {
        img: "/features/features7.png",
        icon: Filter,
        title: "Positive & Negative Filtering",
        desc: "Automatically detect and filter positive and negative reviews so you respond faster.",
      },
      {
        img: "/features/features13.png",
        icon: PieChart,
        title: "AI Insights & Summaries",
        desc: "Understand what customers like, what's missing and get AI-powered suggestions.",
      },
    ],
  },
  {
    id: "visibility",
    badge: "Rank & Grow",
    title: "Get found and rank higher",
    sub: "Local SEO, Maps, GMB and multi-location — built for local growth.",
    features: [
      {
        img: "/features/features5.png",
        icon: MapPin,
        title: "Local SEO",
        desc: "Improve your local search rankings and get found by more customers.",
      },
      {
        img: "/features/features4.png",
        icon: Navigation,
        title: "Google Maps Ads",
        desc: "Run targeted ads on Google Maps to get more local customers.",
      },
      {
        img: "/features/features2.png",
        icon: ClipboardCheck,
        title: "GMB Audit & Optimization",
        desc: "Find and fix issues in your Google Business Profile to rank higher.",
      },
      {
        img: "/features/features14.png",
        icon: Building2,
        title: "Locations + Weekly Posting",
        desc: "Manage all locations from one dashboard with weekly GMB posts and custom images.",
      },
    ],
  },
  {
    id: "convert",
    badge: "Showcase & Convert",
    title: "Showcase reviews, convert visitors",
    sub: "Widgets, website, CRM and integrations that turn trust into revenue.",
    features: [
      {
        img: "/features/features6.png",
        icon: LayoutList,
        title: "Review Widgets",
        desc: "Show your best reviews on your website with beautiful, customizable widgets.",
      },
      {
        img: "/features/features15.png",
        icon: MonitorSmartphone,
        title: "Business Website",
        desc: "Get an SEO-optimized, mobile-friendly website that showcases your reviews.",
      },
      {
        img: "/features/features3.png",
        icon: Users,
        title: "CRM & Lead Management",
        desc: "Manage leads, follow-ups and customer conversations in one place.",
      },
      {
        img: "/features/features10.png",
        icon: Plug,
        title: "Integrations (15+)",
        desc: "Connect WooCommerce, Shopify, Google Sheets, HubSpot, Pabbly and more.",
      },
    ],
  },
];

const logos = [
  { src: "/logos/amazon.png", alt: "Amazon", cls: "h-6" },
  { src: "/logos/tripadvisor.svg", alt: "Tripadvisor", cls: "h-7" },
  { src: "/logos/zomato.svg", alt: "Zomato", cls: "h-6" },
  { src: "/logos/justdial.svg", alt: "Justdial", cls: "h-7" },
  { src: "/logos/google.svg", alt: "Google", cls: "h-7" },
  { src: "/logos/facebook.svg", alt: "Facebook", cls: "h-7" },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <article className="feature-card group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_20px_50px_-16px_rgba(27,191,106,0.35)] hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative bg-gradient-to-b from-primary-light/70 to-white p-4 sm:p-5">
        <div className="relative w-full aspect-square max-h-[260px] mx-auto">
          <Image
            src={feature.img}
            alt={feature.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div className="p-5 sm:p-6 flex flex-col gap-2.5 flex-1">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </span>
          <h3 className="font-bold text-dark text-[17px] leading-snug">{feature.title}</h3>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
      </div>
    </article>
  );
}

export default function FeaturesPage() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".f-hero-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 }
      );
      gsap.fromTo(
        ".feature-card",
        { y: 80, opacity: 0, scale: 0.82 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
          stagger: 0.09,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
      // Card images — zoom out from 1.25x with fade as each pillar scrolls in
      gsap.utils.toArray<HTMLElement>(".feature-card img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.25, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 92%",
              end: "top 55%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      // Pillar sections — strong fade + scale in on scroll down, reverse on scroll up
      gsap.utils.toArray<HTMLElement>("[data-pillar]").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 70, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
        // Pillar header — extra punch: fades + scales up as it enters
        const head = section.querySelector("[data-pillar-head]");
        if (head) {
          gsap.fromTo(
            head,
            { y: 44, opacity: 0, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.6)",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 45%",
                scrub: 1,
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />
      <main ref={rootRef} className="flex-1 bg-white">
        {/* Hero */}
        <section className="relative py-10 sm:py-16 lg:py-20 px-2.5 sm:px-6 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5 text-center relative">
            <span className="f-hero-anim inline-block text-[11px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-5">
              Features
            </span>
            <h1 className="f-hero-anim text-[34px] sm:text-5xl lg:text-6xl font-bold text-dark leading-[1.1] mb-4 text-balance">
              Get More Reviews.
              <br />
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">
                Build Trust.
              </span>
              <br />
              Grow Your Business.
            </h1>
            <p className="f-hero-anim text-[15px] sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Collect, manage and showcase reviews across 60+ platforms, automate customer
              feedback and turn happy customers into real revenue — with done-for-you setup and support.
            </p>
            <div className="f-hero-anim flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 mt-7">
              <Button href="/signup" variant="primary" className="w-full sm:w-auto">
                Get Started – ₹1,499/month
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button href="/pricing" variant="secondary" className="w-full sm:w-auto">
                View All Features
              </Button>
            </div>

            {/* Pillar quick nav */}
            <div className="f-hero-anim flex flex-wrap justify-center gap-2.5 mt-8">
              {pillars.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="text-sm font-semibold text-dark bg-white border border-gray-200 rounded-full px-4 py-2 hover:border-primary hover:text-primary transition-colors"
                >
                  {p.badge}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="pb-8 sm:pb-12 px-2.5 sm:px-6">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5 text-center">
            <p className="font-bold text-dark text-[15px] sm:text-lg mb-6">
              Loved by 10,000+ local businesses on 60+ platforms
            </p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max animate-marquee gap-8 sm:gap-12 items-center py-2">
                {[...logos, ...logos, ...logos].map((l, i) => (
                  <Image
                    key={`${l.alt}-${i}`}
                    src={l.src}
                    alt={l.alt}
                    width={140}
                    height={40}
                    className={`${l.cls} w-auto object-contain flex-shrink-0`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        {pillars.map((pillar, pi) => (
          <section
            key={pillar.id}
            id={pillar.id}
            data-pillar
            className={`py-10 sm:py-14 lg:py-16 px-2.5 sm:px-6 scroll-mt-20 ${
              pi % 2 === 1 ? "bg-gradient-to-b from-white to-primary-light/60" : "bg-white"
            }`}
          >
            <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
              <div data-pillar-head className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                <span className="inline-block text-[11px] sm:text-xs uppercase tracking-widest font-bold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-4">
                  {pillar.badge}
                </span>
                <h2 className="text-[26px] sm:text-4xl lg:text-[40px] font-bold text-dark leading-tight mb-3">
                  {pillar.title.replace("growth", "growth").split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">
                    {pillar.title.split(" ").slice(-1)}
                  </span>
                </h2>
                <p className="text-[15px] sm:text-base text-gray-500">{pillar.sub}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {pillar.features.map((f) => (
                  <FeatureCard key={f.title} feature={f} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Done for you */}
        <DoneForYou />

        {/* Testimonials teaser */}
        <section className="pb-12 sm:pb-16 px-2.5 sm:px-6 bg-white">
          <div className="max-w-[1200px] mx-auto px-0 sm:px-5 text-center">
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-widest font-bold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-4">
              Testimonials
            </span>
            <h2 className="text-[26px] sm:text-4xl font-bold text-dark mb-2">
              What Our{" "}
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">
                Customer Says
              </span>
            </h2>
            <p className="text-sm text-gray-500 mb-8 flex items-center justify-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              5.0 based on 2,356 Google reviews
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {[
                { n: "Rahul Sharma", r: "Sharma Electronics", t: "We went from 40 to 400+ Google reviews in three months. The QR codes at billing made all the difference." },
                { n: "Priya Nair", r: "Café Brew House", t: "The AI replies save me an hour every day, and customers keep mentioning how loved our responses feel." },
                { n: "Amit Patel", r: "Patel Dental Care", t: "Our rating climbed from 4.1 to 4.8. New patients tell us they picked us because of our reviews." },
              ].map((x) => (
                <div key={x.n} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-4">“{x.t}”</p>
                  <p className="text-sm font-bold text-dark">{x.n}</p>
                  <p className="text-xs text-gray-500">{x.r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
