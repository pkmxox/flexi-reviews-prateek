import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import DoneForYou from "../../../components/DoneForYou";
import MissionClient from "./MissionClient";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Flexi Reviews exists so great local businesses get the reputation they deserve — turning honest customer feedback into 5-star reviews, trust, and real growth.",
  keywords: [
    "Flexi Reviews mission",
    "about Flexi Reviews",
    "review management mission",
    "local business growth",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Flexi Reviews",
    title: "Our Mission — Flexi Reviews",
    description:
      "Every customer experience is a chance to build trust. See how Flexi Reviews turns feedback into growth for local businesses.",
    url: "https://flexireviews.com/about-us/mission",
  },
  twitter: {
    card: "summary",
    title: "Our Mission — Flexi Reviews",
    description:
      "Helping local businesses turn honest feedback into 5-star reputations and real growth.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/about-us/mission" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://flexireviews.com/about-us/mission/#page",
      url: "https://flexireviews.com/about-us/mission/",
      name: "Our Mission — Flexi Reviews",
      isPartOf: { "@id": "https://flexireviews.com/#website" },
      about: { "@id": "https://flexireviews.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://flexireviews.com/#organization",
      name: "Flexi Reviews",
      url: "https://flexireviews.com/",
      slogan: "Every customer experience is a chance to build trust.",
    },
  ],
};

export default function MissionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 bg-white overflow-x-clip">
        <MissionClient />
        <DoneForYou />
      </main>
      <Footer />
    </>
  );
}
