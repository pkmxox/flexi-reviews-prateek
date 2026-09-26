"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Users,
  Target,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us", hasDropdown: true },
  { label: "Pricing", href: "/pricing", hasDropdown: true },
  { label: "Features", href: "/features" },
  { label: "Documentation", href: "/docs" },
  { label: "Contact", href: "/contact-us" },
];

const aboutLinks: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  {
    icon: Users,
    title: "Our Team",
    desc: "Meet the people behind Flexi Reviews",
    href: "/about-us/team",
  },
  {
    icon: Target,
    title: "Our Mission",
    desc: "The purpose driving everything we build",
    href: "/about-us/mission",
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openAbout = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setAboutOpen(true);
  };

  const scheduleCloseAbout = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setAboutOpen(false), 120);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <>
    <header className="fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/40 shadow-[0_8px_32px_-12px_rgba(30,30,30,0.12)]">
      <div className="max-w-[1480px] mx-auto px-2.5 sm:px-5 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo.webp"
            alt="Flexi Reviews"
            width={160}
            height={40}
            sizes="160px"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) =>
            item.label === "About" ? (
              <div
                key={item.label}
                ref={aboutRef}
                className="relative"
                onMouseEnter={openAbout}
                onMouseLeave={scheduleCloseAbout}
              >
                <Link
                  href={item.href}
                  onClick={() => setAboutOpen(false)}
                  onFocus={openAbout}
                  aria-expanded={aboutOpen}
                  aria-haspopup="true"
                  className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 ${
                    aboutOpen ? "text-primary" : "text-dark hover:text-primary"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      aboutOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {/* Animated dropdown panel */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[340px] z-50 transition-all duration-300 ease-out origin-top ${
                    aboutOpen
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
                      : "opacity-0 -translate-y-2 scale-[0.97] pointer-events-none invisible"
                  }`}
                >
                  <div className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_24px_60px_-16px_rgba(30,30,30,0.25)] p-2.5 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-primary to-emerald-600" />
                    {aboutLinks.map((link, i) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setAboutOpen(false)}
                        style={{ transitionDelay: aboutOpen ? `${i * 45}ms` : "0ms" }}
                        className={`group flex items-start gap-3.5 rounded-xl px-3.5 py-3.5 transition-all duration-300 hover:bg-primary-light/70 ${
                          aboutOpen
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2"
                        }`}
                      >
                        <span className="w-11 h-11 rounded-xl bg-primary-subtle text-primary flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105 group-hover:-rotate-3">
                          <link.icon className="w-5 h-5" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-center gap-1.5 font-semibold text-dark text-[15px]">
                            {link.title}
                            <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                          </span>
                          <span className="block text-[13px] text-gray-500 mt-0.5 leading-snug">
                            {link.desc}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-dark hover:text-primary transition-colors flex items-center gap-1"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="px-6 py-2.5 text-sm font-medium text-dark border border-gray-200 rounded-lg hover:border-dark transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-dark" />
          ) : (
            <Menu className="w-6 h-6 text-dark" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-2.5 py-3">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) =>
              item.label === "About" ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileAboutOpen((v) => !v)}
                    aria-expanded={mobileAboutOpen}
                    className="w-full flex items-center justify-between text-[15px] font-medium text-dark hover:text-primary transition-colors px-1 py-2"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileAboutOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: mobileAboutOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-1 pl-2 pb-2">
                        {aboutLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-primary-light/60 transition-colors"
                          >
                            <span className="w-9 h-9 rounded-xl bg-primary-subtle text-primary flex items-center justify-center flex-shrink-0">
                              <link.icon className="w-4 h-4" />
                            </span>
                            <span>
                              <span className="block text-[15px] font-semibold text-dark">
                                {link.title}
                              </span>
                              <span className="block text-xs text-gray-500">{link.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[15px] font-medium text-dark hover:text-primary transition-colors px-1 py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-2.5 mt-3 pt-3 border-t border-gray-100">
              <Link
                href="/login"
                className="px-6 py-2.5 text-sm font-medium text-dark border border-gray-200 rounded-lg text-center hover:border-dark transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg text-center hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
    {/* Spacer matching the fixed header height so content never hides under it */}
    <div aria-hidden className="h-16 sm:h-20 flex-shrink-0" />
    </>
  );
}