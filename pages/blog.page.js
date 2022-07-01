import { useState } from "react";
import styled from "styled-components";
import BlogMain from "../components/blog/BlogMain";
import BlogRecent from "../components/blog/BlogRecent";

export default function Blog() {
  const [menuFixed, setMenuFixed] = useState(false);
  return (
    <Container>
      <BlogMain menuFixed={menuFixed} setMenuFixed={setMenuFixed} />
      <BlogRecent menuFixed={menuFixed} setMenuFixed={setMenuFixed} />
    </Container>
  );
}

const Container = styled.section`
  height: 100vh;
  width: 100vw;
`;

const Section = styled.section`
  height: 100vh;
  width: 100vw;
`;
