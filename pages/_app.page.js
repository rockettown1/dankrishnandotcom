import { useState, useEffect } from "react";
import { themeToggle } from "utils";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "styles/themes";
import { Layout, CommandPalette } from "components/layout";
import { AnimatePresence } from "framer-motion";
import { clearScrollposition, kbarActions } from "utils";

import "public/fonts.css";
import "public/global.css";
import { KBarProvider } from "kbar";

function MyApp({ Component, pageProps, router }) {
  const [theme, setTheme] = useState("dark");

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
      <KBarProvider actions={kbarActions}>
        <CommandPalette />
        <Layout toggleTheme={toggleTheme}>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </KBarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
