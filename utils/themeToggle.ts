import { darkTheme, lightTheme } from "styles/themes";

export const themeToggle = (root: any, theme: string) => {
  root.style.setProperty("--background", theme === "light" ? darkTheme.background : lightTheme.background);
  root.style.setProperty("--primary_text", theme === "light" ? darkTheme.primary_text : lightTheme.primary_text);
  root.style.setProperty("--secondary_text", theme === "light" ? darkTheme.secondary_text : lightTheme.secondary_text);
  // root.style.setProperty(
  //   "--secondary_background",
  //   theme === "light" ? darkTheme.secondary_background : lightTheme.secondary_background
  // );
  // root.style.setProperty("--primary_highlight", theme === "light" ? darkTheme.highlight : lightTheme.highlight);

  return root;
};
