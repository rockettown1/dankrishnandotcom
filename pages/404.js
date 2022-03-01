import React from "react";
import styled from "styled-components";

export default function FourOhFour() {
  return (
    <Container>
      <h1>404</h1>
      <h3>What fresh hell is this?</h3>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
