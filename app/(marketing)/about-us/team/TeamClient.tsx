"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowLeft, Plus, Quote, Sparkles, HeartHandshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Team photos live in  public/about/team/  (served as /about/team/)  */
/* ------------------------------------------------------------------ */

const PHOTOS = {
  ranjit: "/about/team/Ranjit.webp",
  soma: "/about/team/Soma.webp",
  shadab: "/about/team/Shadab.webp",
  udit: "/about/team/Udit.webp",
  prateek: "/about/team/Prateek.webp",
  umer: "/about/team/Umer.webp",
};

const teamGrid = [
  { name: "Shadab Ali", role: "Engineering Manager", img: PHOTOS.shadab, tint: "from-emerald-100 to-teal-50" },
  { name: "Udit Barman", role: "Creative Design Lead", img: PHOTOS.udit, tint: "from-sky-100 to-indigo-50" },
  { name: "Prateek Mehra", role: "Frontend & UI/UX Developer", img: PHOTOS.prateek, tint: "from-amber-100 to-orange-50" },
  { name: "Umer Qureshi", role: "Senior Backend Engineer", img: PHOTOS.umer, tint: "from-violet-100 to-purple-50" },
];

const avatarStack = [PHOTOS.ranjit, PHOTOS.soma, PHOTOS.shadab, PHOTOS.udit];

