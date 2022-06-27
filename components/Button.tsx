import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  link?: string;
  children: string;
  handleClick?: (link: string) => void;
  toDisable?: boolean;
}

export default function Button({ primary, secondary, link, children, handleClick, toDisable }: ButtonProps) {
  if (primary) {
    return (
      <Primary
        data-testid="primary-button"
        onClick={() => handleClick(link)}
        initial={{ x: "-400px" }}
        animate={{ x: 0 }}
        exit={{ x: "-300px" }}
        transition={{ duration: 0.5 }}
        toDisable={toDisable}
        disabled={toDisable}
      >
        {children}
      </Primary>
    );
  } else if (secondary) {
    return <Secondary onClick={() => handleClick(link)}>{children}</Secondary>;
  } else {
    return (
      <Standard
        onClick={() => handleClick(link)}
        initial={{ x: "-300px" }}
        animate={{ x: 0 }}
        exit={{ x: "-300px" }}
        toDisable={toDisable}
      >
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
  cursor: ${({ toDisable }) => (toDisable ? "not-allowed" : "pointer")};
  font-size: 17px;
  &:active {
    transform: scale(0.9);
  }
`;

const Primary = styled(Standard)`
  background-color: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.background};
  ${({ toDisable, theme }) =>
    toDisable &&
    `background-color: ${theme.disabled};
     color: ${theme.secondary_text};
  `}
`;

const Secondary = styled(Standard)`
  border: ${({ theme }) => `2px solid ${theme.highlight}`};
  color: ${({ theme }) => theme.highlight};
  background-color: transparent;
`;
