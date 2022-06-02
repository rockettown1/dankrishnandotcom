import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";

export default function Circle({ isHovered }) {
  const theme = useTheme();
  return (
    <Svg viewBox="0 0 500 500" isHovered={isHovered}>
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
  height: 1000px;
  width: 1000px;
  stroke: ${({ theme }) => (theme.name == "dark" ? "rgba(255, 255, 255, 0.03)" : theme.highlight)};
  stroke-width: 2px;
  transition: all 0.3s;
`;
