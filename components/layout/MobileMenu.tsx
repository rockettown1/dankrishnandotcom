import { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { BiLeftArrow } from "react-icons/bi";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { MyTheme } from "styles/themes";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme() as MyTheme;

  const handleMenu = () => {
    if (!isOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "scroll";
    }
    setIsOpen((prev) => !prev);
  };

  const handleLink = (link: string) => {
    setIsOpen(false);
    window.document.body.style.overflow = "scroll";
    router.push(`/${link.toLowerCase()}`, `/${link.toLowerCase()}`, { scroll: true });
  };

  const variants = {
    open: { borderRadius: 0, height: "100vh", width: "100vw", right: "0px" },
    closed: { borderRadius: "50%", height: "75px", width: "75px", right: "10px" },
  };
  return (
    <Container $isOpen={isOpen} animate={isOpen ? "open" : "closed"} variants={variants}>
      {isOpen && <BackgroundTitle>dan krishnan .com</BackgroundTitle>}
      {isOpen && (
        <div>
          <Links>
            {["Hello", "Work", "Blog"].map((link) => (
              <Option key={link}>
                <h1 onClick={() => handleLink(link)}>{link}</h1>
                {router.pathname.includes(link.toLowerCase()) && <BiLeftArrow />}
              </Option>
            ))}
          </Links>
          <Year>Dan Krishnan {new Date().getFullYear()}</Year>
        </div>
      )}
      <HamburgerWrapper isOpen={isOpen} onClick={handleMenu}>
        <Hamburger color={theme.background} toggled={isOpen} />
      </HamburgerWrapper>
    </Container>
  );
}

type ContainerProps = {
  $isOpen: boolean;
};

const Container = styled(motion.div)<ContainerProps>`
  position: fixed;
  z-index: 100;
  bottom: 20px;
  right: 10px;
  height: 75px;
  width: 75px;
  background-color: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.background};
  border-radius: 50%;
  display: flex;
  justify-content: ${({ $isOpen }) => ($isOpen ? "flex-start" : "center")};
  align-items: center;
`;

type HWProps = {
  isOpen: boolean;
};

const HamburgerWrapper = styled.div<HWProps>`
  ${({ isOpen }) =>
    isOpen &&
    `position: absolute;
    bottom: 15px;
    right: 30px;
    `};
`;

const Links = styled.div`
  padding-left: 20px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;

  h1 {
    margin: 0;
  }
`;

const Year = styled.h6`
  position: absolute;
  bottom: 10px;
  left: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BackgroundTitle = styled.h1`
  position: absolute;
  top: -50;
  color: rgba(0, 0, 0, 0.02);
  font-size: 300px;
  line-height: 230px;
  pointer-events: none;
`;
