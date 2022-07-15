import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { motion } from "framer-motion";
import MainSection from "components/hello/Section";
import { data } from "static/hello_data";
import client from "cms/contentfulClient";
import { useWindowSize } from "utils";
import Footer from "components/layout/Footer";
import Arrow from "components/layout/Arrow";
import { ITechList, ITechListFields } from "types/generated/contentful";

export async function getStaticProps() {
  const response = await client.getEntries<ITechList>({ content_type: "techList" });
  return {
    props: {
      techList: response.items[0].fields,
    },
  };
}

type Props = {
  techList: ITechListFields;
};

export default function Hello({ techList }: Props) {
  const { width } = useWindowSize();

  return (
    <>
      <Head>
        <title>Hello there...</title>
      </Head>
      <Container
        id="hellocontainer"
        key="hellocontainer"
        exit={{ opacity: 0, translateY: 1000 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        width={width}
      >
        <div id="landing">
          <Section id="hellofirst">
            <motion.h1
              key="hellotitle"
              initial={{ opacity: 0, y: 400 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.span id="hello">Hello</motion.span>{" "}
              <motion.span
                key="hellosentence"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
              >
                , I'm Dan. A <span className="highlight">software engineer</span>, and teacher based in the UK.
              </motion.span>
              <br />
              <motion.div
                key="hellosentence"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
              >
                <Arrow spin={false} />
              </motion.div>
            </motion.h1>
          </Section>
          <Img
            src="xander_logo2.png"
            key="bigxander"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
        {data.map((item, index) => {
          return <MainSection key={index} section={item} techList={techList} />;
        })}
        <Section>
          <Footer />
        </Section>
      </Container>
    </>
  );
}

type ContainerProps = {
  width: number | undefined;
};

const Container = styled(motion.div)<ContainerProps>`
  width: 100vw;

  height: ${({ width }) => (width! > 1000 ? "100vh" : "auto")};
  scroll-behavior: smooth;
  overflow-y: scroll;
  scroll-snap-type: ${({ width }) => (width! > 1000 ? "y mandatory" : "none")};
  transition: all 0.3s;
  overflow-x: hidden;

  #landing {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 6vw;
    margin: 20px;
    line-height: 6vw;
  }

  h3,
  p {
    box-sizing: border-box;
    font-size: 6vh;
    margin: 30px;
    line-height: 11vh;
    /* color: rgba(255, 255, 255, 0.8); */
  }

  #hello {
    transform: translateY(1000px);
  }

  .highlight {
    color: ${({ theme }) => theme.highlight};
  }

  .underline {
    text-decoration: underline;
    cursor: pointer;
  }

  #js::before {
    content: "";
    position: absolute;
    height: 20px;
    margin-top: 50px;
    width: 0px;
    background-color: red;
    transition: all 1s;
  }

  #js:hover {
    &::before {
      width: 400px;
    }
  }

  @media screen and (max-width: 1000px) {
    h1 {
      font-size: 10vw;
      line-height: 10vw;
    }
    h3 {
      line-height: 10vw;
    }
  }
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  scroll-snap-align: start;
  box-sizing: border-box;

  @media screen and (max-width: 1000px) {
    /* align-items: flex-start;
    padding-top: 15vh; */
  }
`;

const Img = styled(motion.img)`
  height: 90vh;
  margin-right: -25vw;
  opacity: 0.8;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
