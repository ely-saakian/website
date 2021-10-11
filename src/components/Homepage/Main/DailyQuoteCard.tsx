import { useContext } from "react";
import { QuoteContext } from "../../../store/QuoteContextProvider";

const DailyQuoteCard: React.FC = () => {
	const ctx = useContext(QuoteContext);

	return (
		<article className="flex flex-col space-y-5 p-10">
			<div className="flex justify-between">
				<p className="font-light dark:text-white">Daily quote</p>
				<p className="font-light dark:text-white text-gray-500">Famous-Quotes.uk</p>
			</div>
			<p className="font-light italic text-xl dark:text-white">“{ctx.text}”</p>
			<p className="font-medium text-xl text-right  dark:text-white">{ctx.author}</p>
		</article>
	);
};

export default DailyQuoteCard;
