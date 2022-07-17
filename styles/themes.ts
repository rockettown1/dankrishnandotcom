import { DefaultTheme } from "styled-components";

export interface MyTheme extends DefaultTheme {
  name: "light" | "dark";
  background: string;
  secondary_background: string;
  primary_text: string;
  secondary_text: string;
  highlight: string;
  disabled: string;
}

export const lightTheme: MyTheme = {
  name: "light",
  background: "#fff",
  secondary_background: "#fffcf7",
  primary_text: "rgb(43, 43, 43)",
  secondary_text: "#515151",
  highlight: "rgb(44, 185, 232)",
  disabled: "rgba(0,0,0,0.1)",
};

export const darkTheme: MyTheme = {
  name: "dark",
  background: "#080c11",
  secondary_background: "#0b1016",
  primary_text: "#c5d0d6",
  secondary_text: "#97a1a8",
  highlight: "rgb(255,172,20)",
  disabled: "rgba(255,255,255,0.1)",
};
