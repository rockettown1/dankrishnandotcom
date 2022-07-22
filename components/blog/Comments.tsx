import { RefObject, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { MyTheme } from "styles/themes";

export default function Comments() {
  const commentBox = useRef<HTMLDivElement>(null);
  const { name: themeType } = useTheme() as MyTheme;

  const createUtterancesScript = (theme: string) => {
    let scriptEl = document.createElement("script");
    scriptEl.setAttribute("src", "https://utteranc.es/client.js");
    scriptEl.setAttribute("crossorigin", "anonymous");
    scriptEl.setAttribute("async", "true");
    scriptEl.setAttribute("repo", "rockettown1/comments.dankrishnandotcom");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute("theme", theme === "dark" ? "github-dark" : "github-light");
    return scriptEl;
  };

  useEffect(() => {
    /*
    manipulate DOM (remove and re-add) when theme changes (the only time this effect re-runs)
    Seems a bit unidiomatic doing it this way so will revisit this
    */
    const utteranceBox = document.getElementsByClassName("utterances")[0];
    if (utteranceBox) {
      commentBox.current!.removeChild(utteranceBox);
    }

    let scriptEl = createUtterancesScript(themeType);

    if (commentBox.current!.children.length === 0) {
      commentBox.current!.appendChild(scriptEl);
    }
  }, [themeType]);

  return (
    <Container>
      <div ref={commentBox}></div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 100px;
`;
