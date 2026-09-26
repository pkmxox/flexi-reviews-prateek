"use client";

import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  Star,
  ChevronDown,
  ArrowRight,
  CreditCard,
  Clock,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Currency = "INR" | "USD";
type Billing = "monthly" | "yearly";

/* ---------------- Price matrix (approved figures) ---------------- */
const PRICES: Record<Currency, Record<Billing, [number, number, number]>> = {
  INR: { monthly: [2499, 4999, 7999], yearly: [20000, 50000, 75000] },
  USD: { monthly: [29, 59, 99], yearly: [290, 590, 999] },
};

function formatPrice(currency: Currency, value: number) {
  if (currency === "INR") return `₹${value.toLocaleString("en-IN")}`;
  return `$${value.toLocaleString("en-US")}`;
}

/* ---------------- Tiers (verbatim feature lists) ---------------- */
const tiers = [
  {
    name: "Starter",
    badge: "bg-orange-100 text-orange-500",
    card: "bg-white",
    features: [
      "1 Business Location",
      "1 User",
      "Smart Reviews Filter",
      "AI Review Assistant",
      "Auto-Responding",
      "100 Email invites",
      "5 Widgets Creating",
      "Allow Social Sharing",
      "5 Feedback Form",
      "Enable QR Codes",
      "5 Review Source",
      "Self Service",
    ],
  },
  {
    name: "Professional",
    badge: "bg-emerald-100 text-emerald-600",
    card: "popular",
    features: [
      "10 Business Location",
      "5 User",
      "Smart Reviews Filter",
      "AI Review Assistant",
      "Auto-Responding",
      "300 Email invites",
      "150 SMS invites",
      "Unlimited Widgets Creating",
      "Allow Social Sharing",
      "Unlimited Feedback Form",
      "Enable QR Codes",
      "Review Source Limit",
      "Video Review Requests",
      "Self Service",
    ],
  },
  {
    name: "Enterprise",
    badge: "bg-sky-100 text-emerald-500",
    card: "bg-white",
    features: [
      "10 Business Location",
      "5 User",
      "Smart Reviews Filter",
      "AI Review Assistant",
      "Auto-Responding",
      "900 Email invites",
      "300 SMS invites",
      "Unlimited Widgets Creating",
      "Allow Social Sharing",
      "Unlimited Feedback Form",
      "Enable QR Codes",
      "Review Source Limit",
      "Video Review Requests",
      "Done For You",
    ],
  },
];

const logos = [
  { src: "/logos/google.svg", alt: "Google", cls: "h-7" },
  { src: "/logos/facebook.svg", alt: "Facebook", cls: "h-7" },
  { src: "/logos/amazon.png", alt: "Amazon", cls: "h-6" },
  { src: "/logos/tripadvisor.svg", alt: "Tripadvisor", cls: "h-7" },
  { src: "/logos/zomato.svg", alt: "Zomato", cls: "h-6" },
  { src: "/logos/justdial.svg", alt: "Justdial", cls: "h-7" },
];

const testimonials = [
  {
    n: "Rahul Sharma",
    r: "Sharma Electronics",
    t: "We went from 40 to 400+ Google reviews in three months. The QR codes at billing made all the difference.",
  },
  {
    n: "Priya Nair",
    r: "Café Brew House",
    t: "The AI replies save me an hour every day, and customers keep mentioning how loved our responses feel.",
  },
  {
    n: "Amit Patel",
    r: "Patel Dental Care",
    t: "Our rating climbed from 4.1 to 4.8. New patients tell us they picked us because of our reviews.",
  },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes. Every plan starts with a 14-day free trial — no credit card required. You get full access to your plan's features so you can see real results before paying anything.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Monthly plans can be cancelled anytime with no lock-in, and yearly plans come with our standard cancellation terms. Your reviews and data stay safe with you.",
  },
  {
    q: "Can I upgrade or downgrade my plan later?",
    a: "Yes. You can move between Starter, Professional and Enterprise at any time, and switch between monthly and yearly billing. Changes apply from your next billing cycle.",
  },
  {
    q: "What is the difference between Self Service and Done For You?",
    a: "Self Service gives you the full platform to run everything yourself. Done For You (Enterprise) means our team handles setup, GMB optimization, campaigns and weekly posting for you — just share your business details.",
  },
  {
    q: "Do I get an invoice for billing (INR)?",
    a: "Yes. Indian businesses receive GST-compliant invoices for every payment, suitable for your accounting and tax filing.",
  },
  {
    q: "What kind of support is included?",
    a: "Every plan includes support during business hours by phone, WhatsApp and email (replies within one business day), plus help with setup and integrations.",
  },
];

