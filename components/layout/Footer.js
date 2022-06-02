import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import Arrow from "./Arrow.svg";
import isBottom from "../../utils/useBottom";

// export default function Footer({ currentSection, setCurrentSection, scrollContainer }) {
//   const router = useRouter();
//   const sections = ["first", "second", "third"];
//   console.log(`#${router.pathname.replace("/", "") + currentSection}`);
//   useEffect(() => {
//     gsap.registerPlugin(ScrollToPlugin);
//   }, []);
//   return (
//     <Container
//       onClick={() => {
//         gsap.to(scrollContainer || window, {
//           duration: 2,
//           scrollTo: `#${router.pathname.replace("/", "") + currentSection}`,
//         });
//         setCurrentSection(
//           (prev) => sections[sections.indexOf(prev) < sections.length - 1 ? sections.indexOf(prev) + 1 : 0]
//         );
//       }}
//     >
//       <Info>
//         <Arrow spin={currentSection.includes("first")} />
//       </Info>
//     </Container>
//   );
// }
export default function Footer({ isBottom }) {
  return (
    <Container>
      <Info>
        <Arrow spin={isBottom} />
        {isBottom ? "You've reached the end" : "Scroll for more"}
      </Info>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 10px;

  box-sizing: border-box;
  p {
    margin: 0;
  }
`;

const Info = styled.h4`
  position: absolute;
  display: flex;
  z-index: 120;
  /* align-items: center; */
  flex-direction: column;
  bottom: 40px;
  left: 20px;
  color: rgba(255, 255, 255, 0.6);
`;
