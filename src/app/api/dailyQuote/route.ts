import { NextResponse } from "next/server";

const quotesApi = "https://zenquotes.io/api/today";

const fallbackQuotes = [
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
];

function getDailyFallbackQuote() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  );
  return fallbackQuotes[dayOfYear % fallbackQuotes.length];
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function GET() {
  try {
    const response = await fetch(quotesApi);
    const quoteData = await response.json();
    // ZenQuotes format: [{q: "quote text", a: "author"}]
    if (!quoteData || !quoteData[0] || !quoteData[0].q || !quoteData[0].a) {
      throw new Error("Invalid quote data format");
    }
    const quote = {
      text: quoteData[0].q,
      author: quoteData[0].a,
    };
    return NextResponse.json(quote, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching quote: ", error);
    // Return fallback quote instead of error
    return NextResponse.json(getDailyFallbackQuote(), { headers: corsHeaders });
  }
}
