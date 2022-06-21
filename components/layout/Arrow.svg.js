import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Arrow({ spin }) {
  if (spin) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 30" width="60px" height="80px">
        <motion.path
          strokeWidth="0.5px"
          d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"
        />
      </Svg>
    );
  } else {
    return (
      <SvgOpposite xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 30" width="60px" height="80px">
        <motion.path
          strokeWidth="0.5px"
          d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"
        />
      </SvgOpposite>
    );
  }
}

const Svg = styled.svg`
  height: 50px;
  transform: rotateZ(180deg);
  transition: all 0.3s;
  fill: ${({ theme }) => theme.highlight};
  margin-top: 10px;

  @media screen and (max-width: 800px) {
    transform: scale(0.7);
  }
`;

const SvgOpposite = styled(Svg)`
  transform: rotateZ(0deg);
`;
