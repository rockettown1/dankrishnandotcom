import React from "react";
import styled from "styled-components";

import Arrow from "./Arrow";

export default function Footer() {
  return (
    <Container>
      <div style={{ height: "400px" }}>
        <h3>Welcome to the footer of randomness</h3>
        <ul>
          <li>Gallery</li>
          <li>Music / Spotify</li>
          <li>Dog stuff</li>
          <li>Work preferences</li>
          <li>VS Code theme</li>
          <li>Setup - macbook pro + keyboard</li>
          <li>Favourite people to follow in tech</li>
        </ul>
      </div>
      {/* <Info>
        <Arrow spin={isBottom} />
        {isBottom ? "You've reached the end" : "Scroll for more"}
      </Info> */}
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

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
