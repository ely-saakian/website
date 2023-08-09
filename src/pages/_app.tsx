import "../styles/index.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import QuoteContextProvider from "../store/QuoteContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QuoteContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QuoteContextProvider>
  );
}
export default MyApp;
