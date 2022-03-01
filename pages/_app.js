import { GlobalStyle } from "../styles/globals";
import Layout from "../components/layout/Layout";
import "../styles/fonts.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
