import React, { useRef } from "react";
import styled from "styled-components";
import Button from "../Button";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Arrow from "../layout/Arrow.svg";
import withTransition from "../hocs/withTransition";

export default function Section({ data, main, id, handleClick }) {
  const { item, title, desc, link } = data;

  const image = {
    isMain: {
      width: ["50vw", "50vw", "40vw"],
      height: ["100vh", "50vh", "50vh"],
    },
    notMain: {
      width: ["40vw", "40vw", "50vw"],
      height: ["50vh", "100vh", "100vh"],
    },
  };

  return (
    <Container main={main} id={`section${id}`}>
      <Details
        key="details"
        initial={!main && { opacity: 0 }}
        animate={!main && { opacity: 1 }}
        exit={main && { opacity: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h1 id="number">{item}</h1>
        <h1 id="title">{title}</h1>
        <p>{desc}</p>
        {!main && (
          <Button primary link={link} handleClick={handleClick}>
            Find out more
          </Button>
        )}
      </Details>
      <ImgWrapper
        key={`imgwrapper${id}`}
        main={main}
        initial={!main && { height: "100vh", width: "50vw" }}
        animate={!main && image.isMain}
        exit={!main && image.notMain}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Image src="/sample.jpg" layout="fill" objectFit="cover" />
      </ImgWrapper>
      {main && (
        <Foot initial={{ y: "200px" }} animate={{ y: 0 }} exit={{ y: "200px" }}>
          <div>
            {/* <h4>Scroll Down</h4> */}
            <Arrow />
          </div>
        </Foot>
      )}
    </Container>
  );
}

const Container = styled(motion.section)`
  /* padding: ${({ main }) => (main ? "0 0 0 20px" : "20px")}; */
  padding-left: 20px;
  display: flex;
  align-items: center;
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
`;

const Details = styled(motion.div)`
  height: 500px;
  width: 50%;
  padding: 0 50px;

  #number {
    font-size: 100px;
    margin: 0;
    color: ${({ theme }) => theme.highlight};
  }

  #title {
    font-size: 75px;
    margin: 0;
  }
`;

const ImgWrapper = styled(motion.div)`
  height: ${({ main }) => (main ? "100vh" : "50vh")};
  width: ${({ main }) => (main ? "50vw" : "40vw")};
  overflow: hidden;
  position: relative;

  /* img {
    filter: brightness(40%);
  } */
`;

const Foot = styled(motion.div)`
  position: absolute;
  bottom: 10px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  left: 30px;
  color: ${({ theme }) => theme.secondary_text};
  div {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h4 {
    margin: 0;
  }
`;
