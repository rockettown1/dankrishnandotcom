import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/themes";

export const withTheme = (Component: React.FunctionComponent, theme?: string) => {
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Component />
    </ThemeProvider>
  );
};
