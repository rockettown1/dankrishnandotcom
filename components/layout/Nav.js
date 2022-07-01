import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HomeSVG from "./Home";
import Link from "next/link";
import { useTheme } from "styled-components";
import { useRouter } from "next/router";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { motion } from "framer-motion";
import { handleKeyboardSelect } from "../../utils/handleKeyboardSelect";
import Social from "./Social";

export default function Nav({ notHome, toggleTheme }) {
  const [rotation, setRotation] = useState(0);

  const router = useRouter();
  const theme = useTheme();
  let position = "fixed";

  switch (router.pathname) {
    case "/":
    case "/work":
      position = "fixed";
      break;
    default:
      position = "absolute";
  }

  const handleThemeToggle = (e) => {
    if (e.type === "keydown") {
      const isEnterKey = handleKeyboardSelect(e, toggleTheme);
      if (!isEnterKey) return;
    }
    toggleTheme();
    setRotation((prev) => prev + 180);
  };

  return (
    <Container position={position} data-testid="nav">
      <div id="icon-container">
        <Social />
        <Link href="/hello" scroll={false}>
          <Option
            active={router.pathname.includes("hello")}
            tabIndex="1"
            role="link"
            onKeyDown={(e) => handleKeyboardSelect(e, () => router.push("/hello"))}
          >
            Hello
          </Option>
        </Link>
        <Link href="/work" scroll={false}>
          <Option
            active={router.pathname.includes("work")}
            tabIndex="1"
            role="link"
            onKeyDown={(e) => handleKeyboardSelect(e, () => router.push("/work"))}
          >
            Work
          </Option>
        </Link>
        <Link href="/blog" scroll={false}>
          <Option
            active={router.pathname.includes("blog")}
            tabIndex="1"
            role="link"
            onKeyDown={(e) => handleKeyboardSelect(e, () => router.push("/blog"))}
          >
            Blog
          </Option>
        </Link>
      </div>
      <div id="right">
        {notHome && (
          <Link href="/">
            <a name="home">
              <HomeSVG use={notHome} />
            </a>
          </Link>
        )}
        <ModeContainer
          id="toggle-container"
          role="button"
          aria-label="darktheme toggle"
          onClick={handleThemeToggle}
          onKeyDown={handleThemeToggle}
          tabIndex="5"
          aria-pressed={theme.name === "dark"}
          rotation={rotation}
        >
          <div id="sunrise">
            <MdLightMode size={35} />
            <MdDarkMode size={35} style={{ transform: "rotateZ(-140deg)" }} />
          </div>
        </ModeContainer>
      </div>
    </Container>
  );
}

const Container = styled.nav`
  position: ${({ position }) => position};
  width: 100vw;
  height: 100px;
  z-index: 150;
  /* background-color: rgba(0, 0, 0, 0.7); */
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  transition: background-color 0.5s;

  #icon-container {
    font-size: 20px;
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
    color: ${({ theme }) => theme.secondary_text};

    h2 {
      margin: 0;
      &:hover {
        color: ${({ theme }) => theme.highlight};
        cursor: pointer;
      }
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

const Option = styled(motion.h2)`
  color: ${({ theme, active }) => (active ? theme.primary_text : theme.secondary_text)};
  border-bottom: 1px solid ${({ theme, active }) => (active ? theme.primary_text : "none")};
`;

const ModeContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
  transition: all 1s;
  height: 50px;
  width: 50px;
  position: relative;
  color: black;
  background-color: ${({ theme }) => theme.highlight};
  #sunrise {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    height: 125px;
    transform-origin: center;
    transition: all 1s;
    transform: ${({ rotation }) => `rotateZ(${rotation}deg)`};
  }
`;
