"use client";

import Header from "./Header";
import DoneForYou from "./DoneForYou";
import Image from "next/image";
import DotsCanvas from "./DotsCanvas";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/Button";
import { QrCode, Bot, LayoutList, BarChart3, Megaphone, Globe, CreditCard, Clock, ShieldCheck, Pencil, MessagesSquare, PieChart, Building, Star, TrendingUp, Smile, Zap, User, LayoutGrid, FileText, Asterisk, ThumbsUp, ShoppingBag, MapPin, UtensilsCrossed, ChevronDown, ArrowRight, House, Layers, Phone, Navigation, ShoppingCart, Building2, Dumbbell, Scissors, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { src: "/logos/google.svg", alt: "Google", height: "h-7", name: "Google", reviews: "4.8★", count: "12K+" },
  { src: "/logos/facebook.svg", alt: "Facebook", height: "h-7", name: "Facebook", reviews: "4.7★", count: "8.5K+" },
  { src: "/logos/amazon.png", alt: "Amazon", height: "h-6", name: "Amazon", reviews: "4.9★", count: "15K+" },
  { src: "/logos/tripadvisor.svg", alt: "Tripadvisor", height: "h-7", name: "Tripadvisor", reviews: "4.6★", count: "6.2K+" },
  { src: "/logos/zomato.svg", alt: "Zomato", height: "h-6", name: "Zomato", reviews: "4.7★", count: "9.8K+" },
  { src: "/logos/justdial.svg", alt: "Justdial", height: "h-7", name: "Justdial", reviews: "4.5★", count: "4.1K+" },
];

const platforms = [
  { src: "/logos/google.svg", name: "Google Business", rating: "4.8", reviews: "12,450", color: "from-blue-500 to-blue-600" },
  { src: "/logos/facebook.svg", name: "Facebook", rating: "4.7", reviews: "8,520", color: "from-indigo-500 to-indigo-600" },
  { src: "/logos/amazon.png", name: "Amazon", rating: "4.9", reviews: "15,890", color: "from-orange-500 to-orange-600" },
  { src: "/logos/tripadvisor.svg", name: "Tripadvisor", rating: "4.6", reviews: "6,210", color: "from-green-500 to-green-600" },
  { src: "/logos/zomato.svg", name: "Zomato", rating: "4.7", reviews: "9,870", color: "from-red-500 to-red-600" },
  { src: "/logos/justdial.svg", name: "Justdial", rating: "4.5", reviews: "4,120", color: "from-yellow-500 to-yellow-600" },
];

const features = [
  {
    icon: QrCode,
    title: "Collect Reviews",
    description: "QR codes, links, email, WhatsApp, SMS & more.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "AI writes reviews & replies so you save hours.",
  },
  {
    icon: LayoutList,
    title: "Showcase Everywhere",
    description: "10+ beautiful widgets for your website.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track ratings, sentiment, calls, traffic & more.",
  },
  {
    icon: Megaphone,
    title: "Review Campaigns",
    description: "Send email, WhatsApp & SMS campaigns.",
  },
  {
    icon: Globe,
    title: "Smart Website",
    description: "Get a ready-to-use website with your plan.",
  },
];

const trustBadges = [
  { icon: CreditCard, text: "No Credit Card Required" },
  { icon: Clock, text: "14-Day Free Trial" },
  { icon: ShieldCheck, text: "Cancel Anytime" },
];

const steps = [
  {
    num: 1,
    title: "Scan QR / Link",
    img: "/homepage-2/Chatgpt11.png",
    desc: "Customer scans QR or opens your link.",
  },
  {
    num: 2,
    title: "Answer few Questions",
    img: "/homepage-2/Chatgpt10.png",
    desc: "Quick questions about their experience.",
  },
  {
    num: 3,
    title: "AI Creates Review",
    img: "/homepage-2/Chatgpt9.png",
    desc: "AI writes a natural, authentic review.",
  },
  {
    num: 4,
    title: "Publish Anywhere",
    img: "/homepage-2/Chatgpt8.png",
    desc: "Review goes live on 60+ platforms.",
  },
];

const aiFeatures = [
  {
    icon: Pencil,
    title: "AI Review Writer",
    description: "Track ratings, sentiment, calls, traffic & more.",
    img: "/homepage-2/Chatgpt12.png",
    imgWidth: 2172,
    imgHeight: 724,
    wide: true,
  },
  {
    icon: MessagesSquare,
    title: "AI Review Reply",
    description: "AI understands ratings & message and writes the perfect reply.",
    img: "/homepage-2/Chatgpt13.png",
    imgWidth: 2171,
    imgHeight: 724,
    wide: true,
  },
  {
    icon: PieChart,
    title: "AI Insights",
    description: "AI analyzes reviews and gives actionable insights instantly.",
    img: "/homepage-2/Chatgpt14.png",
    imgWidth: 1254,
    imgHeight: 1254,
    wide: false,
  },
];

