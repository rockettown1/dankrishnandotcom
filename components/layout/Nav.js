import React from "react";
import styled from "styled-components";

export default function Nav() {
  return (
    <Container>
      <h1>DK.</h1>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  width: 100vw;
  height: 75px;
  /* background-color: rgba(0, 0, 0, 0.7); */
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: 600;
  }
`;
