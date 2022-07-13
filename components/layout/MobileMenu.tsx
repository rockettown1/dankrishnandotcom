import { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLink = (link: string) => {
    setIsOpen(false);
    router.push(`/${link.toLowerCase()}`, `/${link.toLowerCase()}`, { scroll: true });
  };

  const variants = {
    open: { borderRadius: 0, height: "100vh", width: "100vw", right: "0px" },
    closed: { borderRadius: "50%", height: "75px", width: "75px", right: "20px" },
  };
  return (
    <Container isOpen={isOpen} animate={isOpen ? "open" : "closed"} variants={variants}>
      {isOpen && (
        <div>
          <Links>
            {["Hello", "Work", "Blog"].map((link) => (
              <h1 onClick={() => handleLink(link)}>{link}</h1>
            ))}
          </Links>
          <Year>Dan Krishnan {new Date().getFullYear()}</Year>
        </div>
      )}
      <HamburgerWrapper isOpen={isOpen}>
        <Hamburger color="black" onToggle={handleMenu} toggled={isOpen} />
      </HamburgerWrapper>
    </Container>
  );
}

type ContainerProps = {
  isOpen: boolean;
};

const Container = styled(motion.div)<ContainerProps>`
  position: fixed;
  z-index: 100;
  bottom: 50px;
  right: 20px;
  height: 75px;
  width: 75px;
  background-color: ${({ theme }) => theme.highlight};
  color: black;
  border-radius: 50%;
  display: flex;
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  align-items: center;
`;

type HWProps = {
  isOpen: boolean;
};

const HamburgerWrapper = styled.div<HWProps>`
  ${({ isOpen }) =>
    isOpen &&
    `position: absolute;
    bottom: 20px;
    right: 30px;
    `};
`;

const Links = styled.div`
  padding-left: 20px;
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