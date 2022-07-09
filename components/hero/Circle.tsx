import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { MyTheme } from "styles/themes";

export default function Circle({ isHovered }: { isHovered: boolean }) {
  const theme = useTheme() as MyTheme;
  return (
    <Svg viewBox="0 0 500 500">
      <motion.circle
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isHovered ? 1 : 0 }}
        exit={{ stroke: theme.highlight }}
        transition={{ duration: 1, ease: "easeInOut" }}
        cx="250"
        cy="250"
        r="200"
      />
    </Svg>
  );
}

const Svg = styled.svg`
  fill: rgba(0, 0, 0, 0.05);
  height: 900px;
  width: 900px;
  stroke: ${({ theme }) => theme.highlight};
  stroke-width: 2px;
  transition: all 0.3s;
`;
