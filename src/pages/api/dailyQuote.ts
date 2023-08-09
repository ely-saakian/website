import nc from "next-connect";
import cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

const qutoesApi = "https://www.Famous-Quotes.uk/api.php?id=day&tags=failure";

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(cors())
  .get(async (req, res) => {
    const response = await fetch(qutoesApi);
    const quoteData = await response.json();
    const quote = {
      text: quoteData[0][1],
      author: quoteData[0][2],
    };

    res.json(quote);
  });

export default handler;
