"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  Send,
  Clock,
  CalendarCheck,
  LifeBuoy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What are your support hours?",
    a: "Our support team is available during business hours to help with your Flexi Reviews account, setup, integrations, and general questions.",
  },
  {
    q: "Do you provide phone or WhatsApp support?",
    a: "Yes. You can reach our team by phone or WhatsApp during support hours for assistance with your account or any product-related questions.",
  },
  {
    q: "How long does it take to get a response via email?",
    a: "We typically respond to support emails within one business day. Response times may vary depending on the complexity of your request.",
  },
  {
    q: "Can I get help setting up Flexi Reviews?",
    a: "Absolutely. Our team can help you get started with Flexi Reviews, connect your review platforms, and understand the key features available to your business.",
  },
  {
    q: "Can I schedule a demo of Flexi Reviews?",
    a: "Yes. You can schedule a demo with our team to see how Flexi Reviews can help you collect reviews, respond with AI, and showcase your best customer feedback.",
  },
  {
    q: "Where can I get help with my account?",
    a: "For account, billing, technical, or feature-related questions, contact our support team through the contact form or email. We'll help you find the right solution.",
  },
  {
    q: "Do you offer support for integrations?",
    a: "Yes. Our team can help you with supported integrations and guide you through the setup process so you can connect Flexi Reviews with your existing workflow.",
  },
  {
    q: "Can I speak with someone about my business needs?",
    a: "Of course. If you have specific questions about review management or want to understand how Flexi Reviews fits your business, contact our team and we'll be happy to assist.",
  },
];

