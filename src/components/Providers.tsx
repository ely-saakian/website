"use client";

import QuoteContextProvider from "../store/QuoteContextProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <QuoteContextProvider>{children}</QuoteContextProvider>;
}
