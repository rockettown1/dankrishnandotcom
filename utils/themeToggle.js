import { darkTheme, lightTheme } from "../styles/themes";

export const themeToggle = (root, theme, styles) => {
  root.style.setProperty("--background", theme === "light" ? darkTheme.background : lightTheme.background);
  root.style.setProperty("--primary_text", theme === "light" ? darkTheme.primary_text : lightTheme.primary_text);

  return root;
};
