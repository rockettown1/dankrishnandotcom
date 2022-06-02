import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function withTransition(Component) {
  return () => (
    <>
      <Exit
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 1 }}
      />
      <Enter
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <Component />
    </>
  );
}

const Exit = styled(motion.div)`
  position: fixed;
  z-index: 130;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: white;
  transform-origin: left;
`;

const Enter = styled(motion.div)`
  position: fixed;
  z-index: 130;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: white;
  transform-origin: right;
`;
