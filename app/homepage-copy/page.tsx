"use client";

import Header from "../components/Header";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "../components/ui/Button";
import { QrCode, Bot, LayoutList, BarChart3, Megaphone, Globe, CreditCard, Clock, ShieldCheck, Pencil, MessagesSquare, PieChart } from "lucide-react";

const logos = [
  { src: "/logos/google.svg", alt: "Google", height: "h-7" },
  { src: "/logos/facebook.svg", alt: "Facebook", height: "h-7" },
  { src: "/logos/amazon.png", alt: "Amazon", height: "h-6" },
  { src: "/logos/tripadvisor.svg", alt: "Tripadvisor", height: "h-7" },
  { src: "/logos/zomato.svg", alt: "Zomato", height: "h-6" },
  { src: "/logos/justdial.svg", alt: "Justdial", height: "h-7" },
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
    img: "/homepage/IMG-1.png",
    desc: "Customer scans QR or opens your link.",
  },
  {
    num: 2,
    title: "Answer few Questions",
    img: "/homepage/IMG-2.png",
    desc: "Quick questions about their experience.",
  },
  {
    num: 3,
    title: "AI Creates Review",
    img: "/homepage/IMG-3.png",
    desc: "AI writes a natural, authentic review.",
  },
  {
    num: 4,
    title: "Publish Anywhere",
    img: "/homepage/IMG-4.png",
    desc: "Review goes live on 60+ platforms.",
  },
];

const aiFeatures = [
  {
    icon: Pencil,
    title: "AI Review Writer",
    description: "Track ratings, sentiment, calls, traffic & more.",
    img: "/homepage/ChatGpt3.png",
  },
  {
    icon: MessagesSquare,
    title: "AI Review Reply",
    description: "AI understands ratings & message and writes the perfect reply.",
    img: "/homepage/ChatGpt2.png",
  },
  {
    icon: PieChart,
    title: "AI Insights",
    description: "AI analyzes reviews and gives actionable insights instantly.",
    img: "/homepage/ChatGpt1.png",
  },
];

