import { useState } from "react";
import styled from "styled-components";
import { BlogMain, BlogRecent } from "../components/blog";

export default function Blog() {
  const [menuFixed, setMenuFixed] = useState(false);

  const props = {
    menuFixed,
    setMenuFixed,
  };

  return (
    <Container>
      <BlogMain {...props} />
      <BlogRecent {...props} />
    </Container>
  );
}

const Container = styled.section`
  height: 100vh;
  width: 100vw;
`;
