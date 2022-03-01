import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
/* html {
  scroll-snap-type: mandatory;
  scroll-snap-points-y: repeat(100vh);
  scroll-snap-type: y mandatory;
} */

 body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: #010712;
    color: white;
    font-family: "Raleway";
    overscroll-behavior-y: none;
    /* overflow: hidden; */
    /* &::-webkit-scrollbar {
    display: none;
  } */
  
  }
`;
