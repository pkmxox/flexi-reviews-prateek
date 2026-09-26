"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DoneForYou from "../../components/DoneForYou";
import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronDown,
  Dumbbell,
  Globe,
  GraduationCap,
  PartyPopper,
  Scissors,
  Star,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  UtensilsCrossed,
  Zap,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Local marquee (same pattern as homepage-2) ---------- */
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

/* ---------- Animated counter ---------- */
function CountUp({ end, duration = 1600 }: { end: number; duration?: number }) {
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
          setValue(Math.round(eased * end));
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
  }, [end, duration]);

  return <span ref={ref}>{value}</span>;
}

/* ---------- Data (copy kept verbatim from design mockup) ---------- */
const stats: { icon: LucideIcon; display: string; numeric: number; delta: string }[] = [
  { icon: Globe, display: "25+", numeric: 25, delta: "Review platforms" },
  { icon: Star, display: "5-star", numeric: 5, delta: "Average outcomes" },
  { icon: TrendingUp, display: "90%+", numeric: 90, delta: "Response coverage" },
];

const accordions = [
  {
    id: "mission",
    title: "Our Mission",
    body: "We're making it easier for local businesses to collect genuine customer feedback, build a strong online reputation, and turn happy customers into loyal advocates.",
  },
  {
    id: "started",
    title: "Why We Started",
    body: "We watched great local businesses lose customers to competitors with better reviews — not better service. Flexi Reviews started to level the playing field for every local business.",
  },
  {
    id: "believe",
    title: "What We Believe",
    body: "Every customer experience is an opportunity to build trust. Honest feedback, handled with care and powered by smart AI, turns happy customers into your strongest growth channel.",
  },
];

const industries: { icon: LucideIcon; label: string }[] = [
  { icon: Stethoscope, label: "Clinic" },
  { icon: UtensilsCrossed, label: "Restaurant" },
  { icon: Dumbbell, label: "Gym" },
  { icon: Scissors, label: "Salon" },
  { icon: PartyPopper, label: "Wedding & Event" },
  { icon: GraduationCap, label: "Coaching" },
];

const tools = [
  { src: "/logos/justdial.svg", alt: "Justdial", height: "h-8", label: "Justdial" },
  { src: "/logos/Shopify-Bag.svg", alt: "Shopify", height: "h-7", label: "Shopify" },
  { src: "/logos/woocommerce.svg", alt: "WooCommerce", height: "h-8", label: "WooCommerce" },
  { src: "/logos/App-Store.svg", alt: "App Store", height: "h-7", label: "App Store" },
  { src: "/logos/stripe-icon.svg", alt: "Stripe", height: "h-8", label: "Stripe" },
];

const relatedPages = [
  {
    icon: Users,
    title: "Our Team",
    desc: "Say hello to the people turning customer feedback into growth stories every day.",
    href: "/about-us/team",
  },
  {
    icon: Target,
    title: "Our Mission",
    desc: "Discover the purpose behind everything we build for local businesses.",
    href: "/about-us/mission",
  },
];

