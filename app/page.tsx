import type { Metadata } from "next";
import HomePage from "./components/HomePage";

export const metadata: Metadata = {
  title: "Collect Reviews, Reply with AI, Showcase Everywhere",
  description:
    "Collect more reviews with QR codes, reply automatically with AI, showcase them on your website, and turn feedback into real business growth across 60+ platforms.",
  keywords: [
    "review management software",
    "collect reviews",
    "AI review reply",
    "Google review widget",
    "review platform for businesses",
    "reputation management",
    "Flexi Reviews",
    "customer feedback tool",
    "QR code reviews",
    "review analytics",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Flexi Reviews",
    title: "Flexi Reviews — Collect Reviews, Reply with AI, Showcase Everywhere",
    description:
      "Collect more reviews with QR codes, reply automatically with AI, showcase them on your website, and turn feedback into real business growth across 60+ platforms.",
    url: "https://flexireviews.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexi Reviews — Collect Reviews, Reply with AI, Showcase Everywhere",
    description:
      "Collect more reviews with QR codes, reply automatically with AI, showcase them on your website, and turn feedback into real business growth.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://flexireviews.com/#organization",
      name: "Flexi Reviews",
      url: "https://flexireviews.com/",
      logo: "https://flexireviews.com/logos/logo.webp",
      sameAs: ["https://linkedin.com", "https://instagram.com", "https://facebook.com"],
    },
    {
      "@type": "WebSite",
      "@id": "https://flexireviews.com/#website",
      url: "https://flexireviews.com/",
      name: "Flexi Reviews",
      publisher: { "@id": "https://flexireviews.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://flexireviews.com/#software",
      name: "Flexi Reviews",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Collect reviews with QR codes, reply with AI, showcase testimonials on your website, and grow your business across 60+ platforms.",
      url: "https://flexireviews.com/",
      offers: {
        "@type": "Offer",
        price: "1499",
        priceCurrency: "INR",
        description: "Done for You Service — monthly",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}