import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import styled from "styled-components";
import Link from "next/link";
import { IPostFields, IPost } from "types/generated/contentful";

type Props = {
  menuFixed: boolean;
  setMenuFixed: React.Dispatch<React.SetStateAction<boolean>>;
  firstFour: IPost[];
  featuredPost: IPostFields;
};

const BlogMain = ({ menuFixed, setMenuFixed, firstFour, featuredPost }: Props) => {
  const heroRef = useRef(null);
  const heroOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const handleUnfix: IntersectionObserverCallback = (entries) => {
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
        <Link href={`/blog/${featuredPost.slug}`}>
          <div id="main">
            <h6>Featured Post</h6>
            <h1 className="title">{featuredPost.title}</h1>
            <ImgWrapper>
              <Image src={`https:${featuredPost.featuredImage.fields.file.url}`} layout="fill" objectFit="cover" />
            </ImgWrapper>
          </div>
        </Link>
        <div id="list">
          <h6>Latest</h6>
          {firstFour.map((post: IPost, index: number, arr: IPost[]) => {
            return (
              <Link href={`/blog/${post.fields.slug}`} key={post.fields.title}>
                <SmallCard bottomBorder={index !== arr.length - 1}>
                  <h2 className="title">{post.fields.title}</h2>
                  <p>
                    <time>{moment.utc(post.fields.date).format("Do MMMM YYYY")}</time>
                  </p>
                </SmallCard>
              </Link>
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
  @media screen and (max-width: 800px) {
    padding: 0 20px;
  }
`;

const Latest = styled.section`
  width: 100%;
  max-height: 650px;
  display: flex;
  padding-top: 50px;

  p {
    margin: 20px 0 20px 0;
    font-size: 15px !important;
    line-height: 15px !important;
    color: ${({ theme }) => theme.secondary_text};
  }

  h6 {
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
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
      margin: 0;
      margin-bottom: 30px;
    }

    h4 {
      margin: 20px 0;
      color: ${({ theme }) => theme.secondary_text};
    }
  }

  #list {
    max-width: 25vw;
    height: 100%;
    padding: 20px 0 0 20px;

    h2 {
      font-size: 1.7vw;
      margin: 0;
    }
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    max-height: none;
    overflow: hidden;
    #main {
      max-width: none;
      width: 100vw;
      height: 400px;
      overflow: hidden;
      margin-bottom: 20px;

      padding: 0;
      h1 {
        width: 70vw;
        font-size: 30px;
        line-height: 30px;
      }
    }

    #list {
      max-width: none;
      padding: 0;
      h2 {
        font-size: 17px;
      }
    }
  }
`;

const ImgWrapper = styled.div`
  max-width: 50vw;
  height: 20vw;
  position: relative;
  @media screen and (max-width: 800px) {
    max-width: none;
    width: 100vw;
    height: 300px;
  }
`;

type SmallCardProps = {
  bottomBorder: boolean;
};

const SmallCard = styled.div<SmallCardProps>`
  border-bottom: ${({ theme, bottomBorder }) => bottomBorder && `1px solid ${theme.disabled}`};
  margin-bottom: 15px;
  p {
    margin-top: 10px;
  }

  &:hover {
    cursor: pointer;
    .title {
      color: ${({ theme }) => theme.highlight};
    }
  }
`;
