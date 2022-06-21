import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import withTransition from "../components/hocs/withTransition";
import styled, { useTheme } from "styled-components";
import Section from "../components/work/Section";
import { useWindowSize } from "../utils/useWindowSize";
import { data } from "../data/work";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import WorkTracker from "../components/layout/WorkTracker";

function Work() {
  const [activeLine, setActiveLine] = useState(0);
  const [position, setPosition] = useState(null);
  const { width } = useWindowSize();
  const router = useRouter();
  const theme = useTheme();
  const container = useRef(null);
  const element = container.current;

  useLayoutEffect(() => {
    setPosition(sessionStorage.getItem("scrollPosition"));
    if (element && position) {
      element.scrollTo(0, position);
    }
  }, [position]);

  const handleFindMore = (link) => {
    router.push(link, link, { scroll: false });
    sessionStorage.setItem("scrollPosition", container.current.scrollTop);
  };

  const watchScroll = (e) => {
    if (container.current) {
      const sectionHeight = container.current.scrollHeight / 5 - 100;
      if (container.current.scrollTop < sectionHeight) {
        setActiveLine(0);
      } else if (container.current.scrollTop > sectionHeight * 1 && container.current.scrollTop < sectionHeight * 2) {
        setActiveLine(1);
      } else if (container.current.scrollTop > sectionHeight * 2 && container.current.scrollTop < sectionHeight * 3) {
        setActiveLine(2);
      } else if (container.current.scrollTop > sectionHeight * 3 && container.current.scrollTop < sectionHeight * 4) {
        setActiveLine(3);
      } else if (container.current.scrollTop > sectionHeight * 4 && container.current.scrollTop < sectionHeight * 5) {
        setActiveLine(4);
      }
    }
  };

  useEffect(() => {
    if (element) {
      element.addEventListener("scroll", watchScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", watchScroll);
      }
    };
  });

  return (
    <Container width={width} ref={container}>
      <motion.div
      // initial={prevPath == "/" && { y: "100vh" }}
      // animate={prevPath == "/" && { y: 0 }}
      // transition={{ duration: 0.8 }}
      >
        {data.map((data, index) => (
          <Section data={data} key={index} id={index + 1} handleClick={handleFindMore} exitToMain={true} />
        ))}
      </motion.div>
      <WorkTracker activeLine={activeLine} />
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
