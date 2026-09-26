import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { ViewTransition } from "react";
import "@/styles/index.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Post titles only.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ely Saakian - Frontend Engineer",
  description:
    "Building and optimizing frontend experiences at scale: React SPAs, Next.js apps, Core Web Vitals, bundle analysis, production TypeScript, design system implementation, performance profiling, and modern component architecture.",
  openGraph: {
    title: "Ely Saakian - Frontend Engineer",
    description:
      "Building and optimizing frontend experiences at scale: React SPAs, Next.js apps, Core Web Vitals, bundle analysis, production TypeScript, design system implementation, performance profiling, and modern component architecture.",
    url: "https://elysaakian.com",
    siteName: "Ely Saakian - Frontend Engineer",
    images: [
      {
        url: "https://res.cloudinary.com/doololujs/image/upload/v1633305763/social_preview_t4z4pj.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProd = process.env.NODE_ENV === "production";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} ${newsreader.variable} font-sans bg-paper text-ink antialiased min-h-screen`}
      >
        <Header />
        <div className="flex flex-col container mx-auto lg:max-w-[960px]">
          <div className="min-h-screen">
            <ViewTransition default="page-transition">
              {children}
            </ViewTransition>
          </div>
          <Footer />
        </div>
      </body>
      {isProd && gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
