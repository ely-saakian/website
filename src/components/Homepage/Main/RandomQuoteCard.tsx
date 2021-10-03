import { Quote } from "../../../pages";

interface RandomQuoteCardProps {
	quote: Quote;
}

const RandomQuoteCard: React.FC<RandomQuoteCardProps> = ({ quote }) => {
	return (
		<article className="flex flex-col space-y-5 p-10">
			<div className="flex justify-between">
				<p className="font-light dark:text-white">Daily quote</p>
				<p className="font-light dark:text-white text-gray-500">Famous-Quotes.uk</p>
			</div>
			<p className="font-light italic text-xl dark:text-white">“{quote.text}”</p>
			<p className="font-medium text-xl text-right  dark:text-white">{quote.author}</p>
		</article>
	);
};

export default RandomQuoteCard;
