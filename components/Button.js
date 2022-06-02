import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Button({ primary, secondary, link, children, handleClick }) {
  const router = useRouter();
  // const clickHandler = () => {
  //   router.push(link);
  // };

  if (primary) {
    return (
      <Primary
        onClick={() => handleClick(link)}
        initial={{ x: "-300px" }}
        animate={{ x: 0 }}
        exit={{ x: "-300px" }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </Primary>
    );
  } else if (secondary) {
    return (
      <Secondary onClick={() => handleClick(link)} initial={{ x: "-300px" }} animate={{ x: 0 }} exit={{ x: "-300px" }}>
        {children}
      </Secondary>
    );
  } else {
    return (
      <Standard onClick={() => handleClick(link)} initial={{ x: "-300px" }} animate={{ x: 0 }} exit={{ x: "-300px" }}>
        {children}
      </Standard>
    );
  }
}

const Standard = styled(motion.button)`
  height: 40px;
  width: 150px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.primary_text};
  color: ${({ theme }) => theme.background};
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);
  font-size: 17px;
  &:active {
    transform: scale(0.9);
  }
`;

const Primary = styled(Standard)`
  background-color: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.background};
`;

const Secondary = styled(Standard)`
  border: ${({ theme }) => `2px solid ${theme.highlight}`};
  color: ${({ theme }) => theme.highlight};
  background-color: transparent;
`;
