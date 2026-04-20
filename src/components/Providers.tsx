"use client";

import QuoteContextProvider from "@/store/QuoteContextProvider";
import { YouVersionProvider } from "@youversion/platform-react-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <YouVersionProvider
      appKey={process.env.NEXT_PUBLIC_YVP_APP_KEY!}
      theme="system"
    >
      <QuoteContextProvider>{children}</QuoteContextProvider>
    </YouVersionProvider>
  );
}