export default function About() {
  const [openAccordion, setOpenAccordion] = useState<string | null>("mission");

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.from("[data-hero]", {
        y: 44,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });

      /* Scroll reveals for every section */
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />

      <main className="bg-white overflow-x-clip">
        {/* ================= HERO ================= */}
        <section className="relative px-2.5 sm:px-6 pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-14">
          <div className="pointer-events-none absolute inset-0 animate-bg-shift bg-[radial-gradient(600px_320px_at_15%_10%,rgba(27,191,106,0.10),transparent),radial-gradient(700px_360px_at_85%_20%,rgba(27,191,106,0.08),transparent)]" />
          <div className="relative max-w-[1480px] mx-auto px-0 sm:px-5 text-center">
            <span
              data-hero
              className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-primary-light border border-primary/20 rounded-full px-5 py-2 mb-5"
            >
              ABOUT FLEXI REVIEWS
            </span>
            <h1 data-hero className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-[1.08] tracking-tight">
              We Help Businesses
              <br />
              Turn Feedback
              <br />
              <span className="text-primary">Into Growth.</span>
            </h1>
            <p data-hero className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
              Collect More Reviews reply with AI, showcase everywhere and turn feedback into real business growth
            </p>
            <div data-hero className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
              <a
                href="https://app.flexireviews.in/signup"
                className="inline-flex items-center gap-2 bg-primary hover:bg-[#17a85c] text-white font-semibold text-base sm:text-lg px-8 py-3.5 rounded-xl shadow-[0_8px_24px_-6px_rgba(27,191,106,0.45)] hover:shadow-[0_8px_24px_-6px_rgba(27,191,106,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto justify-center"
              >
                Start a 14 day free trial
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/features"
                className="inline-flex items-center justify-center gap-2 bg-white text-dark font-semibold text-base sm:text-lg px-8 py-3.5 rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
              >
                See How It Works
              </Link>
            </div>

            {/* Hero visual — desktop / mobile variants */}
            <div data-hero className="relative mt-10 sm:mt-14 max-w-5xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 rounded-[2.5rem] blur-2xl" />
              <Image
                src="/about/aboutus1.webp"
                alt="Local businesses growing with Flexi Reviews"
                width={1402}
                height={1122}
                priority
                className="relative hidden md:block w-full h-auto rounded-[2rem] shadow-[0_32px_64px_-24px_rgba(27,191,106,0.35)] border border-gray-100"
              />
              <Image
                src="/about/aboutus2.webp"
                alt="Clinics, restaurants, gyms, salons and more growing with Flexi Reviews"
                width={941}
                height={1672}
                priority
                className="relative md:hidden w-full h-auto rounded-[1.75rem] shadow-[0_32px_64px_-24px_rgba(27,191,106,0.35)] border border-gray-100"
              />
              {/* Floating cards: stacked in-flow on mobile, floating absolute on sm+ (homepage-2 pattern) */}
              <div className="mt-4 flex flex-col gap-3 sm:contents">
                <div className="relative sm:absolute sm:top-8 sm:left-2 lg:left-6 bg-white rounded-2xl shadow-xl p-4 sm:p-5 border-2 border-primary/20 w-full sm:w-auto max-w-[340px] mx-auto animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-base sm:text-lg font-extrabold text-dark leading-none">5-Star Rating</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Loved by local businesses</p>
                    </div>
                  </div>
                </div>
                <div
                  className="relative sm:absolute sm:bottom-10 sm:right-2 lg:right-6 bg-dark text-white rounded-2xl shadow-xl p-4 sm:p-5 border-2 border-primary/30 w-full sm:w-auto max-w-[340px] mx-auto animate-float"
                  style={{ animationDelay: "1.2s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-base sm:text-lg font-extrabold leading-none">60+ Platforms</p>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">Showcase everywhere</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INTRO + STATS ================= */}
        <section className="px-2.5 sm:px-6 py-10 sm:py-16">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5 text-center">
            <span
              data-reveal
              className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-primary-light border border-primary/20 rounded-full px-5 py-2 mb-5"
            >
              BUILT FOR LOCAL BUSINESSES
            </span>
            <h2 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight tracking-tight">
              We&apos;re Building for
              <br className="sm:hidden" /> Businesses That Want
              <br />
              to <span className="text-primary">Grow</span>
            </h2>
            <p data-reveal className="text-gray-500 text-base sm:text-lg max-w-3xl mx-auto mt-5 leading-relaxed">
              Great businesses deserve to be seen, trusted, and remembered. Flexi Reviews helps local businesses
              collect genuine customer feedback, turn happy customers into 5-star reviews, and build a stronger
              online reputation—without the complexity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-14 max-w-4xl mx-auto text-left">
              {stats.map((stat) => (
                <div
                  key={stat.display}
                  data-reveal
                  className="rounded-2xl border border-gray-200/70 bg-gray-50/50 p-5 flex items-start gap-4 hover:shadow-[0_20px_40px_-16px_rgba(27,191,106,0.35)] hover:border-primary/30 hover:-translate-y-1.5 transition-all duration-300"
                >
                  <span className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-gray-500 leading-tight">{stat.delta}</p>
                    <p className="text-[26px] font-extrabold text-dark mt-0.5 leading-none">
                      {stat.display === "5-star" ? (
                        <>
                          <CountUp end={stat.numeric} />-star
                        </>
                      ) : stat.display === "90%+" ? (
                        <>
                          <CountUp end={stat.numeric} />%+
                        </>
                      ) : (
                        <>
                          <CountUp end={stat.numeric} />+
                        </>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      AI writes reviews &amp; replies so you save hours.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="px-2.5 sm:px-6 py-10 sm:py-16 bg-gradient-to-b from-white via-primary-light/40 to-white">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center max-w-3xl mx-auto">
              <h2 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight tracking-tight">
                Built to help businesses
                <br />
                turn feedback into <span className="text-primary">growth</span>
              </h2>
              <p data-reveal className="text-gray-500 text-base sm:text-lg mt-5 leading-relaxed">
                We believe every customer experience is an opportunity to build trust, strengthen your reputation,
                and grow your business.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10 mt-10 sm:mt-14">
              {/* Accordions */}
              <div className="flex-1 min-w-0 space-y-4">
                {accordions.map((item) => {
                  const open = openAccordion === item.id;
                  return (
                    <div
                      key={item.id}
                      data-reveal
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        open
                          ? "border-primary/40 shadow-[0_16px_32px_-16px_rgba(27,191,106,0.35)]"
                          : "border-gray-200 hover:border-primary/30"
                      }`}
                    >
                      <button
                        onClick={() => setOpenAccordion(open ? null : item.id)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="text-base sm:text-lg font-bold text-dark">{item.title}</span>
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            open ? "bg-primary text-white rotate-180" : "bg-primary-light text-primary"
                          }`}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </span>
                      </button>
                      <div
                        className="grid transition-all duration-300 ease-in-out"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 text-gray-500 text-[15px] leading-relaxed">{item.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dashboard visual with floating metric cards */}
              <div data-reveal className="flex-1 min-w-0 flex items-center">
                <div className="relative w-full">
                  <Image
                    src="/about/aboutus3.webp"
                    alt="Flexi Reviews dashboard with filters and 200+ review sources"
                    width={598}
                    height={360}
                    className="relative w-full h-auto rounded-[1.75rem] border border-gray-100 shadow-[0_24px_48px_-20px_rgba(30,30,30,0.25)] animate-float-soft"
                  />
                  {/* Floating metric cards: stacked in-flow on mobile, floating absolute on sm+ */}
                  <div className="mt-4 flex flex-col gap-3 sm:contents">
                    <div className="relative sm:absolute sm:-top-7 sm:-right-2 lg:-right-5 bg-white rounded-2xl shadow-xl p-4 border-2 border-primary/20 w-full sm:w-auto max-w-[300px] mx-auto animate-float">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-primary-subtle rounded-xl flex items-center justify-center flex-shrink-0">
                          <Zap className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-left min-w-0">
                          <p className="text-base font-extrabold text-dark leading-none">200+ sources</p>
                          <p className="text-xs text-gray-500 mt-1">Collect reviews everywhere</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="relative sm:absolute sm:-bottom-7 sm:-left-2 lg:-left-5 bg-white rounded-2xl shadow-xl p-4 border-2 border-primary/20 w-full sm:w-auto max-w-[300px] mx-auto animate-float"
                      style={{ animationDelay: "1.4s" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="text-left min-w-0">
                          <p className="text-base font-extrabold leading-none">
                            <span className="inline-block bg-gradient-to-r from-emerald-600 via-primary to-emerald-700 bg-clip-text text-transparent">
                              +47% more reviews
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Average increase in 90 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INTEGRATIONS + INDUSTRIES (homepage-2 bottom carousels) ================= */}
        <section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-white relative overflow-hidden">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-14">
              <span
                data-reveal
                className="inline-block text-[12px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-4 py-1.5 mb-6"
              >
                Integrations
              </span>
              <h2 data-reveal className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-6">
                Connect with the tools{" "}
                <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">
                  you already use
                </span>
              </h2>
            </div>
            <div data-reveal className="carousel-row mb-16 lg:mb-20">
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
                      className={`${tool.height} w-auto object-contain`}
                    />
                    <span className="text-xs font-semibold text-dark">{tool.label}</span>
                  </div>
                ))}
              </InfiniteMarquee>
            </div>

            <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-14">
              <h2 data-reveal className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-6">
                Built for{" "}
                <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">
                  every industry
                </span>
              </h2>
            </div>
            <div data-reveal className="carousel-row">
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

        {/* ================= RELATED PAGES — INVITATION ================= */}
        <section className="px-2.5 sm:px-6 py-10 sm:py-16">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-dark text-white px-8 sm:px-12 lg:px-16 py-12 lg:py-16">
              <div className="pointer-events-none absolute inset-0 animate-bg-shift bg-[radial-gradient(500px_280px_at_12%_15%,rgba(27,191,106,0.22),transparent),radial-gradient(600px_320px_at_88%_85%,rgba(27,191,106,0.14),transparent)]" />
              <div className="relative text-center max-w-2xl mx-auto">
                <span
                  data-reveal
                  className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-primary/15 border border-primary/30 rounded-full px-5 py-2 mb-5"
                >
                  YOU&apos;RE INVITED
                </span>
                <h2 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  There&apos;s more to our story —
                  <br />
                  come take a look inside
                </h2>
                <p data-reveal className="text-gray-400 text-base sm:text-lg mt-5 leading-relaxed">
                  Before you go, step into the two pages that say it best — meet the team behind Flexi Reviews,
                  and see the mission that drives everything we build.
                </p>
              </div>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-10 max-w-3xl mx-auto">
                {relatedPages.map((page) => (
                  <Link
                    key={page.title}
                    href={page.href}
                    data-reveal
                    className="group/card text-left bg-white/[0.06] border border-white/10 rounded-3xl p-7 sm:p-8 overflow-hidden relative hover:bg-white/[0.09] hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/20 blur-2xl group-hover/card:bg-primary/30 transition-colors duration-300" />
                    <span className="relative w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-5">
                      <page.icon className="w-6 h-6 text-primary" />
                    </span>
                    <h3 className="relative text-xl sm:text-2xl font-bold mb-2">{page.title}</h3>
                    <p className="relative text-gray-400 text-sm leading-relaxed mb-5">{page.desc}</p>
                    <span className="relative inline-flex items-center gap-2 text-primary font-semibold text-sm">
                      Step in
                      <ArrowRight className="w-4 h-4 group-hover/card:translate-x-1.5 transition-transform duration-300" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA (Done for You Service) ================= */}
        <DoneForYou />
      </main>

      <Footer />
    </>
  );
}
