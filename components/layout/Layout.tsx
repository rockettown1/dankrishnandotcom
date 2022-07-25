import React, { useEffect } from "react";
import styled from "styled-components";
import { Nav, MobileMenu } from "components/layout";
import { useWindowSize } from "utils";

type Props = {
  children: any;
  toggleTheme: () => void;
};

export default function Layout({ children, toggleTheme }: Props) {
  const { width } = useWindowSize();

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
