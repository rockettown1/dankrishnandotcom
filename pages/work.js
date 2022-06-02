import React, { useEffect, useRef } from "react";
import withTransition from "../components/hocs/withTransition";
import styled from "styled-components";
import Section from "../components/work/Section";
import { useWindowSize } from "../utils/useWindowSize";
import { data } from "../data/work";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

function Work() {
  const { width } = useWindowSize();
  const router = useRouter();
  console.log(router.asPath);
  const container = useRef(null);
  const element = container.current;

  if (typeof window !== "undefined") {
    const position = sessionStorage.getItem("scrollPosition");
    console.log("last saved scroll position was: ", position);
    if (element && position) {
      setTimeout(() => {
        element.scrollTo(0, position);
      }, 0);
    }
  }

  const handleFindMore = (link) => {
    router.push(link, link, { scroll: false });
    sessionStorage.setItem("scrollPosition", container.current.scrollTop);
  };

  const saveScroll = (e) => {
    if (container.current) {
      console.dir(container.current.scrollTop);
    }
  };

  useEffect(() => {
    if (element) {
      element.addEventListener("scroll", saveScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", saveScroll);
      }
    };
  }, []);

  return (
    <Container width={width} ref={container}>
      {data.map((data, index) => (
        <Section data={data} key={index} id={index + 1} handleClick={handleFindMore} />
      ))}
    </Container>
  );
}
export default Work;

const Container = styled.div`
  width: 100vw;
  /* padding-top: 100px; */
  height: 100vh;
  /* scroll-behavior: smooth; */
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  transition: all 0.3s;
`;
