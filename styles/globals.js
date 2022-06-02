import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
/* html {
  scroll-snap-type: mandatory;
  scroll-snap-points-y: repeat(100vh);
  scroll-snap-type: y mandatory;
} */
/* @font-face {
  font-family: 'Cal Sans';
  src: url('/fonts/calsans-semibold-webfont.woff2') format('woff2'),
  url("/fonts/calsans-semibold-webfont.woff") format('woff');
}
@font-face {
  font-family: "AllianceNo1-Light";
  src: url('/fonts/AllianceNo1Light.woff2') format('woff2'),
  url('/fonts/AllianceNo1Light.woff') format('woff');
} */

:root{
  --primary_highlight:rgb(255, 172, 20);
  --primary_font: "Cal Sans";
  --secondary_font: "AllianceNo1-Light";
}
* {
  box-sizing: border-box;
}
 body {
    padding: 0;
    margin: 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary_text};
    font-family: var(--primary_font);
    overscroll-behavior-y: none;
    overscroll-behavior: none;
    transition: all 0.50s linear;
    overflow-x: hidden;
    /* &::-webkit-scrollbar {
    display: none;
  } */
    p {
      font-family: var(--secondary_font);
      font-size: 2.5vh !important;
      line-height: 4vh !important;

        @media screen and (max-width: 1300px) {
        font-size: 17px !important;
        line-height: 20px !important;
      }
    }
  }
`;
