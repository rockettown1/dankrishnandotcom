import React from "react";
import { ThemeProvider } from "styled-components";
import NextRouter from "next/router";
import { darkTheme, lightTheme } from "../styles/themes";

export const withTheme = (Component: React.FunctionComponent, theme?: "dark") => {
  return (props: any) => {
    return (
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };
};

export const withRouter = (Component: React.FunctionComponent): React.FunctionComponent => {
  return (props) => {
    const useRouter = jest.spyOn(NextRouter, "useRouter" as any);

    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));

    return <Component {...props} />;
  };
};
