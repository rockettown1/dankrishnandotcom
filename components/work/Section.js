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
      filter: ["brightness(40%)", "brightness(100%)", "brightness(100%)"],
    },
    notMain: {
      width: ["40vw", "40vw", "50vw"],
      height: ["50vh", "100vh", "100vh"],
      filter: ["brightness(100%)", "brightness(100%)", "brightness(40%)"],
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
        initial={!main && { height: "100vh", width: "50vw", filter: "brightness(40%)" }}
        animate={!main && image.isMain}
        exit={!main && image.notMain}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Image src="/sample.jpg" layout="fill" objectFit="cover" />
      </ImgWrapper>
      {main && (
        <ScrollPrompt initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div>
            <h4>Scroll Down</h4>
            <Arrow />
          </div>
        </ScrollPrompt>
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
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    padding: 0;
    height: 100svh;
  }
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

  @media screen and (max-width: 1000px) {
    order: 1;
    width: 100%;
    margin-top: -55px;
    z-index: 20;
    padding: 0 30px;

    #number {
      font-size: 70px;
      margin: 0;
      color: ${({ theme }) => theme.highlight};
    }

    #title {
      font-size: 45px;
      margin: 0;
    }
  }
`;

const ImgWrapper = styled(motion.div)`
  height: ${({ main }) => (main ? "100vh" : "50vh")};
  width: ${({ main }) => (main ? "50vw" : "40vw")};
  filter: ${({ main }) => (main ? "brightness(40%)" : "brightness(100%)")};
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1000px) {
    width: 100vw !important;

    /* margin-top: 100px; */
  }
`;

const ScrollPrompt = styled(motion.div)`
  position: absolute;
  height: 100vh;
  width: 50vw;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.secondary_text};
  div {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: ${({ theme }) => `2px solid ${theme.highlight}`};
  }
  h4 {
    margin: 0;
    color: white;
  }
  @media screen and (max-width: 1000px) {
    width: 100vw !important;
    height: 66vh;
  }
`;
