import React, { useRef, useEffect, useState, RefObject } from "react";
import styled from "styled-components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { NodeData } from "@contentful/rich-text-types";
import { useWindowSize, richTextOptions, useScrollDirection } from "utils";
import floatingLike from "public/floatingLikeRed.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { Comments, MobileLike } from "components/blog";

type Props = {
  body: any;
  menuFixed: boolean;
  headings: string[];
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  likeNumber: number | null;
  setLikeNumber: React.Dispatch<React.SetStateAction<number>>;
};

/*
Well this is a slighty embarrasing component. I will try to abstract out all the logic for observing intersections when I get around to refactoring.
*/

export default function PostBody({ body, menuFixed, headings, liked, setLiked, likeNumber, setLikeNumber }: Props) {
  const [currentHeading, setCurrentHeading] = useState<number>(0);
  const [startObserving, setStartObserving] = useState<boolean>(false);
  const { height, width } = useWindowSize();
  const { scrollDirection } = useScrollDirection();
  const headingRefs = useRef<HTMLHeadingElement[]>([]);
  let likeHeart = useRef<LottieRefCurrentProps>(null);

  /*
  root margins needs to be different on different sized screens because we are tracking heading elements in the rich text document, and we can't be certain how spaced out they will be. Trying to keep the ratio of observable viewport roughly aligned with the overall screen height.
  */
  const setRootMargin = () => {
    switch (true) {
      case height! < 700:
        return "-100px";
      case height! < 920:
        return "-200px";
      default:
        return "-300px";
    }
  };

  const intersectOptions = {
    root: null,
    rootMargin: `${setRootMargin()} 0px`,
    threshold: 1,
  };

  const triggerCallbackIfNecessary = (entry: IntersectionObserverEntry) => {
    //actively avoiding the first call as the observer fires on first load by design.
    if (!startObserving) {
      return;
    }
    /* if the top of the element is in the viewport and we're scrolling up then it must be entering from the bottom.
     */
    if (entry.boundingClientRect.top > 0 && scrollDirection === "up") {
      setCurrentHeading(headings.indexOf(entry.target.textContent as string));
    }
    /* if the bottom of the element is in the viewport and we're scrolling down then it must be entering from the top.
     */
    if (entry.boundingClientRect.bottom > 0 && scrollDirection === "down") {
      setCurrentHeading(headings.indexOf(entry.target.textContent as string));
    }
  };

  const scrollIntoView = (index: number, heading: string) => {
    //handle edge case where first item has caused the page to scroll back to very top, and clicking second item doesn't hit the interesction area.
    if (headings.length > 2) {
      if (index === 1 && currentHeading === 0) {
        window.scrollTo(0, height! - height! / 10);
        setCurrentHeading(headings.indexOf(heading));
        return;
      }
    }
    //element.scrollIntoView will take care of all other cases
    headingRefs.current[index].scrollIntoView({ block: "center" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      triggerCallbackIfNecessary(entry);
      setStartObserving(true);
    }, intersectOptions);

    if (headingRefs.current.length > 0) {
      for (let i = 0; i < headings.length; i++) {
        observer.observe(headingRefs.current[i]);
      }
    }

    return () => {
      if (headingRefs.current[0]) {
        for (let i = 0; i < headings.length; i++) {
          observer.unobserve(headingRefs.current[i]);
        }
      }
    };
  }, [startObserving, currentHeading, scrollDirection]);

  useEffect(() => {
    const document: any = documentToReactComponents(body, richTextOptions);

    document.forEach((node: NodeData) => {
      console.log(node);
      if (node?.type.target === "h1") {
        headingRefs.current.push(node.ref.current);
      }
    });
  }, [headingRefs]);

  const registerLike = (ref: RefObject<LottieRefCurrentProps>) => {
    if (ref.current) {
      if (!liked) {
        ref.current.setDirection(1);
        ref.current.play();
        setLikeNumber((prev) => prev + 1);
        setLiked(true);
      } else {
        ref.current.goToAndStop(0);
        setLiked(false);
        setLikeNumber((prev) => prev - 1);
      }
    }
  };

  return (
    <Container>
      <Content>
        <BodyWrapper>{documentToReactComponents(body, richTextOptions)}</BodyWrapper>
        <Comments />
      </Content>
      {width! >= 750 && (
        <Menu isMenuFixed={menuFixed}>
          <Sidebar>
            <h4 id="title">Contents</h4>
            <ul>
              {headings.map((heading, index) => {
                return (
                  <Option
                    key={index}
                    current={heading === headings[currentHeading]}
                    onClick={() => scrollIntoView(index, heading)}
                  >
                    {heading}
                  </Option>
                );
              })}
            </ul>
            <Likes onClick={() => registerLike(likeHeart)}>
              <Lottie
                lottieRef={likeHeart}
                animationData={floatingLike}
                autoplay={false}
                loop={false}
                style={{ height: "50px", marginLeft: "-12px", width: "50px" }}
              />
              <h5>{likeNumber}</h5>
            </Likes>
          </Sidebar>
        </Menu>
      )}
      {width! < 750 && <MobileLike liked={liked} registerLike={registerLike} />}
    </Container>
  );
}

const Container = styled.div`
  min-height: 200vh;
  width: 100vw;
  display: flex;
  position: relative;
`;

const Content = styled.div`
  width: 60vw;
  padding-left: 12vw;
  position: relative;
  @media screen and (max-width: 700px) {
    width: 100vw;
    padding: 0 30px;
    overflow-x: scroll;
  }
`;

type MenuProps = {
  isMenuFixed: boolean;
};

const Menu = styled.div<MenuProps>`
  width: 40vw;
  position: absolute;
  height: 100vh;
  top: 0;
  right: 0;
  padding: 50px 0 0 70px;
  ${({ isMenuFixed }) => isMenuFixed && `position: fixed;`};
  #title {
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  ul {
    padding: 0;
  }
`;

const Sidebar = styled.div`
  width: 60%;
  padding-right: 20px;
  border-right: 1px solid ${({ theme }) => theme.disabled};
  p {
    line-height: 25px !important;
    margin-bottom: 10px !important;
  }
`;

type OptionProps = {
  current: boolean;
};

const Option = styled.p<OptionProps>`
  margin: 0 !important;

  font-size: 17px !important;
  text-decoration: none;
  color: ${({ theme, current }) => (current ? theme.highlight : theme.secondary_text)};
  &:hover {
    color: ${({ theme }) => theme.highlight};
    cursor: pointer;
  }
`;

const BodyWrapper = styled.section`
  h1 {
    font-size: 3vh;
  }
  p {
    font-size: 20px !important;
  }
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  height: 30px;

  &:hover {
    cursor: pointer;
  }
`;
