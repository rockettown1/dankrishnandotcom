import styled from "styled-components";
import ProjectHero from "../../../components/work/ProjectHero";
import { client } from "../../../utils/contentfulClient";
import { richTextOptions } from "../../../utils/richTextOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import NextImage from "next/image";
import Markdown from "react-markdown";

export async function getStaticPaths() {
  const response = await client.getEntries({ content_type: "project", "fields.type": "frontend" });
  console.log(response.items);
  const paths = response.items.map((item) => ({
    params: {
      project: item.fields.slug,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
export async function getStaticProps(ctx) {
  const { items } = await client.getEntries({
    content_type: "project",
    "fields.slug": ctx.params.project,
  });

  return {
    props: {
      project: items[0],
    },
  };
}

const Project = ({ project }) => {
  return (
    <Container project={project}>
      <ProjectHero project={project} />
      <div id="body-container">
        {project.fields.featuredImage && (
          <div id="img-container">
            <Image
              src={`http:${project.fields.featuredImage.fields.file.url}`}
              height={project.fields.featuredImage.fields.file.details.image.height}
              width={project.fields.featuredImage.fields.file.details.image.width}
              objectFit="contain"
              alt={project.fields.featuredImage.fields.description}
            />
            <span id="shadow"></span>
          </div>
        )}
        <TextSection>
          <div id="heading">
            <h2>{project.fields.textblock[0].fields.heading}</h2>
          </div>
          <div id="paragraph">
            <Markdown>{project.fields.textblock[0].fields.paragraph}</Markdown>
          </div>
        </TextSection>
        <Body>{documentToReactComponents(project.fields.body, richTextOptions)}</Body>
      </div>
    </Container>
  );
};

export default Project;

const Container = styled.section`
  height: 100vh;
  width: 100vw;

  p {
    font-size: 20px !important;
    line-height: 30px !important;
  }
  #body-container {
    position: relative;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.secondary_background};
  }

  #img-container {
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
      width: ${({ project }) => `${project.fields.featuredImage.fields.file.details.image.width - 100}px`};
      background: radial-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.05) 60%);
      border-radius: 50%;
      transform: rotateX(60deg);
      filter: blur(10px);
    }
  }
`;

const Body = styled.div`
  margin-top: 50px;
  position: relative;
  min-height: 100vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1000px) {
    max-width: 700px;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const TextSection = styled.section`
  width: 100vw;
  padding: 60px 20vw;
  background-color: ${({ theme }) => theme.background};
  display: flex;

  #heading {
    width: 30%;
  }
  #paragraph {
    width: 70%;
  }
  h2 {
    width: 100%;
  }
  p {
    width: 100%;
    padding-left: 40px;
  }
`;

const Image = styled(NextImage)`
  width: 100%;
`;
