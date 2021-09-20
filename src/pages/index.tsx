import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Homepage</title>
			</Head>
			<h1 className="selection:bg-yellow-300">Ely Saakian</h1>
		</>
	);
};

export default Home;
