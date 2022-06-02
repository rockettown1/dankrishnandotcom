import React from "react";
import Section from "../../components/work/Section";
import { data } from "../../data/work";
import styled from "styled-components";
import Arrow from "../../components/layout/Arrow.svg";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Fullstack() {
  return (
    <Container>
      <Section data={data[0]} main />
      <div style={{ height: "200vh" }}>
        {" "}
        <h1>More stuff</h1>
      </div>
    </Container>
  );
}

const Container = styled.div``;
