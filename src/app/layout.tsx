import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ViewTransition } from "react";
import "@/styles/index.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ely Saakian - Developer",
  description:
    "Hey, I'm Ely and I am a full-stack developer. Currently a software engineer at Amazon. With my passion for coding I'm here to share the things I learn along my path to being the best at what I do. Also feel free to hit me up for your projects. Cheers!",
  openGraph: {
    title: "Ely Saakian - Developer",
    description:
      "Hey, I'm Ely and I am a full-stack developer. Currently a software engineer at Amazon. With my passion for coding I'm here to share the things I learn along my path to being the best at what I do. Also feel free to hit me up for your projects. Cheers!",
    url: "https://elysaakian.com",
    siteName: "Ely Saakian - Developer",
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
      <body className={`${roboto.className} bg-white dark:bg-gray-900 min-h-screen`}>
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
    </html>
  );
}
