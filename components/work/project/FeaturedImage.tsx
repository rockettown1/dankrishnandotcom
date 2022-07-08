import React from "react";
import styled from "styled-components";
import NextImage from "next/image";
import { IProject } from "types/generated/contentful";

export default function FeaturedImage({ project }: { project: IProject }) {
  const { featuredImage } = project.fields;
  return (
    <Container project={project}>
      <Image
        src={`http:${featuredImage.fields.file.url}`}
        height={featuredImage.fields.file.details.image.height}
        width={featuredImage.fields.file.details.image.width}
        objectFit="cover"
        alt={featuredImage.fields.description}
      />
      {featuredImage.fields.file.details.image.height < 600 && <span id="shadow"></span>}
    </Container>
  );
}

type ContainerProps = {
  project: IProject;
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
    width: ${({ project }) => `${project.fields.featuredImage.fields.file.details.image.width - 50}px`};
    background: radial-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.05) 60%);
    border-radius: 50%;
    transform: rotateX(60deg);
    filter: blur(10px);
  }
`;

const Image = styled(NextImage)`
  width: 100%;
  background: transparent;
`;
