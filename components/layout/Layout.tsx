import React, { useEffect } from "react";
import styled from "styled-components";
import { Nav, MobileMenu } from "components/layout";
import { useWindowSize } from "utils";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/base16/zenburn.css";
import "highlight.js/lib/common";

// import "prismjs/themes/prism-okaidia.css";

type Props = {
  children: any;
  toggleTheme: (mode: string) => void;
};

export default function Layout({ children, toggleTheme }: Props) {
  const { width } = useWindowSize();

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <Container data-testid="layout">
      <Nav toggleTheme={toggleTheme} />
      {children}
      {width! < 1100 && <MobileMenu />}
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
`;
