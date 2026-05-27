import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jephthahdominic.com";
const normalizedSiteUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
const ogImageUrl = `${normalizedSiteUrl}/portfolio_snippet.png`;
const portfolioDescription =
  "St-dominic Jephthah is a software developer building full-stack web products with strong UX, clean architecture, and reliable delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(normalizedSiteUrl),
  title: {
    default: "St-dominic Jephthah | Software Developer Portfolio",
    template: "%s | St-dominic Jephthah",
  },
  description: portfolioDescription,
  applicationName: "St-dominic Jephthah Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "St-dominic Jephthah",
    "Jephthah Dominic",
    "Software Developer",
    "Full-stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "St-dominic Jephthah", url: siteUrl }],
  creator: "St-dominic Jephthah",
  publisher: "St-dominic Jephthah",
  alternates: {
    canonical: normalizedSiteUrl,
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: normalizedSiteUrl,
    siteName: "St-dominic Jephthah Portfolio",
    title: "St-dominic Jephthah | Software Developer Portfolio",
    description:
      "Explore projects, skills, and experience from St-dominic Jephthah. Includes project case highlights, social links, and direct contact options.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "St-dominic Jephthah - Software Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St-dominic Jephthah | Software Developer Portfolio",
    description:
      "Explore projects and experience from St-dominic Jephthah, with direct contact and social links.",
    creator: "@TheRealJephthah",
    images: [ogImageUrl],
  },
  other: {
    "og:image:secure_url": ogImageUrl,
    "og:image:type": "image/png",
    "og:image:width": "1200",
    "og:image:height": "630",
  },
  icons: {
    icon: "/avatar.svg",
    shortcut: "/avatar.svg",
    apple: "/avatar.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${syne.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
