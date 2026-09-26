"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  QrCode,
  Bot,
  MapPin,
  LayoutList,
  ArrowRight,
  ArrowLeft,
  Star,
  Users,
  Quote,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Animated counter (supports decimals) ---------- */
function CountUp({
  end,
  decimals = 0,
  duration = 1600,
}: {
  end: number;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(+(eased * end).toFixed(decimals));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, decimals, duration]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

/* ---------- Mission in action: each product pillar, framed as mission outcome ---------- */
const pillars: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  {
    icon: QrCode,
    title: "Every voice gets heard",
    desc: "QR codes, links, WhatsApp, SMS and email — collecting becomes effortless, so no happy customer goes unheard.",
    href: "/features#collect",
  },
  {
    icon: Bot,
    title: "Replies with heart, in seconds",
    desc: "AI writes and replies so busy owners save hours — while every customer still feels personally answered.",
    href: "/features#ai",
  },
  {
    icon: MapPin,
    title: "Great businesses get found",
    desc: "Local SEO, Maps and multi-location tools — so the best service in town also ranks first in town.",
    href: "/features#visibility",
  },
  {
    icon: LayoutList,
    title: "Trust turns into revenue",
    desc: "Widgets, websites and CRM — showcasing reviews where buying decisions happen.",
    href: "/features#convert",
  },
];

const stats: { value: number; decimals: number; prefix: string; suffix: string; label: string }[] = [
  { value: 60, decimals: 0, prefix: "", suffix: "+", label: "Review platforms supported" },
  { value: 2.4, decimals: 1, prefix: "", suffix: "M+", label: "Reviews collected" },
  { value: 25, decimals: 0, prefix: "", suffix: "K+", label: "Businesses growing" },
  { value: 0.8, decimals: 1, prefix: "+", suffix: "★", label: "Average rating boost" },
];

export default function MissionClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".m-hero-anim",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 }
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* ---------- HERO ---------- */}
      <section className="relative px-2.5 sm:px-6 pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 animate-bg-shift bg-[radial-gradient(600px_320px_at_15%_10%,rgba(27,191,106,0.10),transparent),radial-gradient(700px_360px_at_85%_20%,rgba(27,191,106,0.08),transparent)]" />
        <div className="relative max-w-[1480px] mx-auto px-0 sm:px-5 text-center">
          <Link
            href="/about-us"
            className="m-hero-anim inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-primary transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to About Us
          </Link>
          <div>
            <span className="m-hero-anim inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-primary-light border border-primary/20 rounded-full px-5 py-2 mb-5">
              OUR MISSION
            </span>
          </div>
          <h1 className="m-hero-anim text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-[1.08] tracking-tight text-balance">
            Every Customer Experience
            <br />
            Is a Chance to <span className="text-primary">Build Trust.</span>
          </h1>
          <p className="m-hero-anim text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            Flexi Reviews exists so great local businesses get the reputation they deserve —
            turning honest feedback into 5-star reviews, loyal customers, and real growth.
          </p>
          {/* Quiet in-content actions: secondary treatment, team link stays textual */}
          <div className="m-hero-anim flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              href="/features"
              className="inline-flex items-center justify-center gap-2 bg-white text-dark font-semibold text-base sm:text-lg px-8 py-3.5 rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
            >
              See How It Works
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about-us/team"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary hover:underline px-2 py-2"
            >
              Meet the people behind it
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- MISSION STATEMENT ---------- */}
      <section className="px-2.5 sm:px-6 py-10 sm:py-16">
        <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
          <div
            data-reveal
            className="relative max-w-4xl mx-auto text-center bg-gradient-to-br from-primary-light via-[#f0fdf4] to-white border border-primary/20 rounded-[2rem] px-8 sm:px-12 lg:px-16 py-12 lg:py-14 overflow-hidden"
          >
            <Quote className="w-10 h-10 text-primary/30 mx-auto mb-5" />
            <p className="text-xl sm:text-2xl lg:text-[28px] font-bold text-dark leading-snug text-balance">
              “We watched great local businesses lose customers to competitors with better reviews
              — not better service. We started Flexi Reviews to level that playing field.”
            </p>
            <p className="text-gray-500 text-base sm:text-lg mt-6 leading-relaxed max-w-2xl mx-auto">
              Every review collected, every reply written, every widget showcased — it all serves
              one purpose: helping businesses that do good work get seen, trusted, and remembered.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- MISSION IN ACTION ---------- */}
      <section className="px-2.5 sm:px-6 py-10 sm:py-16 bg-gradient-to-b from-white via-primary-light/40 to-white">
        <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span
              data-reveal
              className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-white border border-primary/20 rounded-full px-5 py-2 mb-5 shadow-sm"
            >
              MISSION IN ACTION
            </span>
            <h2
              data-reveal
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight tracking-tight"
            >
              How our product <span className="text-primary">lives the mission</span>
            </h2>
            <p data-reveal className="text-gray-500 text-base sm:text-lg mt-4 leading-relaxed">
              Four promises, built into every feature we ship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {pillars.map((p) => (
              <article
                key={p.title}
                data-reveal
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 hover:shadow-[0_20px_44px_-16px_rgba(27,191,106,0.35)] hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <span className="w-12 h-12 rounded-2xl bg-primary-subtle flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                  <p.icon className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-dark leading-snug mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{p.desc}</p>
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-4 hover:underline"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- IMPACT STATS ---------- */}
      <section className="px-2.5 sm:px-6 py-10 sm:py-16">
        <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2
              data-reveal
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight tracking-tight"
            >
              The mission, <span className="text-primary">measured</span>
            </h2>
            <p data-reveal className="text-gray-500 text-base sm:text-lg mt-4 leading-relaxed">
              Numbers that show what happens when local businesses get the reputation they deserve.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                data-reveal
                className="rounded-2xl border border-gray-200/70 bg-gray-50/50 p-5 sm:p-6 text-center hover:shadow-[0_20px_40px_-16px_rgba(27,191,106,0.35)] hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-[28px] sm:text-4xl font-extrabold text-dark leading-none">
                  {s.prefix}
                  <CountUp end={s.value} decimals={s.decimals} />
                  {s.suffix}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Single quiet testimonial */}
          <div
            data-reveal
            className="max-w-3xl mx-auto mt-10 sm:mt-12 bg-white border border-gray-100 rounded-2xl p-7 sm:p-8 shadow-sm text-center"
          >
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-[16px] sm:text-lg text-gray-600 leading-relaxed">
              “We went from 40 to 400+ Google reviews in three months. The QR codes at billing made
              all the difference.”
            </p>
            <p className="text-sm font-bold text-dark mt-4">Rahul Sharma</p>
            <p className="text-xs text-gray-500">Owner, Sharma Electronics</p>
          </div>

          {/* Slim cross-link to team — textual, not a loud CTA */}
          <div data-reveal className="max-w-3xl mx-auto mt-8">
            <Link
              href="/about-us/team"
              className="group flex items-center gap-4 bg-dark text-white rounded-2xl p-5 sm:p-6 hover:border-primary/40 transition-all duration-300"
            >
              <span className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </span>
              <span className="flex-1 min-w-0 text-left">
                <span className="block font-bold text-[16px]">The mission is carried by people</span>
                <span className="block text-sm text-gray-400">
                  Meet the team turning feedback into growth stories.
                </span>
              </span>
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
