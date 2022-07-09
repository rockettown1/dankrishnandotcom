import React, { useEffect } from "react";
import styled from "styled-components";
import { Nav } from "components/layout";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

type Props = {
  children: any;
  toggleTheme: (mode: string) => void;
};

export default function Layout({ children, toggleTheme }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Container data-testid="layout">
      <Nav toggleTheme={toggleTheme} />
      {children}
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
`;
