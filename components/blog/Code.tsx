import { useState } from "react";
import styled from "styled-components";
import { NodeData } from "@contentful/rich-text-types";

export default function Code({ node }: { node: NodeData }) {
  const [check, setCheck] = useState<boolean>(true);
  const { code, language, code2, language2, pair } = node.data.target.fields;

  return (
    <TabsContainer $check={check} pair={pair}>
      {pair && (
        <Tabs $check={check}>
          <h4
            id="lang1"
            onClick={() => {
              setCheck(true);
            }}
          >
            {language}
          </h4>
          <h4
            id="lang2"
            onClick={() => {
              setCheck(false);
            }}
          >
            {language2}
          </h4>
        </Tabs>
      )}

      <pre id="code1">
        <Syntax pair={pair} className={`language-${language}`}>
          {code}
        </Syntax>
      </pre>

      <pre id="code2">
        <Syntax pair={pair} className={`language-${language2}`}>
          {code2}
        </Syntax>
      </pre>
    </TabsContainer>
  );
}

type SyntaxProps = {
  pair: boolean;
};

const Syntax = styled.code<SyntaxProps>`
  background-color: #080c11;
  font-size: 17px;
`;

type TabsContainerProps = {
  $check: boolean;
  pair: boolean;
};
const TabsContainer = styled.div<TabsContainerProps>`
  margin: 30px 0;
  pre {
    margin: 0;
    padding: 30px 0;
    background-color: #080c11;
    border-radius: 5px;
    border-top-left-radius: ${({ pair }) => (pair ? "0px" : "5px")};
  }
  h4 {
    padding: 10px;
    margin: 0;
    cursor: pointer;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  #code1 {
    display: ${({ $check }) => ($check ? "block" : "none")};
  }
  #code2 {
    display: ${({ $check }) => (!$check ? "block" : "none")};
  }
`;

type TabsProps = {
  $check: boolean;
};
const Tabs = styled.div<TabsProps>`
  display: flex;

  #lang1 {
    ${({ theme, $check }) =>
      $check
        ? `background-color: #080c11; color: rgba(255,255,255,0.7);`
        : `background-color: ${theme.secondary_background}; color: ${theme.primary_text};`}
  }
  #lang2 {
    ${({ theme, $check }) =>
      !$check
        ? `background-color: #080c11; color:  rgba(255,255,255,0.7);`
        : `background-color: ${theme.secondary_background}; color: ${theme.primary_text};`}
  }
`;
