import React from "react";
import Section from "../../components/work/Section";
import { data } from "../../data/work";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Contents from "../../components/work/Contents";
import Link from "next/link";
import { client } from "../../cms/contentfulClient";
import { countSlash } from "../../utils/countSlash";

export async function getStaticProps() {
  const { items } = await client.getEntries({ content_type: "project", "fields.type": "frontend" });
  return {
    props: {
      projects: items,
    },
  };
}

export default function Frontend({ projects }) {
  const router = useRouter();
  return (
    <Container>
      <Section data={data[1]} main exitToMain={countSlash(router.pathname) < 2} />
      <Contents>
        <h6>Selected Projects</h6>
        {projects.reverse().map((project, index) => {
          return (
            <StyledLink href={`/work/frontend/${project.fields.slug}`} key={index}>
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
