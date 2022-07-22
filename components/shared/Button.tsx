import React, { ReactNode } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface Props {
  link?: string;
  children: ReactNode;
  handleClick: (link: string | undefined) => void;
  toDisable?: boolean;
}

type PrimaryProps = Props & { primary: boolean; secondary?: never };
type SecondaryProps = Props & { secondary: boolean; primary?: never };

export default function Button({
  primary,
  secondary,
  link,
  children,
  handleClick,
  toDisable,
}: PrimaryProps | SecondaryProps) {
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
        disabled={toDisable}
      >
        {children}
      </Standard>
    );
  }
}

type StandardProps = {
  toDisable?: boolean;
};

const Standard = styled(motion.button)<StandardProps>`
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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
