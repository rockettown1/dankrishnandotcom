import React, { useState } from "react";
import styled from "styled-components";
import Tech from "./Tech";
import { motion } from "framer-motion";

export default function Section({ section, techList }) {
  const [tech, setTech] = useState(false);
  const { sec, subsec, title, name, desc } = section;
  return (
    <Container>
      <Wrapper>
        <Block>
          <div id="content">
            <div id="line" />
            <h3 id="number">
              {sec}
              {subsec && <span style={{ fontSize: "0.5em" }}>{subsec}</span>}
            </h3>
            <h3 id="title">{title}</h3>
          </div>
        </Block>
        <Block>
          <h3 id="name">{name}</h3>
          {subsec === "i" && tech ? (
            <Tech techList={techList} setTech={setTech} />
          ) : (
            <motion.p
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100, opacity: 0 }}
              id="desc"
              dangerouslySetInnerHTML={{ __html: desc }}
            ></motion.p>
          )}

          {subsec === "i" && !tech && (
            <p>
              For a more comprehensive list of tech I've worked with click{" "}
              <span onClick={() => setTech((prev) => !prev)} className="underline">
                here
              </span>
              .
            </p>
          )}

          {subsec === "iii" && <Img src="pheasant.JPG" />}
        </Block>
      </Wrapper>
    </Container>
  );
}

const Container = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  scroll-snap-align: start;
  box-sizing: border-box;

  @media screen and (max-width: 800px) {
    align-items: flex-start;
    padding-top: 15vh;
  }
`;

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100vw;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Block = styled.div`
  width: 50%;
  position: relative;

  #content {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  #line {
    height: 2px;
    width: 5vw;
    background-color: ${({ theme }) => theme.primary_text};
    margin-top: 1vh;
  }

  #number,
  #title {
    font-size: 4vw;
    font-weight: 600;
    margin: 0;
    margin-left: 20px;
    padding: 5px;
  }

  #number {
    color: ${({ theme }) => theme.highlight};
  }

  #title {
    margin-left: 70px;
  }

  #name {
    font-size: 2vw;
    font-weight: 600;
    margin-top: 20px;
  }

  #desc {
    font-size: 1.5vw;
    font-weight: 400;
    margin-top: 20px;
    width: 70%;
  }

  @media screen and (max-width: 800px) {
    width: 100%;

    #name {
      font-size: 6vw;
    }

    #number,
    #title {
      font-size: 10vw;
      font-weight: 600;
      margin: 0;
      margin-left: 20px;
      padding: 5px;
    }

    #line {
      width: 100vw;
      order: 1;
      margin: 20px 25px;
    }

    #content {
      flex-wrap: wrap;
    }
  }
`;

const Img = styled.img`
  width: 400px;
  margin-left: 25px;
  filter: brightness(1.3);
`;
