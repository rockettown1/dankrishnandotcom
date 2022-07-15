import { useRef, RefObject } from "react";
import styled from "styled-components";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import floatingLike from "public/floatingLikeRed.json";

type Props = {
  liked: boolean;
  registerLike: (ref: RefObject<LottieRefCurrentProps>) => void;
};

export default function MobileLike({ liked, registerLike }: Props) {
  let likeHeart = useRef<LottieRefCurrentProps>(null);
  return (
    <Container $liked={liked} onClick={() => registerLike(likeHeart)}>
      <Lottie
        lottieRef={likeHeart}
        animationData={floatingLike}
        autoplay={false}
        loop={false}
        style={{ height: "50px", width: "50px" }}
      />
    </Container>
  );
}

type ContainerProps = {
  $liked: boolean;
};

const Container = styled.div<ContainerProps>`
  position: fixed;
  z-index: 99;
  bottom: 110px;
  right: 32px;
  height: 50px;
  width: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  /* border: 1px solid ${({ theme }) => theme.highlight}; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
