import { ThemeProvider } from "styled-components";
import { lightTheme } from "../styles/themes";

export const withTheme = (Component) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component />
    </ThemeProvider>
  );
};
