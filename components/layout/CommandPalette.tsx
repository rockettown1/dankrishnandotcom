import React from "react";
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
  ActionImpl,
  ActionId,
  useRegisterActions,
} from "kbar";
import styled, { useTheme } from "styled-components";
import { MyTheme } from "styles/themes";

export default function CommandPalette() {
  const theme = useTheme() as MyTheme;

  return (
    <KBarPortal>
      <Container theme={theme}>
        <Animator>
          <Search theme={theme} />
          <RenderResults />
        </Animator>
      </Container>
    </KBarPortal>
  );
}

function RenderResults() {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div
            style={{
              margin: 0,
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              fontSize: "17px",
              fontFamily: "SF-Display-Light",
              textTransform: "uppercase",
              height: "60px",
            }}
          >
            {item}
          </div>
        ) : (
          <ResultItem action={item} active={active} currentRootActionId={rootActionId!} />
        )
      }
    />
  );
}

type ResultItemProps = {
  action: ActionImpl;
  active: boolean;
  currentRootActionId: ActionId;
};

function ResultItem({ action, active, currentRootActionId }: ResultItemProps) {
  return (
    <Res active={active}>
      <h3>{action.name}</h3>
      {action.shortcut ? <h3 id="shortcut">{action.shortcut}</h3> : <p>{action.subtitle}</p>}
    </Res>
  );
}

type ThemeProps = {
  theme: MyTheme;
};

type ContainerProps = ThemeProps;

const Container = styled(KBarPositioner)<ContainerProps>`
  z-index: 200;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  user-select: none;
`;

const Animator = styled(KBarAnimator)<ThemeProps>`
  min-width: 600px;
  color: ${({ theme }) => theme.secondary_text};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.background};
`;

const Search = styled(KBarSearch)<ThemeProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.secondary_text};
  height: 100px;
  border-radius: 5px;
  font-size: 20px;
  padding: 20px;
  border: none;
  outline: none;
`;

type ResProps = {
  active: boolean;
};
const Res = styled.div<ResProps>`
  background-color: ${({ active }) => active && "rgba(0,0,0,0.2)"};
  padding: 20px;
  display: flex;
  height: 50px !important;
  align-items: center;
  justify-content: space-between;

  #shortcut {
    background: rgba(0, 0, 0, 0.3);
    width: 30px;
    border-radius: 3px;
    text-align: center;
    padding: 3px 0;
  }

  p {
    font-size: 17px !important;
  }
`;