export default function Home() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

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
        delay: 0.2,
      });

      gsap.from(ctaPrimaryRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(ctaSecondaryRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(heroImageRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });
    });

    return () => ctx.revert();
  }, []);

  const renderLogos = (keyOffset: number) =>
    logos.map((logo, i) => (
      <Image
        key={keyOffset + i}
        src={logo.src}
        alt={logo.alt}
        width={120}
        height={40}
        className={`${logo.height} w-auto object-contain flex-shrink-0`}
      />
    ));

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative py-8 sm:py-10 lg:py-16 px-2.5 sm:px-6">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10">
              <h1
                ref={headlineRef}
                className="text-[40px] sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark leading-[1.15] sm:leading-tight mb-4 sm:mb-6 text-center text-balance"
              >
                <span className="whitespace-nowrap">Build Trust,</span>{" "}
                <span className="whitespace-nowrap">Stay Visible,</span>{" "}
                <span className="whitespace-nowrap inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">Drive Revenue</span>
              </h1>
              <p
                ref={subheadRef}
                className="text-[15px] sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto text-balance"
              >
                Collect More Reviews reply with AI, showcase everywhere and turn
                feedback into real business growth
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 mt-8 sm:mt-10">
                <Button
                  ref={ctaPrimaryRef}
                  href="/signup"
                  variant="primary"
                  className="w-full sm:w-auto text-center"
                >
                  Start a 14 day free trial!
                </Button>
                <Button
                  ref={ctaSecondaryRef}
                  href="/features"
                  variant="secondary"
                  className="w-full sm:w-auto text-center"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                ref={heroImageRef}
                src="/homepage/hero.png"
                alt="Flexi Reviews platform demonstration"
                width={1280}
                height={720}
                className="w-full h-auto rounded-lg sm:rounded-xl"
                priority
              />
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10 px-2.5 sm:px-6 bg-white">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center mb-8 sm:mb-10">
              <span className="inline-block text-[11px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
                TRUSTED BY 100,000+ BUSINESSES
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-3 text-balance">
                <span className="whitespace-nowrap">Loved by</span>{" "}
                <span className="whitespace-nowrap inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">local businesses</span>{" "}
                <span className="whitespace-nowrap">on</span>
              </h2>
              <p className="text-[15px] sm:text-base text-gray-500 max-w-2xl mx-auto">
                Collect manage and showcase your reviews across 60+ platforms
              </p>
            </div>

            <div className="overflow-hidden">
              <div
                ref={marqueeRef}
                className={`flex animate-marquee gap-6 sm:gap-10 md:gap-16 items-center ${isPaused ? "paused" : ""}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {renderLogos(0)}
                {renderLogos(100)}
                {renderLogos(200)}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-white">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
              <span className="inline-block text-[11px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
                ALL-IN-ONE REVIEW GROWTH PLATFORM
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-4 sm:mb-6 text-balance">
                Everything you need to turn feedback into{" "}
                <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">growth.</span>
              </h2>
              <p className="text-[15px] sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                From collecting reviews to showcasing them everywhere — we help you
                build trust, attract more customers, and grow your business.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 mt-8 sm:mt-10">
                <Button
                  href="/signup"
                  variant="primary"
                  className="w-full sm:w-auto text-center"
                >
                  14 Day Trial @ ₹99
                </Button>
                <Button
                  href="/features"
                  variant="secondary"
                  className="w-full sm:w-auto text-center"
                >
                  View All Features
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-10 sm:mb-16 bg-primary-light rounded-xl sm:rounded-2xl p-2.5 sm:p-8 md:p-12">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 transition-shadow hover:shadow-lg"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-subtle rounded-full flex items-center justify-center mb-4 sm:mb-5">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-[18px] sm:text-[22px] font-semibold text-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] sm:text-base text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10 text-sm sm:text-base text-gray-600 text-center">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-dark">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-white">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
              <span className="inline-block text-[11px] sm:text-sm uppercase tracking-widest font-semibold text-primary bg-primary-subtle rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
                How it works
              </span>
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-4 sm:mb-6 text-balance">
                From feedback to <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">5-star reviews in 4 simple steps</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 bg-primary-light rounded-xl sm:rounded-2xl p-2.5 sm:p-8 md:p-12" style={{ gridAutoRows: '1fr' }}>
              {steps.map((step, i) => (
                <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center flex flex-col h-full">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-base mx-auto mb-4 flex-shrink-0">
                    {step.num}
                  </div>
                  <h3 className="text-[18px] sm:text-[22px] font-semibold text-dark mb-3 flex-shrink-0">
                    {step.title}
                  </h3>
                  <div className="flex-1 flex items-center justify-center mb-4">
                    <Image
                      src={step.img}
                      alt={step.title}
                      width={400}
                      height={300}
                      className="w-auto h-auto max-w-full max-h-[50vh] sm:max-h-[60vh] rounded-lg sm:rounded-xl"
                    />
                  </div>
                  <p className="text-[15px] sm:text-base text-gray-500 leading-relaxed flex-shrink-0">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Button variant="secondary" href="/features" className="w-full sm:w-auto text-center">
                Post to 60+ Platforms
              </Button>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-white">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-[30px] sm:text-4xl lg:text-5xl font-bold text-dark leading-[1.1] sm:leading-tight mb-4 sm:mb-6 text-balance">
                AI that works while you work
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-2.5 sm:gap-6 items-stretch">
              <div className="flex flex-col bg-primary-light rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:w-1/2">
                <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-subtle rounded-full flex items-center justify-center flex-shrink-0">
                    <Pencil className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-[18px] sm:text-[22px] font-semibold text-dark mb-2">
                      AI Review Writer
                    </h3>
                    <p className="text-[15px] sm:text-base text-gray-600 leading-relaxed">
                      Track ratings, sentiment, calls, traffic & more.
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex items-end justify-center">
                  <div className="w-full sm:w-3/4 rounded-2xl sm:rounded-[40px] overflow-hidden bg-white">
                    <Image
                      src="/homepage/ChatGpt3.png"
                      alt="AI Review Writer"
                      width={800}
                      height={600}
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 sm:gap-6 lg:w-1/2">
                <div className="flex flex-col sm:flex-row flex-1 sm:items-center gap-4 w-full p-4 sm:p-8 bg-primary-light rounded-xl sm:rounded-2xl text-center sm:text-left">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary-subtle rounded-full flex items-center justify-center flex-shrink-0">
                        <MessagesSquare className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-[18px] sm:text-[22px] font-semibold text-dark mb-1">
                          AI Review Reply
                        </h3>
                        <p className="text-[14px] sm:text-sm text-gray-600 leading-relaxed">
                          AI understands ratings & message and writes the perfect reply.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Image
                    src="/homepage/ChatGpt2.png"
                    alt="AI Review Reply"
                    width={400}
                    height={300}
                    className="w-full sm:w-2/5 h-auto rounded-xl sm:rounded-[28px] flex-shrink-0"
                  />
                </div>

                <div className="flex flex-col sm:flex-row flex-1 sm:items-center gap-4 w-full p-4 sm:p-8 bg-primary-light rounded-xl sm:rounded-2xl text-center sm:text-left">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary-subtle rounded-full flex items-center justify-center flex-shrink-0">
                        <PieChart className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-[18px] sm:text-[22px] font-semibold text-dark mb-1">
                          AI Insights
                        </h3>
                        <p className="text-[14px] sm:text-sm text-gray-600 leading-relaxed">
                          AI analyzes reviews and gives actionable insights instantly.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Image
                    src="/homepage/ChatGpt1.png"
                    alt="AI Insights"
                    width={400}
                    height={300}
                    className="w-full sm:w-2/5 h-auto rounded-xl sm:rounded-[28px] flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-white">
          <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
            <div className="flex flex-col lg:flex-row gap-2.5 sm:gap-6 items-stretch">
              <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:w-2/3 lg:shrink-0">
                <h3 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-dark leading-tight mb-4 sm:mb-6 text-balance">
                  Showcase your best reviews
                </h3>
                <div className="space-y-2.5 sm:space-y-6">
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src="/homepage/Showcase3.png"
                      alt="Slider Carousel Badge widgets"
                      width={1400}
                      height={600}
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src="/homepage/Showcase2.png"
                      alt="Popup Card widgets"
                      width={1400}
                      height={600}
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:w-1/3 lg:shrink-0">
                <h3 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-dark leading-tight mb-4 sm:mb-6 text-balance">
                  Understand your business better
                </h3>
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src="/homepage/Showcase1.png"
                    alt="Analytics Dashboard"
                    width={1400}
                    height={1200}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}