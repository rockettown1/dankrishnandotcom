import { useState } from "react";
import { GlobalStyle } from "../styles/globals";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/themes";
import Layout from "../components/layout/Layout";
import { AnimatePresence } from "framer-motion";
import useScrollRestoration from "../utils/useScrollRestoration";

import "../styles/fonts.css";

function MyApp({ Component, pageProps, router }) {
  const notHome = router.pathname !== "/";

  const [theme, setTheme] = useState("dark");
  const [finishedExit, setFinishedExit] = useState(false);

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <AnimatePresence exitBeforeEnter>
        <Layout key={router.route} notHome={notHome} toggleTheme={themeToggler}>
          <GlobalStyle />

          <Component key={router.asPath} {...pageProps} />
        </Layout>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
