import { useEffect, useState } from "react";

type Quote = {
	author: string;
	text: string;
};

const DailyQuoteCard: React.FC = () => {
	const [quote, setQuote] = useState<Quote | undefined>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const qutoesApi = "/api/dailyQuote";
		fetch(qutoesApi)
			.then((response) => response.json())
			.then((quote) => {
				setLoading(false);
				setQuote(quote);
			});
	}, []);

	return (
		<article className="flex flex-col space-y-5 p-10">
			<div className="flex justify-between">
				<p className="font-light dark:text-white">Daily quote</p>
				<p className="font-light dark:text-white text-gray-500">Famous-Quotes.uk</p>
			</div>
			{loading ? (
				<div className="animate-pulse flex space-x-4">
					<div className="flex flex-col flex-1 space-y-4 py-1">
						<div className="h-4 bg-gray-400 rounded"></div>
						<div className="h-4 bg-gray-400 rounded"></div>
						<div className="h-4 bg-gray-400 rounded"></div>
						<div className="h-4 bg-gray-400 rounded w-1/3 place-self-end"></div>
					</div>
				</div>
			) : (
				<>
					<p className="font-light italic text-xl dark:text-white">“{quote?.text}”</p>
					<p className="font-medium text-xl text-right  dark:text-white">{quote?.author}</p>
				</>
			)}
		</article>
	);
};

export default DailyQuoteCard;
