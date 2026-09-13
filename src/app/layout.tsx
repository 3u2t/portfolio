import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteBeacon from "@/components/SiteBeacon";
import CommandPalette from "@/components/CommandPalette";
import Konami from "@/components/Konami";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.website),
  title: {
    default: "Tom — Developer & Homelab Enthusiast",
    template: "%s · Tom",
  },
  description:
    "Tom, 14, from Germany. I build web apps, run a Raspberry Pi home server, and learn Linux, Docker and Cloudflare by doing.",
  keywords: [
    "Tom",
    "developer portfolio",
    "homelab",
    "Raspberry Pi",
    "self-hosting",
    "Linux",
    "Fedora",
    "Docker",
    "Cloudflare",
    "Next.js",
    "FPV",
  ],
  authors: [{ name: "Tom", url: site.github }],
  openGraph: {
    type: "website",
    locale: "en",
    url: site.website,
    siteName: "Tom — Developer & Homelab",
    title: "Tom — Building things with code, Linux & curiosity",
    description:
      "14-year-old developer from Germany. Web apps, Raspberry Pi home server, Linux and honest projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom — Developer & Homelab Enthusiast",
    description:
      "Web apps, self-hosted infrastructure on a Raspberry Pi, Linux and AI-assisted coding.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#09090b] text-zinc-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tom",
              url: site.website,
              sameAs: [site.github],
              description:
                "Young developer from Germany interested in web development, Linux, self-hosting and hardware.",
            }),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:bg-emerald-400 focus:px-3 focus:py-1 focus:text-black"
        >
          Skip to content
        </a>
        <Nav />
        <SiteBeacon />
        <CommandPalette />
        <Konami />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