function InfiniteMarquee({ children }: { children: ReactNode }) {
  const copies = [0, 1, 2].map((copy) =>
    Children.map(children, (child, i) =>
      isValidElement(child) ? cloneElement(child, { key: `${copy}-${i}` }) : child
    )
  );
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee gap-8 sm:gap-12 items-center py-2 group-hover:[animation-play-state:paused]">
        {copies}
      </div>
    </div>
  );
}

/* Coral pill toggle (matches design mockup) */
function PillToggle<T extends string>({
  options,
  value,
  onChange,
  labels,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  labels: Record<T, string>;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[#EEF4F3] p-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={`rounded-full px-6 sm:px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${
            value === opt
              ? "bg-[#F2815A] text-white shadow-md scale-[1.02]"
              : "text-dark hover:text-primary"
          }`}
        >
          {labels[opt]}
        </button>
      ))}
    </div>
  );
}

export default function PricingClient({ initialCurrency }: { initialCurrency: Currency }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [currency, setCurrency] = useState<Currency>(initialCurrency);
  const [billing, setBilling] = useState<Billing>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".p-hero-anim",
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

  const caption = billing === "monthly" ? "/per month" : "/per year";

  return (
    <div ref={rootRef}>
      {/* ---------- HERO ---------- */}
      <section className="relative px-2.5 sm:px-6 pt-10 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 animate-bg-shift bg-[radial-gradient(600px_320px_at_15%_10%,rgba(27,191,106,0.10),transparent),radial-gradient(700px_360px_at_85%_20%,rgba(27,191,106,0.08),transparent)]" />
        <div className="relative max-w-[1480px] mx-auto px-0 sm:px-5 text-center">
          <h1 className="p-hero-anim text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F2A3C] leading-[1.08] tracking-tight">
            Plans &amp; Pricing
          </h1>
          <p className="p-hero-anim text-gray-500 text-base sm:text-lg max-w-3xl mx-auto mt-5 leading-relaxed">
            We offer flexible pricing plans designed to meet the needs of businesses of all sizes.
            Whether you&apos;re just starting out or looking to scale your review management, we
            have the perfect solution for you.
          </p>
          <div className="p-hero-anim flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6">
            {[
              { icon: CreditCard, text: "No credit card required" },
              { icon: Clock, text: "14-day free trial" },
              { icon: ShieldCheck, text: "Cancel anytime" },
            ].map((b) => (
              <span
                key={b.text}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-dark bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm"
              >
                <b.icon className="w-4 h-4 text-primary" />
                {b.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STICKY MINI BAR (currency + billing always in reach) ---------- */}
      <div className="sticky top-16 sm:top-20 z-40 px-2.5 sm:px-6 py-2.5 bg-white/80 backdrop-blur-xl border-y border-gray-100">
        <div className="max-w-[1480px] mx-auto px-0 sm:px-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-1 rounded-full bg-dark p-1">
            {(["INR", "USD"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                aria-pressed={currency === c}
                className={`rounded-full px-5 py-1.5 text-[13px] font-bold transition-all duration-300 ${
                  currency === c ? "bg-primary text-white shadow" : "text-gray-400 hover:text-white"
                }`}
              >
                {c === "INR" ? "INR ₹" : "USD $"}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-[#EEF4F3] p-1">
            {(["monthly", "yearly"] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                aria-pressed={billing === b}
                className={`rounded-full px-5 py-1.5 text-[13px] font-semibold capitalize transition-all duration-300 ${
                  billing === b ? "bg-[#F2815A] text-white shadow" : "text-dark hover:text-primary"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- PARENT TABS + CHILD TABS + CARDS ---------- */}
      <section className="px-2.5 sm:px-6 py-8 sm:py-12">
        <div className="max-w-[1200px] mx-auto px-0 sm:px-5">
          {/* Parent tabs: currency */}
          <div data-reveal className="flex justify-center mb-6">
            <PillToggle<Currency>
              options={["INR", "USD"]}
              value={currency}
              onChange={setCurrency}
              labels={{ INR: "INR ₹", USD: "USD $" }}
            />
          </div>
          {/* Child tabs: billing */}
          <div data-reveal className="flex justify-center mb-10">
            <PillToggle<Billing>
              options={["monthly", "yearly"]}
              value={billing}
              onChange={setBilling}
              labels={{ monthly: "Monthly", yearly: "Yearly" }}
            />
          </div>

          <div
            key={`${currency}-${billing}`}
            className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-start"
          >
            {tiers.map((tier, i) => {
              const price = PRICES[currency][billing][i];
              const popular = tier.card === "popular";
              return (
                <article
                  key={tier.name}
                  className={`relative rounded-3xl border p-7 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 ${
                    popular
                      ? "bg-dark text-white border-primary/50 shadow-[0_32px_64px_-24px_rgba(27,191,106,0.5)] lg:scale-[1.04] z-10"
                      : "bg-white border-gray-200/80 hover:border-primary/30 hover:shadow-[0_24px_48px_-20px_rgba(30,30,30,0.2)]"
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-widest text-white bg-primary rounded-full px-4 py-1.5 shadow-lg shadow-primary/40 whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  <span
                    className={`mx-auto text-sm font-semibold rounded-full px-6 py-2 mb-5 ${tier.badge}`}
                  >
                    {tier.name}
                  </span>
                  <p
                    className={`text-center text-[44px] sm:text-5xl font-extrabold leading-none tracking-tight ${
                      popular ? "text-white" : "text-[#0F2A3C]"
                    }`}
                  >
                    {formatPrice(currency, price)}
                  </p>
                  <p
                    className={`text-center text-[15px] mt-2.5 ${
                      popular ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {caption}
                  </p>
                  <hr
                    className={`my-6 ${popular ? "border-white/15" : "border-gray-200"}`}
                  />
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            popular ? "text-primary" : "text-dark"
                          }`}
                          strokeWidth={2.5}
                        />
                        <span
                          className={`text-[15px] leading-snug ${
                            popular ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={`mt-7 inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-6 py-3.5 rounded-xl transition-all duration-300 w-full ${
                      popular
                        ? "bg-primary hover:bg-[#17a85c] text-white shadow-[0_8px_24px_-6px_rgba(27,191,106,0.6)] hover:-translate-y-0.5"
                        : "bg-[#0F2A3C] hover:bg-dark text-white hover:-translate-y-0.5"
                    }`}
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              );
            })}
          </div>
          <p data-reveal className="text-center text-sm text-gray-400 mt-8">
            Prices {currency === "INR" ? "in INR, GST invoice included" : "in USD"} · Switch
            tabs to compare billing periods · All plans start with a 14-day free trial
          </p>
        </div>
      </section>

      {/* ---------- LOGO MARQUEE (from Home) ---------- */}
      <section className="pb-8 sm:pb-12 px-2.5 sm:px-6 bg-white">
        <div className="max-w-[1480px] mx-auto px-0 sm:px-5 text-center">
          <p data-reveal className="font-bold text-dark text-[15px] sm:text-lg mb-6">
            Loved by 10,000+ local businesses on 60+ platforms
          </p>
          <div data-reveal>
            <InfiniteMarquee>
              {logos.map((l) => (
                <Image
                  key={l.alt}
                  src={l.src}
                  alt={l.alt}
                  width={140}
                  height={40}
                  className={`${l.cls} w-auto object-contain flex-shrink-0`}
                />
              ))}
            </InfiniteMarquee>
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS (from Home/Features) ---------- */}
      <section className="pb-12 sm:pb-16 px-2.5 sm:px-6 bg-white">
        <div className="max-w-[1200px] mx-auto px-0 sm:px-5 text-center">
          <h2 data-reveal className="text-[26px] sm:text-4xl font-bold text-dark mb-2">
            What Our{" "}
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">
              Customer Says
            </span>
          </h2>
          <p data-reveal className="text-sm text-gray-500 mb-8 flex items-center justify-center gap-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            5.0 based on 2,356 Google reviews
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {testimonials.map((x) => (
              <div
                key={x.n}
                data-reveal
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-[0_20px_44px_-16px_rgba(27,191,106,0.3)] hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-4">&ldquo;{x.t}&rdquo;</p>
                <p className="text-sm font-bold text-dark">{x.n}</p>
                <p className="text-xs text-gray-500">{x.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRICING FAQ ---------- */}
      <section className="px-2.5 sm:px-6 py-10 sm:py-16 bg-gradient-to-b from-white via-primary-light/40 to-white">
        <div className="max-w-[1100px] mx-auto px-0 sm:px-5">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span
              data-reveal
              className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-white border border-primary/20 rounded-full px-5 py-2 mb-5 shadow-sm"
            >
              PRICING FAQS
            </span>
            <h2
              data-reveal
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight tracking-tight"
            >
              Questions, <span className="text-primary">answered</span>
            </h2>
          </div>
          <div className="space-y-3.5">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  data-reveal
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                    open
                      ? "border-primary/40 shadow-[0_16px_32px_-16px_rgba(27,191,106,0.35)]"
                      : "border-gray-200 hover:border-primary/30"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                  >
                    <span className="text-[15px] sm:text-[17px] font-bold text-dark leading-snug">
                      {f.q}
                    </span>
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
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-500 text-[15px] leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
