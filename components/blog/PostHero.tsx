import { useState, useRef, useEffect } from "react";
import moment from "moment";
import readingTime from "reading-time";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import floatingLike from "public/floatingLikeRed.json";
import Lottie from "lottie-react";

import styled from "styled-components";
import { HiHeart } from "react-icons/hi";

type PostHeroProps = {
  post: {
    fields: any;
  };
  menuFixed: boolean;
  setMenuFixed: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
  likeNumber: number;
};

export default function PostHero({ post, setMenuFixed, menuFixed, likeNumber }: PostHeroProps) {
  const { title, date, tagId } = post.fields;
  const [numberLikes, setNumberLikes] = useState<number>(9);
  const [liked, setLiked] = useState<boolean>(false);
  const heroRef = useRef(null);
  const heroOptions = {
    root: null,
    rootMargin: "25px",
    threshold: 0,
  };
  const text = documentToPlainTextString(post.fields.body);
  const stats = readingTime(text);

  const handleUnfix = (entries) => {
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
      <p>{tagId[0]}</p>
      <h1>{title}</h1>
      <Details>
        <h4>{moment.utc(date).format("Do MMMM YYYY")}</h4>
        <TextSeperator />
        <h4>{stats.text}</h4>
        <Likes>
          <Lottie
            animationData={floatingLike}
            loop={false}
            onLoadedData={(event) => console.log(event)}
            // autoplay={false}
            style={{ height: "50px", width: "50px" }}
          />
          <h4 id="likes">{likeNumber}</h4>
        </Likes>
      </Details>
    </Container>
  );
}

const Container = styled.section`
  height: 45vh;
  padding: 0 12vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  p {
    margin-bottom: 0px;
  }
  h1 {
    margin: 0;
    width: 70vw;
  }
  h4 {
    margin-top: 0;
    color: ${({ theme }) => theme.secondary_text};
    margin-right: 20px;
  }
  @media screen and (max-width: 700px) {
    padding: 0 30px;
    h1 {
      font-size: 30px;
    }
  }
`;

const Details = styled.div`
  display: flex;
  width: max-content;
  align-items: center;
  height: 30px;
  margin-bottom: 80px;
  user-select: none;

  h4 {
    margin: 0;
  }
`;

const Likes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;

  #likes {
    margin-top: -15px;
    margin-left: -8px;
  }
`;

const TextSeperator = styled.span`
  height: 1px;
  width: 15px;
  margin: 0 10px;
  border-bottom: 1px solid ${({ theme }) => theme.secondary_text};
`;
