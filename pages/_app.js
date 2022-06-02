import { useState, useEffect } from "react";
import { GlobalStyle } from "../styles/globals";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/themes";
import Layout from "../components/layout/Layout";
import { AnimatePresence } from "framer-motion";

import "../styles/fonts.css";

function MyApp({ Component, pageProps, router }) {
  //used to render the home icon in the layout
  const notHome = router.pathname !== "/";

  const [theme, setTheme] = useState("dark");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const onExitComplete = () => {
    window.scrollTo(0, 0);
  };

  //this effect resets the stored scroll position for the work route when the user navigates to a page that doesn't include work
  useEffect(() => {
    if (router.pathname.search(/work/i) == -1) {
      sessionStorage.removeItem("scrollPosition");
    }
  }, [router.pathname]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <AnimatePresence exitBeforeEnter>
        <Layout key={router.route} notHome={notHome} toggleTheme={themeToggler}>
          <GlobalStyle />

          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