/* Image that hides itself if the file is missing (keeps layout clean) */
function SafeImg({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export default function TeamClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".t-hero-anim",
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
      {/* ---------- HERO (centered, glow, glass stats) ---------- */}
      <section className="relative px-2.5 sm:px-6 pt-10 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 animate-bg-shift bg-[radial-gradient(640px_340px_at_12%_8%,rgba(27,191,106,0.12),transparent),radial-gradient(720px_380px_at_88%_18%,rgba(27,191,106,0.09),transparent),radial-gradient(500px_300px_at_50%_110%,rgba(27,191,106,0.07),transparent)]" />
        <div className="relative max-w-[1480px] mx-auto px-0 sm:px-5">
          <div className="text-center mb-5">
            <Link
              href="/about-us"
              className="t-hero-anim inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to About Us
            </Link>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <span className="t-hero-anim inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-primary-light border border-primary/20 rounded-full px-5 py-2 mb-5">
              OUR TEAM
            </span>
            <h1 className="t-hero-anim text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-[1.08] tracking-tight text-balance">
              Meet the People Behind{" "}
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">
                Flexi Reviews
              </span>
            </h1>
            <p className="t-hero-anim text-gray-500 text-base sm:text-lg max-w-3xl mx-auto mt-5 leading-relaxed">
              Every feature, update, and customer success story begins with a passionate team
              dedicated to building better WordPress review solutions. We&apos;re designers,
              developers, marketers, and support specialists working together to help businesses
              grow through authentic customer reviews.
            </p>
            <div className="t-hero-anim flex flex-wrap items-center justify-center gap-3 mt-8">
              <span className="inline-flex items-center bg-white border border-gray-200 rounded-full pl-2 pr-4 py-1.5 shadow-sm">
                <span className="flex items-center">
                  {avatarStack.map((src) => (
                    <span
                      key={src}
                      className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gray-200 -ml-2 first:ml-0"
                    >
                      <SafeImg src={src} alt="Flexi Reviews team member" className="w-full h-full object-cover" />
                    </span>
                  ))}
                  <span className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white -ml-2">
                    <Plus className="w-4 h-4" />
                  </span>
                </span>
                <span className="text-sm font-semibold text-dark ml-2.5">6 passionate builders</span>
              </span>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-dark bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm">
                <HeartHandshake className="w-4 h-4 text-primary" />
                Designers, developers, marketers &amp; support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHERE IT ALL BEGAN (light feature card) ---------- */}
      <section className="px-2.5 sm:px-6 py-8 sm:py-12">
        <div className="max-w-[1200px] mx-auto px-0 sm:px-5">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-light via-[#f0fdf4] to-white border border-primary/20 p-7 sm:p-10 lg:p-14"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-primary bg-white/80 border border-primary/20 rounded-full px-4 py-1.5 mb-5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  WHERE IT ALL BEGAN
                </span>
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <blockquote className="text-[17px] sm:text-xl lg:text-[22px] text-dark font-medium leading-relaxed text-balance">
                  I&rsquo;ve always believed that meaningful products start with a simple idea and
                  grow through patience, persistence, and a willingness to keep learning. Building
                  Flexi Reviews has been about more than creating a tool—it&rsquo;s about solving
                  real problems, earning people&rsquo;s trust, and creating something that
                  continues to make a difference for the businesses that use it. The journey is
                  still unfolding, and that&rsquo;s what makes it worth building every day.
                </blockquote>
                <div className="flex items-center gap-4 mt-7">
                  <span className="w-14 h-14 rounded-2xl overflow-hidden bg-white shadow-md border border-primary/15 flex-shrink-0">
                    <SafeImg src={PHOTOS.ranjit} alt="Ranjit Shah" className="w-full h-full object-cover" />
                  </span>
                  <span>
                    <span className="block font-bold text-dark text-[17px]">Ranjit Shah</span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-primary mt-0.5">
                      Founder
                    </span>
                  </span>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[360px]">
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/25 via-transparent to-primary/10 rounded-[2.2rem] blur-xl" />
                <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_32px_64px_-24px_rgba(27,191,106,0.4)]">
                  <SafeImg
                    src={PHOTOS.ranjit}
                    alt="Ranjit Shah, Founder of Flexi Reviews"
                    className="w-full h-auto object-cover aspect-[4/5]"
                  />
                  <span className="absolute bottom-4 left-4 right-4 rounded-xl bg-dark/80 backdrop-blur px-4 py-3 text-left">
                    <span className="block text-white text-sm font-bold">Ranjit Shah</span>
                    <span className="block text-primary text-xs font-semibold">Founder</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHERE WE'RE GOING (dark feature card, mirrored) ---------- */}
      <section className="px-2.5 sm:px-6 py-8 sm:py-12">
        <div className="max-w-[1200px] mx-auto px-0 sm:px-5">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] bg-dark text-white p-7 sm:p-10 lg:p-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(480px_280px_at_12%_12%,rgba(27,191,106,0.22),transparent),radial-gradient(560px_320px_at_90%_90%,rgba(27,191,106,0.14),transparent)]" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
              <div className="relative mx-auto w-full max-w-[360px] order-2 lg:order-1">
                <div className="absolute -inset-3 bg-primary/25 rounded-[2.2rem] blur-xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-primary/30 shadow-2xl">
                  <SafeImg
                    src={PHOTOS.soma}
                    alt="Soma Shah, Co-Founder and CEO of Flexi Reviews"
                    className="w-full h-auto object-cover aspect-[4/5]"
                  />
                  <span className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 backdrop-blur px-4 py-3 text-left">
                    <span className="block text-dark text-sm font-bold">Soma Shah</span>
                    <span className="block text-primary text-xs font-semibold">Co-Founder &amp; CEO</span>
                  </span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-primary bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  WHERE WE&rsquo;RE GOING
                </span>
                <Quote className="w-10 h-10 text-primary/40 mb-4" />
                <blockquote className="text-[17px] sm:text-xl lg:text-[22px] font-medium leading-relaxed text-balance text-white/95">
                  I believe the best businesses are built by listening—to customers, to the people
                  around you, and to the lessons that come with every experience. At Flexi
                  Reviews, we&rsquo;re trying to make that process simpler and more meaningful, so
                  businesses can understand what their customers really think, build stronger
                  relationships, and keep getting better. For me, the journey is not just about
                  building a product; it&rsquo;s about building something people can genuinely rely
                  on.
                </blockquote>
                <div className="flex items-center gap-4 mt-7">
                  <span className="w-14 h-14 rounded-2xl overflow-hidden bg-white/10 border border-primary/30 flex-shrink-0">
                    <SafeImg src={PHOTOS.soma} alt="Soma Shah" className="w-full h-full object-cover" />
                  </span>
                  <span>
                    <span className="block font-bold text-white text-[17px]">Soma Shah</span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-primary mt-0.5">
                      Co-Founder &amp; CEO
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TEAM GRID (modern cards) ---------- */}
      <section className="px-2.5 sm:px-6 py-10 sm:py-16 bg-gradient-to-b from-white via-primary-light/40 to-white">
        <div className="max-w-[1200px] mx-auto px-0 sm:px-5 text-center">
          <span
            data-reveal
            className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-primary bg-white border border-primary/20 rounded-full px-5 py-2 mb-5 shadow-sm"
          >
            THE TEAM
          </span>
          <h2
            data-reveal
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight tracking-tight text-balance"
          >
            Our team consists of{" "}
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-primary to-emerald-700 bg-clip-text text-transparent">
              talented professionals
            </span>
          </h2>
          <p data-reveal className="text-gray-500 text-base sm:text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
            At Flexi Reviews, we&rsquo;re more than just developers and designers—we&rsquo;re
            problem solvers, innovators, and passionate WordPress enthusiasts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-10 text-left">
            {teamGrid.map((m) => (
              <article
                key={m.name}
                data-reveal
                className="group bg-white rounded-3xl border border-gray-200/80 overflow-hidden hover:border-primary/40 hover:shadow-[0_24px_48px_-20px_rgba(27,191,106,0.45)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className={`relative bg-gradient-to-br ${m.tint} p-5 pb-0`}>
                  <div className="overflow-hidden rounded-2xl">
                    <SafeImg
                      src={m.img}
                      alt={`${m.name}, ${m.role} at Flexi Reviews`}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-bold text-dark text-[17px]">{m.name}</h3>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-primary-subtle rounded-full px-3 py-1 mt-2">
                    {m.role}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CROSS-LINK TO MISSION (quiet, textual) ---------- */}
      <section className="px-2.5 sm:px-6 pb-10 sm:pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-0 sm:px-5">
          <Link
            href="/about-us/mission"
            data-reveal
            className="group flex items-center gap-4 bg-dark text-white rounded-2xl p-5 sm:p-6 transition-all duration-300"
          >
            <span className="flex-1 min-w-0 text-left">
              <span className="block font-bold text-[16px]">What drives this team</span>
              <span className="block text-sm text-gray-400">
                Read the mission behind everything we build.
              </span>
            </span>
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
