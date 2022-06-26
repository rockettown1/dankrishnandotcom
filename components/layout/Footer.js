import React from "react";
import styled from "styled-components";

import Arrow from "./Arrow";

export default function Footer({ isBottom }) {
  return (
    <Container>
      <Info>
        <Arrow spin={isBottom} />
        {isBottom ? "You've reached the end" : "Scroll for more"}
      </Info>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 10px;

  box-sizing: border-box;
  p {
    margin: 0;
  }
`;

const Info = styled.h4`
  position: absolute;
  display: flex;
  z-index: 120;
  /* align-items: center; */
  flex-direction: column;
  bottom: 40px;
  left: 20px;
  color: rgba(255, 255, 255, 0.6);
`;
