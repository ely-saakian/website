import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ViewTransition } from "react";
import "@/styles/index.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { GoogleAnalytics } from "@next/third-parties/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-white dark:bg-gray-900 min-h-screen`}
      >
        <Providers>
          <Header />
          <div className="flex flex-col container mx-auto lg:max-w-[960px]">
            <div className="min-h-screen">
              <ViewTransition default="page-transition">
                {children}
              </ViewTransition>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