const dashStats = [
  { label: "Total Reviews", value: 2356, display: "2,356", decimals: 0, delta: "16.6%", icon: Star },
  { label: "Average Rating", value: 5.0, display: "5.0", decimals: 1, delta: "0.3", icon: TrendingUp },
  { label: "Google Calls", value: 1827, display: "1,827", decimals: 0, delta: "24.9%", icon: Phone },
  { label: "Directions", value: 926, display: "926", decimals: 0, delta: "14.6%", icon: Navigation },
];

const dashSources = [
  { label: "Google", count: 1245, icon: Globe },
  { label: "Facebook", count: 532, icon: ThumbsUp },
  { icon: ShoppingBag, label: "Amazon", count: 290 },
  { icon: MapPin, label: "Tripadvisor", count: 184 },
  { icon: UtensilsCrossed, label: "Zomato", count: 105 },
];

const widgetTypes = [
  { label: "Slider", icon: LayoutList, desc: "Horizontal scrolling carousel", featured: true },
  { label: "Carousel", icon: Layers, desc: "Auto-rotating review cards", featured: false },
  { label: "Badge", icon: Asterisk, desc: "Compact floating score", featured: false },
  { label: "Popup", icon: Megaphone, desc: "Attention-grabbing modal", featured: false },
  { label: "Grid", icon: LayoutGrid, desc: "Masonry-style gallery", featured: false },
  { label: "List", icon: FileText, desc: "Clean testimonial feed", featured: false },
];

const avatarTints = [
  "bg-rose-100 text-rose-500",
  "bg-amber-100 text-amber-600",
  "bg-sky-100 text-sky-600",
  "bg-violet-100 text-violet-600",
  "bg-emerald-100 text-emerald-600",
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Owner, Sharma Electronics",
    initials: "RS",
    text: "We went from 40 to 400+ Google reviews in three months. The QR codes at billing made all the difference.",
  },
  {
    name: "Priya Nair",
    role: "Founder, Café Brew House",
    initials: "PN",
    text: "The AI replies save me an hour every day, and customers keep mentioning how loved our responses feel.",
  },
  {
    name: "Amit Patel",
    role: "Director, Patel Dental Care",
    initials: "AP",
    text: "Our rating climbed from 4.1 to 4.8. New patients tell us they picked us because of our reviews.",
  },
  {
    name: "Sarah Thomas",
    role: "Owner, Sarah's Boutique",
    initials: "ST",
    text: "The website widgets look premium and match our brand. Review conversions from our site doubled.",
  },
  {
    name: "Vikram Mehta",
    role: "Founder, IronWorks Fitness",
    initials: "VM",
    text: "WhatsApp campaigns bring a steady flow of fresh reviews after every batch of trial classes.",
  },
  {
    name: "Neha Gupta",
    role: "Owner, Glow & Grace Salon",
    initials: "NG",
    text: "Analytics showed exactly where we were slipping. We fixed it in two weeks and ratings bounced back.",
  },
];

const tools = [
  { src: "/logos/justdial.svg", alt: "Justdial", height: "h-8", label: "Justdial" },
  { src: "/logos/Shopify-Bag.svg", alt: "Shopify", height: "h-7", label: "Shopify" },
  { src: "/logos/woocommerce.svg", alt: "WooCommerce", height: "h-8", label: "WooCommerce" },
  { src: "/logos/App-Store.svg", alt: "App Store", height: "h-7", label: "App Store" },
  { src: "/logos/stripe-icon.svg", alt: "Stripe", height: "h-8", label: "Stripe" },
];

const industries: { icon: LucideIcon; label: string }[] = [
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Building2, label: "Real Estate" },
  { icon: Dumbbell, label: "Gyms" },
  { icon: Scissors, label: "Salons" },
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Smile, label: "Dentists" },
];

function InfiniteMarquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  const copies = [0, 1, 2].map((copy) =>
    Children.map(children, (child, i) =>
      isValidElement(child) ? cloneElement(child, { key: `${copy}-${i}` }) : child
    )
  );

  return (
    <div
      className={`group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${className}`}
    >
      <div className="flex w-max animate-marquee gap-5 py-2 group-hover:[animation-play-state:paused]">
        {copies}
      </div>
    </div>
  );
}

