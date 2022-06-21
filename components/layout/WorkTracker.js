import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function WorkTracker({ activeLine }) {
  return (
    <Container key="worktracker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return <Line key={index} active={activeLine === index} />;
        })}
    </Container>
  );
}

const Container = styled(motion.div)`
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Line = styled.span`
  height: 1px;
  width: ${({ active }) => (active ? "40px" : "20px")};
  border-bottom: ${({ theme }) => `1px solid ${theme.primary_text}`};
  margin: 10px 0;
`;
