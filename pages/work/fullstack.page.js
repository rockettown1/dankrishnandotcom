import React from "react";
import Section from "../../components/work/Section";
import Link from "next/link";
import { data } from "../../static/work_data";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Contents from "../../components/work/Contents";
import { countSlash } from "../../utils/countSlash";
import client from "../../cms/contentfulClient";

export async function getStaticProps() {
  const { items } = await client.getEntries({ content_type: "project", "fields.type": "fullstack" });
  return {
    props: {
      projects: items,
    },
  };
}

export default function Fullstack({ projects }) {
  const router = useRouter();

  return (
    <Container>
      <Section data={data[1]} main exitToMain={countSlash(router.pathname) < 2} />
      <Contents>
        <h6>Selected Projects</h6>
        {projects.reverse().map((project, index) => {
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
