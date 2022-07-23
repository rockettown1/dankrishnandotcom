import React, { useEffect } from "react";
import styled from "styled-components";
import { Nav, MobileMenu } from "components/layout";
import { useWindowSize } from "utils";
import CommandPalette from "./CommandPalette";

// import "prismjs/themes/prism-okaidia.css";

type Props = {
  children: any;
  toggleTheme: (mode: string) => void;
};

export default function Layout({ children, toggleTheme }: Props) {
  const { width } = useWindowSize();

  return (
    <Container data-testid="layout">
      <Nav toggleTheme={toggleTheme} />
      {children}
      {width! < 1100 && <MobileMenu />}
      <CommandPalette />
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
`;
