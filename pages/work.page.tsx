import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import Section from "components/work/Section";
import { useWindowSize } from "utils";
import { data } from "static/work_data";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import WorkTracker from "components/layout/WorkTracker";

export default function Work() {
  const [activeLine, setActiveLine] = useState(0);
  const [position, setPosition] = useState<string | null>(null);
  const { width } = useWindowSize();
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const element = container.current;

  useLayoutEffect(() => {
    setPosition(sessionStorage.getItem("scrollPosition"));
    if (element && position) {
      element.scrollTo(0, parseInt(position));
    }
  }, [position]);

  const handleFindMore = (link: string) => {
    router.push(link, link, { scroll: false });
    sessionStorage.setItem("scrollPosition", container.current!.scrollTop.toString());
  };

  const watchScroll = () => {
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
      <motion.div>
        {data.map((data, index) => (
          <Section main={false} data={data} key={index} id={index + 1} handleClick={handleFindMore} exitToMain={true} />
        ))}
      </motion.div>
      {width! >= 1100 && <WorkTracker activeLine={activeLine} />}
      <div style={{ height: "500px" }}></div>
    </Container>
  );
}

type ContainerProps = {
  width: number | undefined;
};

const Container = styled.div<ContainerProps>`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  transition: all 0.3s;
`;
