const SubscribeCard = () => {
	return (
		<article className="flex flex-col space-y-5 p-10 mx-auto">
			<h2 className="sm:text-2xl text-xl font-medium dark:text-white text-center">Shall I keep you in the loop?</h2>
			<p className="text-gray-500 dark:text-white text-center">Subscribe to get new articles in your mail.</p>
			<div className="flex flex-col space-y-5">
				<input
					type="email"
					className="rounded-full dark:bg-transparent dark:text-white outline-none dark:border-white border-gray-200 border-2 py-2 px-4"
					placeholder="Email address"
				/>
				<button className="bg-gray-200 dark:bg-gray-500 py-[10px] px-5 rounded-full transition dark:text-white duration-150 active:scale-95">
					Subscribe
				</button>
			</div>
		</article>
	);
};

export default SubscribeCard;
