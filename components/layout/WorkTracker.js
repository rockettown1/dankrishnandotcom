import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function WorkTracker({ activeLine }) {
  return (
    <Container
      key="worktracker"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="tracker"
    >
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
  height: 4px;
  width: ${({ active }) => (active ? "50px" : "20px")};
  border-bottom: ${({ theme }) => `4px solid ${theme.disabled}`};
  margin: 10px 0;
`;
