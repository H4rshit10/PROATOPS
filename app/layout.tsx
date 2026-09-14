import type { Metadata, Viewport } from "next";
import {
  Allura,
  Bebas_Neue,
  JetBrains_Mono,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ContactProvider from "@/components/providers/ContactProvider";
import { PROATOPS } from "@/config/proatops";

/* Headline / display — condensed, uppercase, single weight by design. */
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400"],
});

/* Body & subtitles — architectural sans. */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

/* Accent signature script — human contrast against the condensed caps. */
const allura = Allura({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: ["400"],
});

/* Technical trackers — coordinates, metrics, bracket tags. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(PROATOPS.meta.domain),
  title: PROATOPS.meta.title,
  description: PROATOPS.meta.description,
  keywords: [
    "business operations management",
    "gym management company",
    "fitness business operations",
    "multi-unit management",
    "embedded operations team",
    "SOP deployment",
    "franchise operations",
  ],
  openGraph: {
    title: PROATOPS.meta.title,
    description: PROATOPS.meta.description,
    type: "website",
    url: PROATOPS.meta.domain,
    siteName: PROATOPS.nav.brand,
  },
  twitter: {
    card: "summary_large_image",
    title: PROATOPS.meta.title,
    description: PROATOPS.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#E8E6E0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} ${allura.variable} ${jetbrainsMono.variable} bg-op-parchment font-sans text-op-charcoal antialiased`}
      >
        <ContactProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ContactProvider>
      </body>
    </html>
  );
}
