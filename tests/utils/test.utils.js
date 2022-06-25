import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/themes";

export function withTheme(Component) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component />
    </ThemeProvider>
  );
}
