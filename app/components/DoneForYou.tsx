"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, Headphones } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const checklist = [
  "Complete setup & onboarding",
  "GMB optimization",
  "Review campaign setup",
  "Weekly GMB posting (with custom images)",
  "Website & landing page setup",
  "Chatbot & CRM configuration",
  "Ongoing support and guidance",
];

export default function DoneForYou({ ctaHref = "/signup" }: { ctaHref?: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance — STRONG fade + scale, replays on scroll up AND down
      gsap.fromTo(
        "[data-dfy-card]",
        { y: 90, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: "[data-dfy-card]",
            start: "top 88%",
            end: "bottom 12%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Header + content stagger — strong fade + rise + scale
      gsap.fromTo(
        "[data-dfy-item]",
        { y: 56, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: "[data-dfy-card]",
            start: "top 82%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Team photo entrance — fade + rise + scale
      gsap.fromTo(
        "[data-dfy-photo]",
        { y: 40, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: "[data-dfy-card]",
            start: "top 82%",
            end: "center 45%",
            toggleActions: "play none none reverse",
          },
        }
      );
      // Checklist pop — strong stagger fade + slide + scale
      gsap.fromTo(
        "[data-dfy-check]",
        { x: -44, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.8)",
          stagger: 0.09,
          scrollTrigger: {
            trigger: "[data-dfy-list]",
            start: "top 88%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA punch — scales in with overshoot
      gsap.fromTo(
        "[data-dfy-cta]",
        { y: 40, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: "[data-dfy-cta]",
            start: "top 92%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="py-10 sm:py-16 lg:py-24 px-2.5 sm:px-6 bg-white">
      <div className="max-w-[1480px] mx-auto px-0 sm:px-5">
        <div
          data-dfy-card
          className="relative bg-gradient-to-br from-primary-light via-[#f0fdf4] to-white rounded-[2.5rem] px-8 sm:px-10 lg:px-14 py-12 lg:py-16 overflow-hidden"
        >
          {/* Header row — above everything */}
          <div data-dfy-item className="relative flex items-center gap-3 mb-2">
            <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-6 h-6 text-primary" />
            </span>
            <h3 className="text-[22px] sm:text-2xl lg:text-3xl font-bold text-dark">
              Done for You Service
            </h3>
          </div>
          <p data-dfy-item className="text-gray-500 text-base mb-10 ml-14 relative">
            We do the heavy lifting, so you can focus on your business.
          </p>

          {/* Content row */}
          <div className="relative flex flex-col lg:flex-row items-start gap-10 lg:gap-8">
            {/* Left — team photo + checklist */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 flex-1 min-w-0">
              <Image
                data-dfy-photo
                src="/homepage-2/CTA-image1.webp"
                alt="FlexiReviews team"
                width={340}
                height={260}
                className="w-[200px] sm:w-[240px] lg:w-[280px] h-auto object-contain drop-shadow-lg flex-shrink-0 mx-auto sm:mx-0"
              />
              <ul data-dfy-list className="space-y-3 flex-1 min-w-0 pb-1">
                {checklist.map((item) => (
                  <li data-dfy-check key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-[16px] text-dark leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — CTA (own trigger: data-dfy-cta only, NOT data-dfy-item — avoids double-tween fight) */}
            <div data-dfy-cta className="flex flex-col items-center lg:items-start text-center lg:text-left lg:max-w-[400px] flex-shrink-0">
              <h3 className="text-[22px] sm:text-2xl lg:text-3xl font-bold text-dark leading-tight mb-3">
                Let our experts set<br className="hidden lg:block" /> everything up for you.
              </h3>
              <p className="text-gray-500 text-base mb-7">
                Just share your business details and we&apos;ll take care of everything.
              </p>
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 bg-primary hover:bg-[#17a85c] text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-[0_8px_24px_-6px_rgba(27,191,106,0.45)] hover:shadow-[0_8px_24px_-6px_rgba(27,191,106,0.6)] transition-all duration-300 w-full sm:w-auto justify-center"
              >
                Get Started – ₹1,499/month
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Floating image — positioned top-right, outside content flow */}
          <div className="absolute right-4 lg:right-8 top-6 pointer-events-none animate-float hidden lg:block">
            <Image
              src="/homepage-2/CTA-image2.png"
              alt="Your Growth Our Responsibility"
              width={220}
              height={140}
              className="w-[180px] xl:w-[220px] h-auto object-contain mix-blend-multiply select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
