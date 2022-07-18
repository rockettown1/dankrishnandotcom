import React, { useState } from "react";
import styled from "styled-components";
import HomeSVG from "./Home";
import Link from "next/link";
import { useTheme } from "styled-components";
import { useRouter } from "next/router";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { handleKeyboardSelect, useWindowSize } from "utils";
import Social from "./Social";
import { Option } from "components/layout";
import { MyTheme } from "styles/themes";

type Props = {
  toggleTheme: (mode: string) => void;
};

export default function Nav({ toggleTheme }: Props) {
  const [rotation, setRotation] = useState(0);
  const router = useRouter();
  const theme = useTheme() as MyTheme;
  const { width } = useWindowSize();
  let position = "fixed";
  const notHome = router.pathname !== "/";

  switch (router.pathname) {
    case "/":
    case "/work":
      position = "fixed";
      break;
    default:
      position = "absolute";
  }

  const handleThemeToggle = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    console.log(typeof e);
    if (e.type === "keydown") {
      const isEnterKey = handleKeyboardSelect(e as React.KeyboardEvent, toggleTheme);
      if (!isEnterKey) return;
    }

    theme.name === "dark" ? toggleTheme("light") : toggleTheme("dark");
    setRotation((prev) => prev + 180);
  };

  return (
    <Container position={position} data-testid="nav">
      <div id="icon-container">
        <Social />
        {["Hello", "Work", "Blog"].map((name, index) => {
          return <Option key={index} linkName={name} />;
        })}
      </div>

      <div id="right">
        {width! >= 1100 && (
          <Link href="/">
            <a>
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
          tabIndex={5}
          aria-pressed={theme.name === "dark"}
          rotation={rotation}
        >
          <div id="sunrise">
            <MdLightMode size={25} />
            <MdDarkMode size={25} style={{ transform: "rotateZ(-140deg)" }} />
          </div>
        </ModeContainer>
      </div>
    </Container>
  );
}

type ContainerProps = {
  position: string;
};

const Container = styled.nav<ContainerProps>`
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
  @media screen and (max-width: 1100px) {
    padding-right: 15px;
    height: 10vh;

    #icon-container {
      display: none;
    }

    #right {
      position: absolute;
      top: 10;
      right: 0;
    }
  }
`;

type ModeProps = {
  rotation: number;
};

const ModeContainer = styled.div<ModeProps>`
  display: flex;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
  transition: all 1s;
  height: 40px;
  width: 40px;
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
