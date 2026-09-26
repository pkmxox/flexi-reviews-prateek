import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://flexireviews.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flexi Reviews — Review Management Software",
    template: "%s | Flexi Reviews",
  },
  description:
    "Flexi Reviews is an all-in-one review platform. Collect reviews with QR codes, reply with AI, showcase testimonials on your website, and grow on 60+ platforms.",
  keywords: [
    "review management software",
    "collect reviews",
    "AI review reply",
    "Google review widget",
    "review platform for businesses",
    "reputation management",
    "Flexi Reviews",
    "customer feedback tool",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Flexi Reviews",
    title: "Flexi Reviews — Review Management Software",
    description:
      "Collect reviews, reply with AI, showcase everywhere, and turn feedback into real business growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexi Reviews — Review Management Software",
    description:
      "Collect reviews, reply with AI, showcase everywhere, and turn feedback into real business growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1BBF6A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-white">{children}</body>
    </html>
  );
}