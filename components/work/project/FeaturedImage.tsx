import React from "react";
import styled from "styled-components";
import NextImage from "next/image";
import { IProject } from "types/generated/contentful";
import { useWindowSize } from "utils";

export default function FeaturedImage({ project }: { project: IProject }) {
  const { featuredImage } = project.fields;
  const { width } = useWindowSize();
  return (
    <Container project={project} width={width}>
      <Image
        src={`http:${featuredImage.fields.file.url}`}
        height={
          width! < 1100
            ? featuredImage.fields.file.details.image!.height / 2
            : featuredImage.fields.file.details.image!.height
        }
        width={
          width! < 1100
            ? featuredImage.fields.file.details.image!.width / 2
            : featuredImage.fields.file.details.image!.width
        }
        objectFit="cover"
        alt={featuredImage.fields.description}
        priority
      />
      {featuredImage.fields.file.details.image!.height < 600 && <span id="shadow"></span>}
    </Container>
  );
}

type ContainerProps = {
  project: IProject;
  width: number | undefined;
};

const Container = styled.div<ContainerProps>`
  position: relative;
  height: 700px;
  width: 100vw;
  background: ${({ project }) => project.fields.backgroundColor};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #shadow {
    height: 80px;
    width: ${({ project, width }) =>
      `${
        width! < 1100
          ? project.fields.featuredImage.fields.file.details.image!.width / 2
          : project.fields.featuredImage.fields.file.details.image!.width
      }px`};
    background: radial-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.05) 60%);
    border-radius: 50%;
    transform: rotateX(60deg);
    filter: blur(10px);
  }
  @media screen and (max-width: 1100px) {
    height: 400px;
  }
`;

const Image = styled(NextImage)`
  width: 100%;
  background: transparent;
`;
