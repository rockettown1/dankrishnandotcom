import { ReactNode, useLayoutEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import ProjectHero from "components/work/ProjectHero";
import client from "cms/contentfulClient";
import { richTextOptions } from "utils";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Markdown from "react-markdown";
import FeaturedImage from "components/work/project/FeaturedImage";
import { IProjectFields } from "types/generated/contentful";
import { GetStaticPropsContext } from "next";
import { Project } from "types/Project";

export async function getStaticPaths() {
  const response = await client.getEntries<IProjectFields>({ content_type: "project", "fields.type": "fullstack" });

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
export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { items } = await client.getEntries<IProjectFields>({
    content_type: "project",
    "fields.slug": ctx.params!.project,
  });

  return {
    props: {
      project: items[0],
    },
  };
}

type Props = {
  project: Project;
};

export default function ProjectPage({ project }: Props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { featuredImage, textblock, body } = project.fields;

  return (
    <Container>
      <Head>
        <title>{project.fields.name} - Project</title>
        <meta name="description" content={project.fields.description} />
        <meta property="og:title" content={`${project.fields.name} - Project`} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <ProjectHero project={project} />
      <div id="body-container">
        {featuredImage && <FeaturedImage project={project} />}
        <TextSection>
          <div id="heading">
            <h2>{textblock![0].fields.heading as ReactNode}</h2>
          </div>
          <div id="paragraph">
            <Markdown>{textblock![0].fields.paragraph as string}</Markdown>
          </div>
        </TextSection>
        <Body>{documentToReactComponents(body!, richTextOptions)}</Body>
      </div>
    </Container>
  );
}

const Container = styled.section`
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
  @media screen and (max-width: 1000px) {
    padding: 50px 30px;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    p {
      padding: 0;
    }
    #paragraph,
    #heading {
      width: 100%;
    }
  }
`;
