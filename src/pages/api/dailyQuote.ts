import { NextApiRequest, NextApiResponse } from "next";

const quotesApi = "https://www.Famous-Quotes.uk/api.php?id=day&tags=failure";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const response = await fetch(quotesApi);
    const quoteData = await response.json();
    const quote = {
      text: quoteData[0][1],
      author: quoteData[0][2],
    };

    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
}
