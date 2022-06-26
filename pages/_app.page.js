import { useState, useEffect } from "react";
import { themeToggle } from "../utils/themeToggle";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/themes";
import Layout from "../components/layout/Layout";
import { AnimatePresence } from "framer-motion";
import { clearScrollposition } from "../utils/clearScrollposition";

import "../public/fonts.css";
import "../public/global.css";

function MyApp({ Component, pageProps, router }) {
  //used to render the home icon in the layout
  const notHome = router.pathname !== "/";
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    const root = window.document.documentElement;
    theme === "dark" ? setTheme("light") : setTheme("dark");
    themeToggle(root, theme);
  };

  //this effect resets the stored scroll position for the work route when the user navigates to a page that doesn't include work
  useEffect(() => {
    clearScrollposition(router.pathname, sessionStorage);
  }, [router.pathname]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <AnimatePresence exitBeforeEnter>
        <Layout key={router.route} notHome={notHome} toggleTheme={themeToggler}>
          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
