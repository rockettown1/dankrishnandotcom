import { useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { MyTheme } from "styles/themes";

export default function Comments() {
  const commentBox = useRef(null);
  const theme = useTheme() as MyTheme;

  useEffect(() => {
    let scriptEl = document.createElement("script");
    scriptEl.setAttribute("src", "https://utteranc.es/client.js");
    scriptEl.setAttribute("crossorigin", "anonymous");
    scriptEl.setAttribute("async", "true");
    scriptEl.setAttribute("repo", "rockettown1/comments.dankrishnandotcom");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute("theme", theme.name === "dark" ? "github-dark" : "github-light");
    if (commentBox.current.children.length === 0) {
      commentBox.current.appendChild(scriptEl);
    }
  }, []);

  return (
    <Container>
      <div ref={commentBox}></div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
