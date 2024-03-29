import { useRef, useEffect } from "react";
import moment from "moment";
import readingTime from "reading-time";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import floatingLike from "public/floatingLikeRed.json";
import Lottie from "lottie-react";
import styled, { useTheme } from "styled-components";
import { IPost } from "types/generated/contentful";
import { PuffLoader } from "react-spinners";
import { MyTheme } from "styles/themes";

type PostHeroProps = {
  post: IPost;
  menuFixed: boolean;
  setMenuFixed: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
  likeNumber: number | null;
};

export default function PostHero({ post, setMenuFixed, menuFixed, likeNumber }: PostHeroProps) {
  const { title, date, topic, tagId } = post.fields;
  const theme = useTheme() as MyTheme;

  const heroRef = useRef(null);
  const heroOptions = {
    root: null,
    rootMargin: "25px",
    threshold: 0,
  };

  const text = documentToPlainTextString(post.fields.body);
  const stats = readingTime(text);

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
      <p>{topic}</p>
      <h1>{title}</h1>
      <Details>
        <h4>
          <time>{moment.utc(date).format("Do MMMM YYYY")}</time>
        </h4>
        <TextSeperator />
        <h4>{stats.text}</h4>
        <Likes>
          <Lottie
            animationData={floatingLike}
            loop={false}
            initialSegment={[40, 40]}
            // autoplay={false}
            style={{ height: "50px", width: "50px" }}
          />
          {likeNumber ? (
            <h4 id="likes">{likeNumber}</h4>
          ) : (
            <PuffLoader id="likes" size={20} loading={true} color={theme.secondary_text} />
          )}
        </Likes>
      </Details>
      <Tags>
        {tagId.map((tag: string, index: number) => (
          <h6 key={index}>{tag}</h6>
        ))}
      </Tags>
    </Container>
  );
}

const Container = styled.section`
  min-height: 45vh;
  padding: 0 12vw;
  padding-top: 100px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.background};

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
      font-size: 25px;
    }
  }
`;

const Details = styled.div`
  display: flex;
  width: max-content;
  align-items: center;
  height: 30px;
  margin-top: 10px;

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

const Tags = styled.div`
  display: flex;
  margin: 20px 0;
  flex-wrap: wrap;
  h6 {
    color: ${({ theme }) => theme.secondary_text};
    background-color: ${({ theme }) => theme.disabled};
    line-height: 30px;
    margin: 5px 0;
    margin-right: 10px;
    padding: 0 10px;
    border-radius: 5px;
  }
`;