function Stars({ count = 5, dimLast = false }: { count?: number; dimLast?: boolean }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            dimLast && i === count - 1
              ? "text-gray-300 fill-gray-200"
              : "text-amber-400 fill-amber-400"
          }`}
        />
      ))}
    </span>
  );
}

function WidgetGallery() {
  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex animate-marquee gap-3 w-max group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-3" aria-hidden={copy > 0}>
              {dashSources.map((source) => (
                <span
                  key={`${copy}-${source.label}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white pl-2 pr-3 py-2 text-xs font-semibold text-dark whitespace-nowrap shadow-sm"
                >
                  <span className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center">
                    <source.icon className="w-3.5 h-3.5 text-primary" />
                  </span>
                  {source.label}
                  <span className="inline-flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    5.0
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgetTypes.map((widget, i) => (
          <div
            key={widget.label}
            className={`rounded-2xl border p-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              widget.featured
                ? "border-primary/40 bg-gradient-to-br from-primary/5 via-white to-white"
                : "border-gray-200/80 hover:border-primary/40"
            }`}
          >
            <span className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              widget.featured
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-primary-subtle text-primary"
            }`}>
              <widget.icon className={widget.featured ? "w-6 h-6" : "w-5 h-5"} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-dark">{widget.label}</h4>
                {widget.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{widget.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsDashboard({
  dashCounts,
  chartLineRef,
  chartAreaRef,
}: {
  dashCounts: number[];
  chartLineRef: RefObject<SVGPathElement | null>;
  chartAreaRef: RefObject<SVGPathElement | null>;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {dashStats.map((stat, i) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200/70 bg-gray-50/50 p-4 flex items-start gap-3"
          >
            <span className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center flex-shrink-0">
              <stat.icon className="w-5 h-5 text-primary" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-gray-500 leading-tight">{stat.label}</p>
              <p className="text-[22px] font-extrabold text-dark mt-0.5">
                {stat.decimals > 0
                  ? dashCounts[i].toFixed(stat.decimals)
                  : Math.round(dashCounts[i]).toLocaleString("en-US")}
              </p>
              <p className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-1">
                <TrendingUp className="w-3 h-3" />
                {stat.delta}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
        <div className="rounded-2xl border border-gray-200/70 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-dark">Reviews Growth</h4>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 border border-gray-200 bg-white rounded-full px-2 py-0.5">
              Last 30 days
              <ChevronDown className="w-3 h-3" />
            </span>
          </div>
          <svg viewBox="0 0 600 240" className="w-full h-auto block" role="img" aria-label="Reviews growth chart">
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1BBF6A" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#1BBF6A" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[30, 90, 150, 210].map((y) => (
              <line key={y} x1="36" y1={y} x2="590" y2={y} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
            ))}
            {[
              { y: 30, label: "3K" },
              { y: 90, label: "2K" },
              { y: 150, label: "1K" },
              { y: 210, label: "0K" },
            ].map((t) => (
              <text key={t.label} x="4" y={t.y + 4} fontSize="11" fill="#9ca3af" fontWeight="500">
                {t.label}
              </text>
            ))}
            {["May 1", "May 8", "May 15", "May 22", "May 29", "Jun 5"].map((d, i) => (
              <text key={d} x={70 + i * 98} y="228" fontSize="11" fill="#9ca3af" fontWeight="500" textAnchor="middle">
                {d}
              </text>
            ))}
            <path
              ref={chartAreaRef}
              d="M70,196 L168,176 L266,182 L364,156 L462,164 L560,120 L560,210 L70,210 Z"
              fill="url(#growthFill)"
            />
            <path
              ref={chartLineRef}
              d="M70,196 L168,176 L266,182 L364,156 L462,164 L560,120"
              fill="none"
              stroke="#1BBF6A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1400"
            />
            <circle cx="462" cy="164" r="6" fill="#ffffff" stroke="#1BBF6A" strokeWidth="3" />
          </svg>
        </div>

        <div className="rounded-2xl border border-gray-200/70 bg-white p-4 flex flex-col">
          <h4 className="text-sm font-bold text-dark mb-3">Top Sources</h4>
          <div className="flex flex-col gap-2">
            {dashSources.map((source) => (
              <div key={source.label} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-subtle text-primary">
                  <source.icon className="w-4 h-4" />
                </span>
                <span className="text-sm font-medium text-gray-600">{source.label}</span>
                <span className="text-sm font-bold text-dark ml-auto">{source.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-auto pt-2 cursor-pointer">
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Homepage2() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const trustBadgesRef = useRef<HTMLDivElement>(null);
  const heroImageWrapperRef = useRef<HTMLDivElement>(null);
  const statCard1Ref = useRef<HTMLDivElement>(null);
  const statCard2Ref = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLDivElement>(null);
  const [activeAi, setActiveAi] = useState(0);
  const activeFeature = aiFeatures[activeAi];
  const aiSectionRef = useRef<HTMLElement>(null);
  const aiProgressRef = useRef<HTMLDivElement>(null);
  const aiSTRef = useRef<ScrollTrigger | null>(null);
  const chartLineRef = useRef<SVGPathElement>(null);
  const chartAreaRef = useRef<SVGPathElement>(null);
  const countedRef = useRef(false);
  const [dashCounts, setDashCounts] = useState<number[]>(dashStats.map(() => 0));
  const [activeTab, setActiveTab] = useState(0);

  const goToAi = (i: number) => {
    const st = aiSTRef.current;
    if (st) {
      const y = st.start + ((i + 0.5) / aiFeatures.length) * (st.end - st.start);
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      setActiveAi(i);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(subheadRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(ctaPrimaryRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(ctaSecondaryRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(trustBadgesRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(heroImageWrapperRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(statCard1Ref.current, {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        delay: 0.7,
      });

      gsap.from(statCard2Ref.current, {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        delay: 0.8,
      });

      gsap.fromTo(
        ".feature-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: featuresSectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.from(".stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".platforms-section",
          start: "top 70%",
        },
      });

      gsap.fromTo(
        ".step-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".steps-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".ai-tab",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".ai-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".code-showcase-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".code-showcase-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".testimonial-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".testimonial-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".carousel-row").forEach((row) => {
        gsap.fromTo(
          row.querySelectorAll(".carousel-item"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        chartLineRef.current,
        { strokeDashoffset: 1400 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".code-showcase-section",
            start: "top 60%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        chartAreaRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.9,
          scrollTrigger: {
            trigger: ".code-showcase-section",
            start: "top 60%",
            once: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: ".code-showcase-section",
        start: "top 70%",
        once: true,
        onEnter: () => {          if (countedRef.current) return;
          countedRef.current = true;
          const progress = { t: 0 };
          gsap.to(progress, {
            t: 1,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () =>
              setDashCounts(
                dashStats.map((s) => +(s.value * progress.t).toFixed(s.decimals))
              ),
          });
        },
      });

      // Scroll-driven showcase (desktop): CSS sticky keeps the content
      // fixed while ScrollTrigger only reads progress to swap panels.
      // No GSAP pin, so a mis-measurement can never blank the section.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: aiSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const idx = Math.min(
              aiFeatures.length - 1,
              Math.floor(self.progress * aiFeatures.length)
            );
            setActiveAi((prev) => (prev === idx ? prev : idx));
            if (aiProgressRef.current) {
              aiProgressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        });
        aiSTRef.current = st;
        return () => {
          aiSTRef.current = null;
        };
      });
    });

    return () => ctx.revert();
  }, []);


  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative py-8 sm:py-16 lg:py-24 px-2.5 sm:px-6 overflow-hidden">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center max-w-4xl mx-auto mb-6 lg:mb-8">
              
              <h1
                ref={headlineRef}
                className="text-[40px] sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark leading-[1.15] sm:leading-tight mb-4 text-center text-balance"
              >
                <span className="whitespace-nowrap">Build Trust,</span>{" "}
                <span className="whitespace-nowrap">Stay Visible,</span>{" "}
                <span className="whitespace-nowrap inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">Drive Revenue</span>
              </h1>
              
              <p
                ref={subheadRef}
                className="text-[16px] sm:text-base text-gray-600 leading-relaxed sm:leading-normal max-w-5xl mx-auto text-balance"
              >
                Collect More Reviews reply with AI, showcase everywhere and turn
                feedback into real business growth
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-8">
                <Button
                  ref={ctaPrimaryRef}
                  href="/signup"
                  variant="primary"
                  className="w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  Start a 14 day free trial!
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                <Button
                  ref={ctaSecondaryRef}
                  href="/features"
                  variant="secondary"
                  className="w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Features
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-6 text-[14px] sm:text-sm text-gray-500 mt-6 sm:mt-8" ref={trustBadgesRef}>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Setup in 5 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 sm:mt-12" ref={heroImageWrapperRef}>
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-800">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950 border-b border-gray-800">
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-[10px] sm:text-xs text-gray-500 font-mono truncate px-2">app.flexireviews.com/dashboard</div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-700 flex-shrink-0" />
                </div>
                <div className="p-2.5 sm:p-4 lg:p-6">
                  <Image
                    ref={heroImageRef}
                    src="/homepage/hero.png"
                    alt="Flexi Reviews Dashboard - Review management, AI replies, analytics"
                    width={2048}
                    height={768}
                    sizes="(min-width: 1480px) 1280px, 100vw"
                    className="w-full h-auto rounded-lg sm:rounded-xl"
                    priority
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* Floating stat cards: stacked in-flow on mobile (10px gutters),
                  floating absolute only on sm+ so they can't overlap/overflow */}
              <div className="mt-2.5 flex flex-col gap-2.5 sm:contents">
                <div className="relative sm:absolute sm:-top-6 sm:right-10 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-3.5 sm:p-5 border border-gray-100 w-full sm:w-auto sm:max-w-none max-w-[320px] mx-auto" ref={statCard2Ref}>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-dark text-[16px] sm:text-base whitespace-nowrap">3hrs saved/week</p>
                      <p className="text-[14px] sm:text-sm text-gray-600">Automated replies & collection</p>
                    </div>
                  </div>
                </div>

                <div className="relative sm:absolute sm:-bottom-6 sm:left-1/2 sm:-translate-x-1/2 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-3.5 sm:p-5 border border-gray-100 w-full sm:w-auto sm:max-w-none max-w-[320px] mx-auto" ref={statCard1Ref}>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[16px] sm:text-base whitespace-nowrap"><span className="inline-block bg-gradient-to-r from-emerald-600 via-primary to-emerald-700 bg-clip-text text-transparent">+47% more reviews</span></p>
                      <p className="text-[14px] sm:text-sm text-gray-600">Average increase in 90 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-white to-transparent pointer-events-none sm:h-32 lg:h-48" />
        </section>

        <section className="py-10 sm:py-16 lg:py-20 px-2.5 sm:px-6 bg-white platforms-section">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center mb-10">
              <span className="inline-block text-[11px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-3 sm:px-4 py-1.5 mb-4">
                TRUSTED BY 100,000+ BUSINESSES
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-3 text-balance">
                <span className="whitespace-nowrap">Loved by</span>{" "}
                <span className="whitespace-nowrap inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">local businesses</span>{" "}
                <span className="whitespace-nowrap">everywhere</span>
              </h2>
              <p className="text-[16px] sm:text-lg text-gray-500 max-w-2xl mx-auto">
                Collect, manage, and showcase your reviews across 60+ platforms
              </p>
</div>

            <div className="carousel-row mb-10">
              <InfiniteMarquee>
                {logos.map((logo) => (
                  <div
                    key={logo.alt}
                    className="carousel-item shrink-0 w-[140px] sm:w-[170px] h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_16px_32px_-12px_rgba(27,191,106,0.2)] hover:border-primary/30 transition-all duration-300 px-4"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={120}
                      height={40}
                      sizes="(min-width: 640px) 170px, 140px"
                      className={`${logo.height} w-auto object-contain`}
                    />
                  </div>
                ))}
              </InfiniteMarquee>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-100">
              {[
                { label: "Platforms Integrated", value: "60+", icon: Globe },
                { label: "Reviews Collected", value: "2.4M+", icon: MessagesSquare },
                { label: "Businesses Active", value: "25K+", icon: Building },
                { label: "Avg. Rating Boost", value: "+0.8★", icon: Star },
              ].map((stat, i) => (
                <div key={i} className="stat-item text-center relative">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-primary-subtle rounded-xl flex items-center justify-center">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full" />
                  </div>
                  <div className="text-[22px] sm:text-[22px] sm:text-2xl lg:text-3xl font-bold text-dark mb-1">{stat.value}</div>
                  <div className="text-[14px] sm:text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-white relative" ref={featuresSectionRef}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,var(--tw-gradient-from)_0%,transparent_50%),radial-gradient(ellipse_at_80%_80%,var(--tw-gradient-to)_0%,transparent_50%)] from-primary/5 via-transparent to-primary/5 pointer-events-none animate-bg-shift" />
          <DotsCanvas />
          <div className="absolute top-0 inset-x-0 h-44 lg:h-60 bg-gradient-to-b from-white to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-44 lg:h-60 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
              <span className="inline-block text-[12px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-6">
                ALL-IN-ONE REVIEW GROWTH PLATFORM
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-6">
                Everything you need to turn feedback into{" "}
                <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">growth.</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                From collecting reviews to showcasing them everywhere — we help you
                build trust, attract more customers, and grow your business.
              </p>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-12">
                {features.map((feature, i) => (
                  <article
                    key={feature.title}
                    className="feature-card bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    style={{ "--index": i } as CSSProperties}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary-subtle flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[20px] font-semibold text-dark mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="relative mt-10 flex justify-center">
                <div className="relative flex w-fit max-w-full flex-wrap items-center justify-center gap-3 md:gap-6 text-sm text-gray-600 pt-6 pb-6 px-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-100/50 shadow-lg shadow-primary/5">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 relative px-2 py-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0" />
                        <badge.icon className="w-5 h-5 text-primary relative" />
                      </div>
                      <span className="font-medium text-dark hidden sm:inline">{badge.text}</span>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </section>

        <section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-gradient-to-b from-white to-primary-light relative overflow-hidden steps-section">
          <div className="absolute top-24 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-24 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5 relative">
            <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-20">
              <span className="inline-block text-[12px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-6">
                How it works
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-4">
                From feedback to{" "}
                <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">5-star reviews in 4 simple steps</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
              {steps.map((step, i) => (
                <div key={step.num} className="step-card relative flex flex-col items-center group">
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-primary/25 mb-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    {step.num}
                  </div>

                  <div className="relative w-full max-w-[300px] rounded-[2rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/60 p-2.5 pb-3 transition-all duration-500 group-hover:shadow-[0_30px_60px_-12px_rgba(27,191,106,0.3)] group-hover:-translate-y-2">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-10 w-24 h-2 bg-white/90 rounded-full" />
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-gray-50">
                      <Image
                        src={step.img}
                        alt={step.title}
                        width={1122}
                        height={1402}
                        sizes="(min-width: 1024px) 300px, (min-width: 640px) 300px, 100vw"
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-[11px] font-bold text-primary shadow-sm">
                        Step {step.num}
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-6 px-2">
                    <h3 className="text-[20px] font-semibold text-dark mb-2 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Button variant="secondary" href="/features" className="whitespace-nowrap">
                Post to 60+ Platforms
              </Button>
            </div>
          </div>
        </section>

        <section ref={aiSectionRef} className="py-10 sm:py-16 lg:py-0 px-2.5 sm:px-6 bg-white relative overflow-x-clip ai-section lg:h-[350vh]">
          <div className="lg:sticky lg:top-0 lg:h-screen lg:min-h-[720px] flex flex-col justify-center">
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5 relative">
            <div className="text-center max-w-4xl mx-auto mb-6 lg:mb-8">
              <span className="inline-block text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-4">
                AI POWERED
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-3">
                AI that works <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">while you work</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Let AI handle the repetitive parts of review management — writing,
                replying, and understanding feedback at scale.
              </p>
            </div>

            <div>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {aiFeatures.map((feature, i) => (
                <button
                  key={feature.title}
                  onClick={() => goToAi(i)}
                  className={`ai-tab flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    i === activeAi
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                      : "bg-white text-dark border border-gray-200 hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  <feature.icon className="w-5 h-5" />
                  {feature.title}
                </button>
              ))}
            </div>

            <div className="w-56 h-1 mx-auto mb-5 rounded-full bg-gray-100 overflow-hidden">
              <div
                ref={aiProgressRef}
                className="h-full w-full bg-primary rounded-full origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <div
              key={activeFeature.title}
              className="animate-fade-in-up relative bg-gradient-to-br from-primary-light/60 via-white to-white rounded-3xl border border-gray-100/60 shadow-xl shadow-gray-200/50 overflow-hidden lg:h-[46vh] lg:min-h-[400px]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] items-stretch lg:h-full">
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25 mb-5">
                    <activeFeature.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    0{activeAi + 1} — {aiFeatures.length} AI tools
                  </span>
                  <h3 className="text-[22px] sm:text-[22px] sm:text-2xl lg:text-3xl font-bold text-dark leading-tight mb-3">
                    {activeFeature.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    {activeFeature.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {aiFeatures.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToAi(i)}
                        aria-label={`Show ${aiFeatures[i].title}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === activeAi ? "w-8 bg-primary" : "w-2 bg-gray-300 hover:bg-primary/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative p-4 lg:p-6 lg:pl-0 flex items-center lg:h-full lg:min-h-0">
                  {!activeFeature.wide && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
                  )}
                  <div className="relative w-full lg:h-full rounded-2xl overflow-hidden border border-gray-200/70 bg-white shadow-lg shadow-gray-200/50 flex flex-col">
                    <div className="flex flex-shrink-0 items-center gap-1.5 px-4 py-2.5 bg-gray-50/80 border-b border-gray-100">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span className="ml-2 text-[11px] font-medium text-gray-400">{activeFeature.title}</span>
                      {!activeFeature.wide && (
                        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                          </span>
                          Live
                        </span>
                      )}
                    </div>
                    {activeFeature.wide ? (
                      <div className="lg:flex-1 lg:min-h-0 flex items-center justify-center lg:overflow-hidden">
                        <Image
                          src={activeFeature.img}
                          alt={activeFeature.title}
                          width={activeFeature.imgWidth}
                          height={activeFeature.imgHeight}
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="w-full h-auto block"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row items-stretch gap-4 p-4 bg-gray-50/50 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
                        <div className="relative rounded-xl overflow-hidden border border-gray-200/70 bg-white shadow-md flex-shrink-0 md:w-[42%] flex items-center justify-center">
                          <Image
                            src={activeFeature.img}
                            alt={activeFeature.title}
                            width={activeFeature.imgWidth}
                            height={activeFeature.imgHeight}
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 42vw, 100vw"
                            className="w-full h-auto block md:h-full md:object-contain"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-3">
                          {[
                            { icon: TrendingUp, label: "Rating trend", value: "86%", width: "w-[86%]" },
                            { icon: Smile, label: "Positive sentiment", value: "92%", width: "w-[92%]" },
                            { icon: Zap, label: "Auto response rate", value: "78%", width: "w-[78%]" },
                          ].map((insight, j) => (
                            <div
                              key={insight.label}
                              className="animate-fade-in-up bg-white rounded-xl border border-gray-200/70 shadow-sm p-3.5"
                              style={{ animationDelay: `${0.15 + j * 0.12}s` }}
                            >
                              <div className="flex items-center gap-2.5 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center flex-shrink-0">
                                  <insight.icon className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-sm font-semibold text-dark flex-1">{insight.label}</span>
                                <span className="text-sm font-bold text-primary">{insight.value}</span>
                              </div>
                              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                <div className={`h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 ${insight.width}`} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        </section>

<section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-white relative overflow-hidden code-showcase-section">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-0 sm:px-5 relative">
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
              <span className="inline-block text-[12px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-6">
                Showcase & Insights
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-6">
                Show off your reputation, <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">know your numbers</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Turn great reviews into website widgets that convert — and track
                exactly how they grow your business.
              </p>
            </div>

            <div className="relative mt-6 lg:mt-10">
              <div className="code-showcase-card relative bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_30px_60px_-12px_rgba(27,191,106,0.15)]">
                <div className="flex items-center gap-3 px-5 lg:px-6 py-3.5 border-b border-gray-100 bg-gradient-to-r from-primary-light/50 via-white to-white">
                  <span className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-primary" />
                  </span>
                  <div className="flex-1 max-w-lg mx-auto flex items-center gap-2 bg-white/80 border border-gray-200/70 rounded-full px-4 py-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-500 truncate">app.flexireviews.in/dashboard</span>
                  </div>
                  <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30 bg-primary/10 rounded-full px-2.5 py-1 flex-shrink-0">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    Live
                  </span>
                </div>

                <div className="p-6 lg:p-8">
                  <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-[22px] sm:text-2xl lg:text-3xl font-bold text-dark leading-tight">
                        Showcase & Insights
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Widgets to convert, analytics to grow
                      </p>
                    </div>
                    <div className="flex gap-1 bg-gray-100 rounded-xl p-1" role="tablist">
                      <button
                        role="tab"
                        aria-selected={activeTab === 0}
                        onClick={() => setActiveTab(0)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          activeTab === 0
                            ? "bg-white text-primary shadow-md"
                            : "text-gray-500 hover:text-dark"
                        }`}
                      >
                        <LayoutList className="w-4 h-4" />
                        Widget Gallery
                      </button>
                      <button
                        role="tab"
                        aria-selected={activeTab === 1}
                        onClick={() => setActiveTab(1)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          activeTab === 1
                            ? "bg-white text-primary shadow-md"
                            : "text-gray-500 hover:text-dark"
                        }`}
                      >
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </button>
                    </div>
                  </div>

                  <div
                    key={activeTab}
                    className="animate-fade-in-up"
                    role="tabpanel"
                  >
                    {activeTab === 0 ? (
                      <WidgetGallery />
                    ) : (
                      <AnalyticsDashboard
                        dashCounts={dashCounts}
                        chartLineRef={chartLineRef}
                        chartAreaRef={chartAreaRef}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-3 xl:right-6 hidden lg:flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-lg px-4 py-3">
                <div className="flex -space-x-2">
                  {avatarTints.slice(0, 3).map((tint, i) => (
                    <span key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${tint}`}>
                      <User className="w-3.5 h-3.5" />
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-dark leading-tight">2,356 reviews</p>
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    <TrendingUp className="w-3 h-3" /> 16.6% this month
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-3 xl:left-6 hidden lg:flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-lg px-4 py-3">
                <span className="w-9 h-9 rounded-xl bg-primary-subtle flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                </span>
                <div>
                  <p className="text-sm font-bold text-dark leading-tight">5.0 average rating</p>
                  <p className="text-xs text-gray-500">across 6 review platforms</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-gradient-to-b from-white to-primary-light relative overflow-hidden testimonial-section">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5 relative">
            <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
              <span className="inline-block text-[12px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-6">
                Testimonials
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-6">
                Loved by businesses <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">like yours</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Real reviews from real customers, pulled live from Google.
              </p>
            </div>

            <div className="testimonial-card flex flex-wrap items-center justify-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full pl-2 pr-4 py-2 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                  <Globe className="w-4 h-4 text-blue-500" />
                </span>
                <span className="text-[22px] font-extrabold text-dark leading-none">5.0</span>
                <Stars count={5} />
              </span>
              <span className="text-sm text-gray-500">
                Based on <span className="font-bold text-dark">2,356</span> Google reviews
              </span>
            </div>

            <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map((t, i) => (
                  <div
                    key={t.name}
                    className="testimonial-card bg-white border border-gray-100 rounded-3xl p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(27,191,106,0.25)] hover:border-primary/30 transition-all duration-300"
                  >
                    <Stars count={5} />
                    <p className="text-[16px] text-gray-600 leading-relaxed flex-1">
                      “{t.text}”
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <span className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarTints[i % avatarTints.length]}`}>
                        {t.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-dark leading-tight">{t.name}</p>
                        <p className="text-xs text-gray-500 truncate">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-white relative overflow-hidden integrations-section">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
              <span className="inline-block text-[12px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-6">
                Integrations
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-6">
                Connect with the tools <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">you already use</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Sync reviews in minutes — no code, no design work, no friction.
              </p>
            </div>
            <div className="carousel-row mb-16 lg:mb-20">
              <InfiniteMarquee>
                {tools.map((tool) => (
                  <div
                    key={tool.alt}
                    className="carousel-item shrink-0 w-[190px] sm:w-[210px] h-28 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-[0_16px_32px_-12px_rgba(27,191,106,0.2)] hover:border-primary/30 transition-all duration-300"
                  >
                    <Image
                      src={tool.src}
                      alt={tool.alt}
                      width={120}
                      height={40}
                      sizes="(min-width: 640px) 210px, 190px"
                      className={`${tool.height} w-auto object-contain`}
                    />
                    <span className="text-xs font-semibold text-dark">{tool.label}</span>
                  </div>
                ))}
              </InfiniteMarquee>
            </div>

            <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-6">
                Built for <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">every industry</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                From retail counters to clinic desks, FlexiReviews grows with your industry.
              </p>
            </div>
            <div className="carousel-row">
              <InfiniteMarquee>
                {industries.map((ind) => (
                  <div
                    key={ind.label}
                    className="carousel-item shrink-0 w-[150px] sm:w-[170px] h-28 bg-gradient-to-b from-white to-primary-light border border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-[0_16px_32px_-12px_rgba(27,191,106,0.25)] hover:border-primary/30 transition-all duration-300"
                  >
                    <ind.icon className="w-7 h-7 text-primary" />
                    <span className="text-sm font-semibold text-dark">{ind.label}</span>
                  </div>
                ))}
              </InfiniteMarquee>
            </div>
          </div>
        </section>

        <DoneForYou />

      </main>

      <footer className="bg-[#1a2e2a] text-white px-2.5 sm:px-6">
        <div className="max-w-[1480px] mx-auto px-0 sm:px-5 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12 lg:gap-8">
            {/* Brand */}
            <div>
              <Image
                src="/logos/FlexiReviews-white.webp"
                alt="Flexi Reviews"
                width={180}
                height={40}
                sizes="180px"
                className="h-9 w-auto object-contain mb-5"
              />
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Flexi Review, your all-in-one solution for collecting, managing, and showcasing customer testimonials and reviews.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about-us" },
                  { label: "Our Teams", href: "/about-us#team" },
                  { label: "Features", href: "/features" },
                  { label: "Contact Us", href: "/contact-us" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 text-sm hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5">Useful Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Pricing-INR", href: "/pricing" },
                  { label: "Pricing-USD", href: "/pricing?currency=usd" },
                  { label: "Resources", href: "/docs" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms & Condition", href: "/terms" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 text-sm hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-5">Newsletter</h4>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2 max-w-sm"
              >
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-[#17a85c] text-white text-sm font-semibold rounded-lg transition-colors flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white text-sm">
              How can we help?{" "}
              <a href="/contact-us" className="text-primary font-semibold hover:underline">
                Contact us
              </a>
            </p>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs pb-6">
            Copyright © By Flexi Reviews – All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}