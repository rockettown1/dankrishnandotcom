import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { moveToWork, moveToNoise } from "../utils/timelines";

export default function Home() {
  const [current, setCurrent] = useState({ title: 1, image: 2 });
  const titlesRef = useRef(null);
  const sectionRef = useRef(null);
  const lastRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const titlesEl = titlesRef.current;
    const imagesEl = imagesRef.current;

    moveToWork(sectionRef.current).to(titlesEl, { x: "-75vw" });
    moveToWork(sectionRef.current).to(imagesEl, {
      x: "50vw",
      onComplete: () => setCurrent({ title: 2, image: 1 }),
      onReverseComplete: () => setCurrent({ title: 1, image: 2 }),
      onStart: () => setCurrent({ title: null, image: null }),
    });
    moveToNoise(lastRef.current).to(titlesEl, { x: "-125vw" });
    moveToNoise(lastRef.current).to(imagesEl, {
      x: "100vw",
      onStart: () => setCurrent({ title: null, image: null }),
      onComplete: () => setCurrent({ title: 3, image: 0 }),
      onReverseComplete: () => setCurrent({ title: 2, image: 1 }),
    });
  }, []);

  return (
    <Container>
      <Head>
        <title>DK Portfolio</title>
        <meta name="description" content="DK Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Images ref={imagesRef}>
          {["/duck.jpg", "/duck.jpg", "/xander.jpg"].map((pic, index) => {
            return (
              <ImgContainer key={index} focus={index === current.image}>
                <Img src={pic} />
                <Back />
              </ImgContainer>
            );
          })}
        </Images>
        <Titles ref={titlesRef}>
          {["", "Hello", "Work", "Noise"].map((title, index) => {
            return <h1 key={index}>{title}</h1>;
          })}
        </Titles>
        <Info>Scroll for more</Info>
      </Main>
      <ScrollDiv ref={sectionRef} />
      <ScrollDiv ref={lastRef} />
      <ScrollDiv />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  /* overflow: scroll;
  scroll-snap-type: mandatory;
  scroll-snap-points-y: repeat(100vh);
  scroll-snap-type: y mandatory; */
`;

const Main = styled.main`
  position: fixed;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Titles = styled.div`
  position: absolute;
  display: flex;
  box-sizing: border-box;
  transform: translateX(-25vw); //default -25vw

  h1 {
    position: relative;
    z-index: 20;
    width: 50vw;
    text-align: center;
    font-size: 200px;
    font-weight: 400;
    @media screen and (max-width: 1100px) {
      font-size: 150px;
    }
  }
`;
const Images = styled.div`
  position: absolute;
  display: flex;
  box-sizing: border-box;
  transform: translateX(-75vw); //default -25vw
`;

const ScrollDiv = styled.div`
  position: relative;
  height: 100vh;
  scroll-snap-align: start;
`;

const ImgContainer = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ focus }) => (focus ? 0.8 : 0.1)};
  transition: all 0.3s;
`;

const Img = styled.img`
  position: absolute;
  z-index: 10;
  height: 400px;
`;

const Back = styled.div`
  height: 400px;
  width: 320px;
  position: absolute;
  background-color: red;
`;

const Info = styled.p`
  position: fixed;
  bottom: 40px;
  left: 75px;
  color: rgba(255, 255, 255, 0.6);
`;
