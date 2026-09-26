import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DoneForYou from "../../components/DoneForYou";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — We're Here to Help",
  description:
    "Questions about Flexi Reviews? Contact our support team by phone, WhatsApp, or email. Get help with setup, integrations, demos, billing, and review management.",
  keywords: [
    "Flexi Reviews contact",
    "Flexi Reviews support",
    "review management help",
    "schedule demo Flexi Reviews",
    "support@flexireviews.com",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Flexi Reviews",
    title: "Contact Us — Flexi Reviews",
    description:
      "Get help with setup, integrations, demos, and your account. Phone, WhatsApp, and email support with replies within 1 business day.",
    url: "https://flexireviews.com/contact-us",
  },
  twitter: {
    card: "summary",
    title: "Contact Us — Flexi Reviews",
    description:
      "Get help with setup, integrations, demos, and your account. Replies within 1 business day.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/contact-us" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://flexireviews.com/contact-us/#page",
      url: "https://flexireviews.com/contact-us/",
      name: "Contact Us — Flexi Reviews",
      isPartOf: { "@id": "https://flexireviews.com/#website" },
    },
    {
      "@type": "Organization",
      "@id": "https://flexireviews.com/#organization",
      name: "Flexi Reviews",
      url: "https://flexireviews.com/",
      email: "support@flexireviews.com",
      telephone: "+91-7223030072",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-7223030072",
          contactType: "customer service",
          availableLanguage: ["en", "hi"],
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://flexireviews.com/contact-us/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What are your support hours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our support team is available during business hours to help with your Flexi Reviews account, setup, integrations, and general questions.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide phone or WhatsApp support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can reach our team by phone or WhatsApp during support hours for assistance with your account or any product-related questions.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to get a response via email?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We typically respond to support emails within one business day. Response times may vary depending on the complexity of your request.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get help setting up Flexi Reviews?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Our team can help you get started with Flexi Reviews, connect your review platforms, and understand the key features available to your business.",
          },
        },
        {
          "@type": "Question",
          name: "Can I schedule a demo of Flexi Reviews?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can schedule a demo with our team to see how Flexi Reviews can help you collect reviews, respond with AI, and showcase your best customer feedback.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I get help with my account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For account, billing, technical, or feature-related questions, contact our support team through the contact form or email. We'll help you find the right solution.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer support for integrations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our team can help you with supported integrations and guide you through the setup process so you can connect Flexi Reviews with your existing workflow.",
          },
        },
        {
          "@type": "Question",
          name: "Can I speak with someone about my business needs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Of course. If you have specific questions about review management or want to understand how Flexi Reviews fits your business, contact our team and we'll be happy to assist.",
          },
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 bg-white overflow-x-clip">
        <ContactClient />
        <DoneForYou />
      </main>
      <Footer />
    </>
  );
}
