import React from "react";
import styled from "styled-components";
import Button from "../shared/Button";
import Image from "next/image";
import { motion, VariantLabels } from "framer-motion";
import Arrow from "../layout/Arrow";
import { StaticImageData } from "next/image";

type Data = {
  item: string;
  title: string;
  desc: string;
  link: string;
  img: StaticImageData | string;
  available: boolean;
};

export type SectionProps = {
  data?: Data;
  main: boolean;
  id?: number;
  handleClick?: (link: string | undefined) => void;
  exitToMain?: boolean;
};

export default function Section({ data, main, id, handleClick, exitToMain }: SectionProps) {
  const { item, title, desc, link, img, available } = data as Data;

  const image = {
    isMain: {
      width: ["50vw", "50vw", "40vw"],
      height: ["100vh", "50vh", "50vh"],
      filter: ["brightness(20%)", "brightness(100%)", "brightness(100%)"],
    },
    notMain: {
      width: ["40vw", "40vw", "50vw"],
      height: ["50vh", "100vh", "100vh"],
      filter: ["brightness(100%)", "brightness(100%)", "brightness(20%)"],
    },
  };

  return (
    <Container main={main} id={`section${id}`} data-testid="work/section">
      <Details>
        <h1 id="number">{item}</h1>
        <h1 id="title">{title}</h1>
        <p>{desc}</p>
        {!main && (
          <Button primary link={link} handleClick={handleClick!} toDisable={!available}>
            {available ? "Find out more" : "Coming soon"}
          </Button>
        )}
      </Details>
      <ImgWrapper
        data-testid="image-wrapper"
        key={`imgwrapper${id}`}
        main={main}
        // @ts-ignore: exit logic is not VariantLabel
        exit={exitToMain && (!main ? image.notMain : image.isMain)}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Image src={img} layout="fill" objectFit="cover" priority />
      </ImgWrapper>
      {main && (
        <ScrollPrompt initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div>
            <h4>Scroll</h4>
            <Arrow spin={false} />
          </div>
        </ScrollPrompt>
      )}
    </Container>
  );
}

type ContainerProps = {
  main: boolean;
};
const Container = styled.section<ContainerProps>`
  padding-left: 20px;
  display: flex;
  align-items: center;
  height: 100vh;
  background-color: transparent;
  transition: all 1s;
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
  padding: 0 90px;

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
    padding: 0 50px;

    #number {
      font-size: 70px;
      margin: 0;
      color: ${({ theme }) => theme.highlight};
    }

    #title {
      font-size: 45px;
      line-height: 40px;
      margin: 0;
    }
  }
`;

type ImgWrapperProps = {
  main: boolean;
};

const ImgWrapper = styled(motion.div)<ImgWrapperProps>`
  height: ${({ main }) => (main ? "100vh" : "50vh")};
  width: ${({ main }) => (main ? "50vw" : "40vw")};
  filter: ${({ main }) => (main ? "brightness(20%)" : "brightness(100%)")};
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
