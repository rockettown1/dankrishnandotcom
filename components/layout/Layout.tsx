import React, { useEffect } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import { useTheme } from "styled-components";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import { AnimatePresence } from "framer-motion";

type LayoutProps = {
  children: any;
  notHome: boolean;
  toggleTheme: React.Dispatch<React.SetStateAction<string>>;
};

export default function Layout({ children, notHome, toggleTheme }: LayoutProps) {
  const theme = useTheme();
  console.log("Layout rendered");
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Container data-testid="layout">
      <Nav notHome={notHome} toggleTheme={() => (theme === "dark" ? toggleTheme("light") : toggleTheme("dark"))} />

      {children}
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
`;
