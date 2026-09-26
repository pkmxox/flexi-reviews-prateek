import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DoneForYou from "../../components/DoneForYou";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Plans & Pricing",
  description:
    "Flexible review-management plans for businesses of all sizes. Starter, Professional and Enterprise in INR and USD, monthly and yearly — every plan starts with a 14-day free trial.",
  keywords: [
    "Flexi Reviews pricing",
    "review management pricing",
    "Starter Professional Enterprise",
    "Flexi Reviews plans INR USD",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Flexi Reviews",
    title: "Plans & Pricing — Flexi Reviews",
    description:
      "Starter, Professional and Enterprise plans in INR and USD with monthly and yearly billing. 14-day free trial, no credit card required.",
    url: "https://flexireviews.com/pricing",
  },
  twitter: {
    card: "summary",
    title: "Plans & Pricing — Flexi Reviews",
    description:
      "Flexible plans for every business size. 14-day free trial on every plan.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/pricing" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://flexireviews.com/pricing/#page",
      url: "https://flexireviews.com/pricing/",
      name: "Plans & Pricing — Flexi Reviews",
      isPartOf: { "@id": "https://flexireviews.com/#website" },
    },
    {
      "@type": "Product",
      "@id": "https://flexireviews.com/pricing/#product",
      name: "Flexi Reviews",
      description:
        "All-in-one review platform: collect reviews, reply with AI, showcase everywhere.",
      brand: { "@type": "Brand", name: "Flexi Reviews" },
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "2499",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: "https://flexireviews.com/pricing/",
        },
        {
          "@type": "Offer",
          name: "Professional",
          price: "4999",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: "https://flexireviews.com/pricing/",
        },
        {
          "@type": "Offer",
          name: "Enterprise",
          price: "7999",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: "https://flexireviews.com/pricing/",
        },
      ],
    },
  ],
};

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ currency?: string }>;
}) {
  const params = await searchParams;
  const initialCurrency = params.currency?.toLowerCase() === "usd" ? "USD" : "INR";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 bg-white overflow-x-clip">
        <PricingClient initialCurrency={initialCurrency} />
        <DoneForYou />
      </main>
      <Footer />
    </>
  );
}
