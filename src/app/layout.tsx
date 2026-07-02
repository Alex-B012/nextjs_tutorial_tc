import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import "./globals.css";
import localFont from "next/font/local";
import { PathnameProvider } from "@/components/pathname-provider";

const pageTitle = "Next.js Practice App";
const pageDescription = "A practice app built with Next.js 16 and TypeScript";
const websiteUrl = "https://yourwebsite.com";
const ogImageUrl = `${websiteUrl}/og-image.png`;
const keywords = ["Next.js", "React", "JavaScript", "TypeScript"];
const authorName = "John Smith";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "800"],
});

const montserratAccent = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["700"],
});

const customSlabFont = localFont({
  src: [
    {
      path: "../assets/fonts/roboto_slab/RobotoSlab-Black.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/roboto_slab/RobotoSlab-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-customSlabFont",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${pageTitle}`,
    default: pageTitle,
  },
  description: pageDescription,
  keywords: keywords,
  authors: [{ name: authorName, url: websiteUrl }],
  creator: authorName,
  publisher: authorName + " Company",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: websiteUrl,
    languages: {
      "en-US": `${websiteUrl}/en-US`,
      "fr-FR": `${websiteUrl}/fr-FR`,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: websiteUrl,
    siteName: pageTitle,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@johnsmith",
    title: pageTitle,
    description: pageDescription,
    images: [ogImageUrl],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    yandex: "yandex-verification-code",
    google: "google-verification-code",
  },

  manifest: `${websiteUrl}/manifest.webmanifest`,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${customSlabFont.variable} ${geistSans.variable} ${montserratAccent.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <PathnameProvider />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
