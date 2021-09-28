import { RefreshIcon } from "@heroicons/react/outline";

const RandomQuoteCard = () => {
	return (
		<article className="flex flex-col space-y-5 p-10">
			<p className="font-light italic text-xl dark:text-white">
				“Your time is limited, so don&apos;t waste it living someone else&apos;s life. Don&apos;t be trapped by dogma –
				which is living with the results of other people&apos;s thinking.”
			</p>
			<p className="font-medium text-xl text-right dark:text-white">Steve Jobs</p>
			<button className="self-start p-[13px] bg-gray-200 rounded-full transition duration-150 active:scale-95 text-black dark:text-white dark:bg-gray-500">
				<RefreshIcon className="h-4 w-4"></RefreshIcon>
			</button>
		</article>
	);
};

export default RandomQuoteCard;
