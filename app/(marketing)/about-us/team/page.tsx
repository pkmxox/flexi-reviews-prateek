import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import DoneForYou from "../../../components/DoneForYou";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the people behind Flexi Reviews — the team turning customer feedback into growth stories for local businesses every day.",
  keywords: [
    "Flexi Reviews team",
    "about Flexi Reviews",
    "review management team",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Flexi Reviews",
    title: "Our Team — Flexi Reviews",
    description:
      "Meet the people turning customer feedback into growth stories for local businesses every day.",
    url: "https://flexireviews.com/about-us/team",
  },
  twitter: {
    card: "summary",
    title: "Our Team — Flexi Reviews",
    description:
      "Meet the people behind Flexi Reviews and the mission they carry every day.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/about-us/team" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://flexireviews.com/about-us/team/#page",
      url: "https://flexireviews.com/about-us/team/",
      name: "Our Team — Flexi Reviews",
      isPartOf: { "@id": "https://flexireviews.com/#website" },
      about: { "@id": "https://flexireviews.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://flexireviews.com/#organization",
      name: "Flexi Reviews",
      url: "https://flexireviews.com/",
    },
  ],
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 bg-white overflow-x-clip">
        <TeamClient />
        <DoneForYou />
      </main>
      <Footer />
    </>
  );
}
