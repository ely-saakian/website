import { createContext, useEffect, useState } from "react";
import { getCachedData, cacheData } from "../utils/localStorage";

const defaultQuote = {
	author: "Steve Jobs",
	text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
};

export const QuoteContext = createContext(defaultQuote);

const QuoteContextProvider: React.FC = ({ children }) => {
	const [quote, setQuote] = useState(defaultQuote);

	useEffect(() => {
		const cachedQuote = getCachedData("dailyQuote");

		if (cachedQuote === null) {
			const qutoesApi = "/api/dailyQuote";
			fetch(qutoesApi)
				.then((response) => response.json())
				.then((quoteData) => {
					cacheData("dailyQuote", quoteData, 43200000); // 12 hour TTL
					setQuote(quoteData);
				});
		} else {
			setQuote(cachedQuote);
		}
	}, []);

	return <QuoteContext.Provider value={quote}>{children}</QuoteContext.Provider>;
};

export default QuoteContextProvider;
