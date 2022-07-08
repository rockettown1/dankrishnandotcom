import { useRef, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import lp from "public/laptop1.jpg";

const dummyPosts = [
  { title: "Converting a JavaScript app to TypeScript." },
  { title: "The amazing world of Nextjs." },
  { title: "How to use Styled Components in a next app using SSG." },
  { title: "Some title for the latest blog post." },
];

const BlogMain = ({ menuFixed, setMenuFixed }) => {
  const heroRef = useRef(null);
  const heroOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const handleUnfix = (entries) => {
    console.log("unfixing");
    console.log(entries);
    console.log(entries[0].intersectionRatio);
    if (entries[0].intersectionRatio > 0) {
      setMenuFixed(false);
    } else {
      setMenuFixed(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleUnfix, heroOptions);
    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, [heroRef, heroOptions, menuFixed]);

  return (
    <Container ref={heroRef}>
      <Latest>
        <div id="main">
          <h1 className="title">Understanding the useLayoutEffect hook</h1>
          <p>Publish date</p>
          <Image src={lp} />
        </div>
        <div id="list">
          {dummyPosts.map((post, index, arr) => {
            return (
              <SmallCard key={post.title} bottomBorder={index !== arr.length - 1}>
                <h2 className="title">{post.title}</h2>
                <p>Publish date</p>
              </SmallCard>
            );
          })}
        </div>
      </Latest>
    </Container>
  );
};

export default BlogMain;

const Container = styled.div`
  min-height: 80vh;
  width: 100vw;
  padding: 0 12vw;

  background-color: ${({ theme }) => theme.secondary_background};
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    text-transform: uppercase;
  }
`;

const Latest = styled.section`
  width: 100%;
  max-height: 650px;
  display: flex;
  padding-top: 50px;

  p {
    margin: 10px 0 20px 0;
    font-size: 15px !important;
    line-height: 15px !important;
    color: ${({ theme }) => theme.secondary_text};
  }

  #main {
    max-width: 50vw;
    height: 60vh;
    overflow: hidden;
    padding: 10px;
    padding-right: 50px;

    &:hover {
      cursor: pointer;
      .title {
        color: ${({ theme }) => theme.highlight};
      }
    }

    h1 {
      font-size: 50px;
      line-height: 50px;
      margin: 10px 0;
    }

    h4 {
      margin: 20px 0;
      color: ${({ theme }) => theme.secondary_text};
    }
  }

  #list {
    max-width: 25vw;
    height: 100%;
    padding: 40px 0 0 20px;

    h2 {
      font-size: 1.7vw;
      margin: 0;
    }
  }
`;

type SmallCardProps = {
  bottomBorder: boolean;
};

const SmallCard = styled.div<SmallCardProps>`
  border-bottom: ${({ theme, bottomBorder }) => bottomBorder && `1px solid ${theme.disabled}`};
  margin-bottom: 15px;

  &:hover {
    cursor: pointer;
    .title {
      color: ${({ theme }) => theme.highlight};
    }
  }
`;
