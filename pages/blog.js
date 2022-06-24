import styled from "styled-components";

export default function Blog() {
  return (
    <Container>
      <h1>Blog Page</h1>
      <p>Content will go here</p>
    </Container>
  );
}

const Container = styled.section`
  padding-top: 100px;
  height: 100vh;
  width: 100vw;
`;
