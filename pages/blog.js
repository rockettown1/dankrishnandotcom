import styled from "styled-components";

export default function Blog() {
  return (
    <Container>
      <h1>Blog Page</h1>
      <p>Testing release-please github action.</p>
    </Container>
  );
}

const Container = styled.section`
  padding-top: 100px;
  height: 100vh;
  width: 100vw;
`;
