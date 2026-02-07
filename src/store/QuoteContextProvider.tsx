import { createContext, useEffect, useState } from "react";
import { getCachedData, cacheData } from "../utils/localStorage";

interface Quote {
  author: string;
  text: string;
}

interface QuoteContextValue {
  quote: Quote | null;
  isLoading: boolean;
}

const defaultContextValue: QuoteContextValue = {
  quote: null,
  isLoading: true,
};

export const QuoteContext = createContext<QuoteContextValue>(defaultContextValue);

const QuoteContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedQuote = getCachedData("dailyQuote");
    // Check if cache is null OR if cached data is invalid (missing text/author)
    const isValidCache = cachedQuote !== null && cachedQuote?.text && cachedQuote?.author;
    if (!isValidCache) {
      const quotesApi = "/api/dailyQuote";
      fetch(quotesApi)
        .then((response) => response.json())
        .then((quoteData) => {
          // Only cache valid quote data
          if (quoteData?.text && quoteData?.author) {
            cacheData("dailyQuote", quoteData, 43200000); // 12 hour TTL
            setQuote(quoteData);
          }
        })
        .catch((err) => {
          console.error("Error fetching quote:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setQuote(cachedQuote);
      setIsLoading(false);
    }
  }, []);

  return (
    <QuoteContext.Provider value={{ quote, isLoading }}>{children}</QuoteContext.Provider>
  );
};

export default QuoteContextProvider;
