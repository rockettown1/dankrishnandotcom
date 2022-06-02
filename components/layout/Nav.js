import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HomeSVG from "./Home.svg";
import Link from "next/link";
import { useTheme } from "styled-components";
import { BsInstagram, BsGithub, BsLinkedin, BsInfoCircle } from "react-icons/bs";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { handleKeyboardSelect } from "../../utils/handleKeyboardSelect";
import Social from "./Social";

export default function Nav({ notHome, toggleTheme }) {
  const theme = useTheme();
  return (
    <Container>
      <div id="icon-container">
        <Social />
      </div>
      <div id="right">
        <div
          id="toggle-container"
          role="button"
          aria-label="darktheme toggle"
          onClick={toggleTheme}
          onKeyDown={(e) => handleKeyboardSelect(e, toggleTheme)}
          tabindex="5"
          aria-pressed={theme.name === "light"}
        >
          {theme.name === "light" ? <MdDarkMode size={35} /> : <MdLightMode size={35} />}
        </div>
        {notHome && (
          <Link href="/">
            <a name="home">
              <HomeSVG use={notHome} />
            </a>
          </Link>
        )}
      </div>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  width: 100vw;
  height: 100px;
  z-index: 150;
  /* background-color: rgba(0, 0, 0, 0.7); */
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;

  #icon-container {
    font-size: 30px;
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
    color: ${({ theme }) => theme.secondary_text};
  }

  #toggle-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: all 1s;
    height: 40px;
    width: 40px;

    background-color: ${({ theme }) => theme.highlight};
    &:hover {
    }
  }

  #right {
    display: flex;
    padding-right: 20px;
    align-items: center;
  }

  h1 {
    font-size: 17px;
    font-weight: 400;
  }
  @media screen and (max-width: 800px) {
    padding-right: 15px;
    height: 10vh;
  }
`;