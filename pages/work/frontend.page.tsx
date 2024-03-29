import React from "react";
import Head from "next/head";
import Section from "components/work/Section";
import { data } from "static/work_data";
import styled from "styled-components";
import { useRouter } from "next/router";
import Contents from "components/work/Contents";
import Link from "next/link";
import client from "cms/contentfulClient";
import { countSlash } from "utils/countSlash";
import { Project } from "types/Project";

export async function getStaticProps() {
  const { items } = await client.getEntries({ content_type: "project", "fields.type": "frontend" });
  return {
    props: {
      projects: items,
    },
  };
}

type Props = {
  projects: Project[];
};

export default function Frontend({ projects }: Props) {
  const router = useRouter();

  return (
    <Container>
      <Head>
        <title>Frontend Projects</title>
        <meta name="description" content="DK: Frontend Projects" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Frontend Projects" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <Section data={data[0]} main exitToMain={countSlash(router.pathname) < 2} />
      <Contents>
        <h6>Selected Projects</h6>
        {projects.map((project, index) => {
          return (
            <StyledLink href={`/work/frontend/${project.fields.slug}`} key={index} scroll={false}>
              <h1>{project.fields.name}</h1>
            </StyledLink>
          );
        })}
      </Contents>
    </Container>
  );
}

const Container = styled.div``;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