const channels = [
  {
    icon: Phone,
    title: "Phone",
    value: "+91-722 3030 072",
    hint: "Mon–Sat, business hours",
    href: "tel:+917223030072",
    cta: "Call now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+91-722 3030 072",
    hint: "Fastest for quick questions",
    href: "https://wa.me/917223030072?text=Hi%20Flexi%20Reviews%2C%20I%20need%20help%20with%20my%20account.",
    cta: "Chat now",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@flexireviews.com",
    hint: "Replies within 1 business day",
    href: "mailto:support@flexireviews.com",
    cta: "Write to us",
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-[15px] text-dark placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

export default function ContactClient() {
  const rootRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(5);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".c-hero-anim",
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

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div ref={rootRef as React.RefObject<HTMLDivElement>}>
      {/* ---------- HERO ---------- */}
      <section className="relative px-2.5 sm:px-6 pt-10 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 animate-bg-shift bg-[radial-gradient(600px_320px_at_15%_10%,rgba(27,191,106,0.10),transparent),radial-gradient(700px_360px_at_85%_20%,rgba(27,191,106,0.08),transparent)]" />
        <div className="relative max-w-[1480px] mx-auto px-0 sm:px-5 text-center">
          <span className="c-hero-anim inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-primary-light border border-primary/20 rounded-full px-5 py-2 mb-5">
            CONTACT US
          </span>
          <h1 className="c-hero-anim text-[34px] sm:text-5xl lg:text-6xl font-bold text-dark leading-[1.08] tracking-tight text-balance">
            We&apos;d Love to{" "}
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">
              Hear
            </span>{" "}
            From You
          </h1>
          <p className="c-hero-anim text-gray-500 text-[15px] sm:text-lg max-w-3xl mx-auto mt-5 leading-relaxed">
            Whether you have questions about Flexi Reviews, need help managing your reviews, or want
            to see how our platform can improve your online reputation, our team is here to help.
          </p>
          <div className="c-hero-anim flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-7">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-dark bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              Avg. reply within 1 business day
            </span>
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-dark bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <Clock className="w-4 h-4 text-primary" />
              Business-hours support
            </span>
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-dark bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              Setup + demo help included
            </span>
          </div>
        </div>
      </section>

      {/* ---------- CHANNEL CARDS ---------- */}
      <section className="px-2.5 sm:px-6 pb-4 sm:pb-6">
        <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {channels.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-reveal
                className="group bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 flex items-start gap-4 hover:border-primary/40 hover:shadow-[0_20px_44px_-16px_rgba(27,191,106,0.35)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="w-12 h-12 rounded-2xl bg-primary-subtle flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                  <c.icon className="w-6 h-6" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-bold uppercase tracking-wider text-gray-400">
                    {c.title}
                  </span>
                  <span className="block text-[16px] sm:text-lg font-bold text-dark mt-0.5 break-all">
                    {c.value}
                  </span>
                  <span className="block text-[13px] text-gray-500 mt-1">{c.hint}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-2">
                    {c.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FORM + SIDE PANEL ---------- */}
      <section className="px-2.5 sm:px-6 py-8 sm:py-12">
        <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-5 lg:gap-8 items-start">
            {/* Form card */}
            <div
              data-reveal
              className="bg-white border border-gray-200/80 rounded-[1.75rem] p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_-28px_rgba(30,30,30,0.25)]"
            >
              <div className="flex items-start gap-4 mb-2">
                <span className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25">
                  <Send className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-[22px] sm:text-2xl lg:text-[28px] font-bold text-dark leading-tight">
                    Still Need <span className="text-primary">Help?</span>
                  </h2>
                  <p className="text-gray-500 text-[15px] leading-relaxed mt-1">
                    Have questions about Flexi Reviews or need assistance with your account? Get in
                    touch with our team.
                  </p>
                </div>
              </div>

              {sent ? (
                <div className="mt-8 rounded-2xl bg-primary-light border border-primary/25 p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-dark">Message sent successfully!</h3>
                  <p className="text-gray-600 text-[15px] mt-2 max-w-md mx-auto">
                    Thanks {form.firstName || "there"} — our support team will get back to you
                    within one business day at {form.email || "your email"}.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({
                        firstName: "",
                        lastName: "",
                        email: "",
                        mobile: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-5 text-sm font-semibold text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-dark mb-1.5">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      required
                      value={form.firstName}
                      onChange={update("firstName")}
                      placeholder="First Name"
                      className={inputClass}
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-dark mb-1.5">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      required
                      value={form.lastName}
                      onChange={update("lastName")}
                      placeholder="Last Name"
                      className={inputClass}
                      autoComplete="family-name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-dark mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      placeholder="Email Address"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="mobile" className="block text-sm font-semibold text-dark mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      id="mobile"
                      type="tel"
                      required
                      pattern="[0-9+()\\-\\s]{7,16}"
                      value={form.mobile}
                      onChange={update("mobile")}
                      placeholder="Mobile Number"
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-dark mb-1.5">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      required
                      value={form.subject}
                      onChange={update("subject")}
                      className={`${inputClass} ${form.subject ? "" : "text-gray-400"}`}
                    >
                      <option value="" disabled>
                        Select a topic — e.g. Setup help, Demo, Billing, Integrations
                      </option>
                      <option value="setup">Help setting up Flexi Reviews</option>
                      <option value="demo">Schedule a demo</option>
                      <option value="account">Account / billing question</option>
                      <option value="integrations">Integration support</option>
                      <option value="business">Talk about my business needs</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-dark mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell us how we can help — your business type, platforms you use, and what you'd like to achieve."
                      className={`${inputClass} resize-y min-h-[140px]`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary hover:bg-[#17a85c] text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-[0_8px_24px_-6px_rgba(27,191,106,0.45)] hover:shadow-[0_8px_24px_-6px_rgba(27,191,106,0.6)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Send Message
                      <Send className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-gray-400 mt-3">
                      By submitting, you agree to be contacted about your enquiry. We never share
                      your details.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Side panel */}
            <div className="flex flex-col gap-5">
              <div
                data-reveal
                className="bg-dark text-white rounded-[1.75rem] p-7 sm:p-8 relative overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_240px_at_15%_10%,rgba(27,191,106,0.25),transparent),radial-gradient(420px_260px_at_90%_90%,rgba(27,191,106,0.15),transparent)]" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-primary bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-4">
                    <LifeBuoy className="w-4 h-4" />
                    CONNECT WITH US
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    Connect with the tools you already use — and the team behind them.
                  </h3>
                  <p className="text-gray-400 text-[15px] leading-relaxed mt-3">
                    From onboarding to integrations, we&apos;ll guide you through setup so you can
                    collect reviews, reply with AI, and showcase feedback faster.
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-11 h-11 rounded-full bg-primary flex items-center justify-center hover:bg-[#17a85c] hover:-translate-y-0.5 transition-all"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-11 h-11 rounded-full bg-primary flex items-center justify-center hover:bg-[#17a85c] hover:-translate-y-0.5 transition-all"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-11 h-11 rounded-full bg-primary flex items-center justify-center hover:bg-[#17a85c] hover:-translate-y-0.5 transition-all"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div
                data-reveal
                className="bg-gradient-to-br from-primary-light via-[#f0fdf4] to-white border border-primary/20 rounded-[1.75rem] p-7 sm:p-8"
              >
                <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <CalendarCheck className="w-6 h-6 text-primary" />
                </span>
                <h3 className="text-xl font-bold text-dark">Want a live walkthrough?</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed mt-2">
                  Schedule a demo to see how Flexi Reviews collects reviews, replies with AI, and
                  showcases your best customer feedback.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                  <a
                    href="https://wa.me/917223030072?text=Hi%2C%20I%27d%20like%20a%20demo%20of%20Flexi%20Reviews."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-dark font-semibold text-[15px] px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-all"
                  >
                    WhatsApp Us
                  </a>
                </div>
                <div className="flex items-center gap-2.5 mt-5 pt-5 border-t border-primary/15 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  Support available during business hours · Email replies within 1 business day
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="px-2.5 sm:px-6 py-10 sm:py-16 bg-gradient-to-b from-white via-primary-light/40 to-white">
        <div className="max-w-[1100px] mx-auto px-0 sm:px-5">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span
              data-reveal
              className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-white border border-primary/20 rounded-full px-5 py-2 mb-5 shadow-sm"
            >
              FAQS
            </span>
            <h2 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight tracking-tight">
              Need Help <span className="text-primary">Right Now?</span>
            </h2>
            <p data-reveal className="text-gray-500 text-base sm:text-lg mt-4 leading-relaxed">
              Check out our FAQs or reach out to our support team for help with Flexi Reviews.
              We&apos;re here to help you get the most out of your review management experience.
            </p>
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
                    <span className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-9 h-9 rounded-xl hidden sm:flex items-center justify-center flex-shrink-0 text-sm font-extrabold transition-colors ${
                          open ? "bg-primary text-white" : "bg-primary-light text-primary"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] sm:text-[17px] font-bold text-dark leading-snug">
                        {f.q}
                      </span>
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
                      <p className="px-5 sm:px-6 sm:pl-[68px] pb-5 sm:pb-6 text-gray-500 text-[15px] leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p data-reveal className="text-center text-gray-500 text-[15px] mt-8">
            Still stuck?{" "}
            <a href="mailto:support@flexireviews.com" className="text-primary font-semibold hover:underline">
              Email support@flexireviews.com
            </a>{" "}
            or{" "}
            <a
              href="https://wa.me/917223030072"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
