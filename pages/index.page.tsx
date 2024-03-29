import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import Circle from "components/hero/Circle";
import { GoLightBulb } from "react-icons/go";
import Arrow from "components/layout/Arrow";
import x1 from "public/xander_logo.png";
import x2 from "public/xander_logo2.png";
import { useOS } from "utils";
import { BiCommand } from "react-icons/bi";

function Home() {
  const [current, setCurrent] = useState({ title: 0, image: 2 });
  const [isHovered, setIsHovered] = useState(false);
  const conRef = useRef(null);
  const titlesRef = useRef(null);
  const imagesRef = useRef(null);
  const os = useOS();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(titlesRef.current, {
      x: "-100vw",
      ease: "none",
      scrollTrigger: {
        trigger: conRef.current,
        scrub: 1,
        pin: true,
        start: "+=0px",
        end: "+=10px",
        snap: 1,
      },
      onComplete: () => {
        setCurrent({ title: 1, image: 1 });
      },
    });

    gsap.to(imagesRef.current, {
      x: "-25vw",
      ease: "none",
      scrollTrigger: {
        trigger: titlesRef.current,
        scrub: 1,
        pin: true,
        start: "+=0.5px",
        end: "+=9px",
      },
      onReverseComplete: () => {
        setCurrent({ title: 0, image: 2 });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div>
      <Container
        className="wrapper"
        key="wrapper"
        ref={conRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Head>
          <title>DK: Home</title>
          <meta name="description" content="DK: Home" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content="Dan Krishnan - Home" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>

        <motion.div
          key="innerdiv"
          exit={{ opacity: 0.5, translateY: -800 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.3 }}
        >
          <ShapeContainer>
            <Circle isHovered={isHovered} />
          </ShapeContainer>

          <DogWrapper ref={imagesRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[x1, x1, x2, x2].map((pic, index) => {
              return (
                <ImgContainer className="dog" key={index} $focus={index === current.image}>
                  <Img src={pic} height="600px" objectFit="contain" alt="A picture of my dog" />
                </ImgContainer>
              );
            })}
          </DogWrapper>
          <TitlesWrapper ref={titlesRef}>
            {["Hello", "Work"].map((title, index) => {
              if (index === current.title) {
                return (
                  <Sec
                    key={`option${index}`}
                    exit={{ scale: 0.4, translateY: "31vh" }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.6 }}
                    $ready={index === current.title}
                  >
                    <Link scroll={false} href={`/${title.toLowerCase()}`} passHref>
                      <a>
                        <h1
                          onMouseOver={() => setIsHovered(true)}
                          onMouseOut={() => setIsHovered(false)}
                          onClick={() => setIsHovered(false)}
                        >
                          {title}
                        </h1>
                      </a>
                    </Link>
                  </Sec>
                );
              } else {
                return (
                  <Sec key={index}>
                    <h1>{title}</h1>
                  </Sec>
                );
              }
            })}
          </TitlesWrapper>
        </motion.div>
      </Container>
      <Foot>
        <div>
          <h4>{current.image === 1 ? "Scroll up" : "Scroll down"}</h4>
          <Arrow spin={current.image === 1} />
        </div>

        {os && (
          <motion.div id="kbar-tip" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GoLightBulb style={{ marginRight: 10 }} />
            <p> Tip: Use</p>
            <Command>
              {os == "macOS" ? (
                <span>
                  <p>
                    <BiCommand size={15} /> K
                  </p>
                </span>
              ) : (
                "ctrl + K"
              )}
            </Command>{" "}
            <p>on any page to navigate</p>
          </motion.div>
        )}
      </Foot>
    </div>
  );
}

export default Home;

const Container = styled(motion.div)`
  transition: all 0.3s;
  /* position: relative; */
  height: 100vh;
  width: 200vw;
  display: flex;
  overflow: hidden;
`;

const TitlesWrapper = styled(motion.div)`
  height: 100vh;
  display: flex;
  position: relative;
  z-index: 10;
`;

const DogWrapper = styled(motion.div)`
  width: 200vw;
  height: 100vh;
  position: absolute;
  display: flex;
  box-sizing: border-box;
  transform: translateX(-75vw);
  @media screen and (max-width: 1000px) {
    margin-top: -200px;
  }
`;

type SecProps = {
  $ready?: boolean;
};

const Sec = styled(motion.div)<SecProps>`
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    position: relative;
    user-select: none;
    text-align: center;

    font-size: 200px;
    font-weight: 400;
    transition: all 0.5s;

    &:hover {
      cursor: ${({ $ready }) => $ready && "pointer"};
      color: ${({ theme, $ready }) => $ready && theme.highlight};
    }

    @media screen and (max-width: 1000px) {
      font-size: 90px;
    }

    &::before {
      content: "DK.";
      font-size: 20px;
      font-weight: 600;
      margin-left: -20px;
    }
  }
  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: inherit;
  }
`;

type ImgContainerProps = {
  $focus: boolean;
};

const ImgContainer = styled(motion.div)<ImgContainerProps>`
  margin-top: -60px;
  width: 33%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  opacity: ${({ $focus }) => ($focus ? 0.5 : 0.05)};
  transition: all 0.5s;
`;

const Img = styled(Image)`
  position: relative;
  z-index: 12;
  height: 600px;
  @media screen and (max-width: 1000px) {
    height: 200px;
  }
`;

// const StyledLink = styled(Link)`
//   width: max-content;
// `;

const ShapeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Foot = styled.div`
  position: fixed;
  z-index: 101;
  bottom: 30px;
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

  #kbar-tip {
    position: absolute;
    bottom: 0;
    right: 10px;
    width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 50px;

    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
`;

const Command = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4c5766;
  padding: 5px;
  height: 30px;
  margin: 0 10px;
  border-radius: 3px;
  p {
    color: white !important;
    margin: 0 !important;
  }
`;
