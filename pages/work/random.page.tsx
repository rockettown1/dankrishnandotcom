import React, { useEffect } from "react";
import Section from "components/work/Section";
import { data } from "static/work_data";
import styled from "styled-components";
import Link from "next/link";

export default function Random() {
  return (
    <Container>
      <Section data={data[4]} main />
      <Link href="/work" scroll={false}>
        Tester
      </Link>
      <div style={{ height: "200vh" }}>
        {" "}
        <h1>More stuff</h1>
      </div>
    </Container>
  );
}

const Container = styled.div``;
