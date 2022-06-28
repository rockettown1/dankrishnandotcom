import React, { useEffect } from "react";
import Nav from "./Nav";
import { useTheme } from "styled-components";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

type LayoutProps = {
  children: any;
  notHome: boolean;
  toggleTheme: React.Dispatch<React.SetStateAction<string>>;
};

export default function Layout({ children, notHome, toggleTheme }: LayoutProps) {
  const theme = useTheme();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div style={{ scrollBehavior: "smooth" }} data-testid="layout">
      <Nav notHome={notHome} toggleTheme={() => (theme === "dark" ? toggleTheme("light") : toggleTheme("dark"))} />
      {children}
    </div>
  );
}
