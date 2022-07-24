import React from "react";
import Head from "next/head";
import Section from "components/work/Section";
import Link from "next/link";
import { data } from "static/work_data";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Contents from "components/work/Contents";
import { countSlash } from "utils/countSlash";
import client from "cms/contentfulClient";
import { Project } from "types/Project";

export async function getStaticProps() {
  const { items } = await client.getEntries({ content_type: "project", "fields.type": "fullstack" });
  return {
    props: {
      projects: items,
    },
  };
}

type Props = {
  projects: Project[];
};

export default function Fullstack({ projects }: Props) {
  const router = useRouter();
  return (
    <Container>
      <Head>
        <title>Fullstack Projects</title>
        <meta name="description" content="DK: Fullstack Projects" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Fullstack Projects" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <Section data={data[1]} main exitToMain={countSlash(router.pathname) < 2} />
      <Contents>
        <h6>Selected Projects</h6>
        {projects?.reverse().map((project, index) => {
          return (
            <StyledLink href={`/work/fullstack/${project.fields.slug}`} key={index} scroll={false}>
              <h1>{project.fields.name}</h1>
            </StyledLink>
          );
        })}
      </Contents>
    </Container>
  );
}

const Container = styled(motion.div)``;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
