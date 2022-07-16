import { useState, useEffect } from "react";
import { themeToggle } from "utils";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "styles/themes";
import { Layout } from "components/layout";
import { AnimatePresence } from "framer-motion";
import { clearScrollposition } from "utils";
import "public/fonts.css";
import "public/global.css";

function MyApp({ Component, pageProps, router }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const root = window.document.documentElement;
    theme === "dark" ? setTheme("light") : setTheme("dark");
    themeToggle(root, theme);
  };

  //this effect resets the stored scroll position for the work route when the user navigates to a page that doesn't include work
  useEffect(() => {
    history.scrollRestoration = "manual";
    clearScrollposition(router.pathname, sessionStorage);
  }, [router.pathname]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Layout toggleTheme={toggleTheme}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
