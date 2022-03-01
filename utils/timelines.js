import { gsap } from "gsap";

//index.js

export const moveToWork = (sectionEl) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      toggleActions: "play reverse play reverse",
    },
  });
};

export const moveToNoise = (lastEl) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: lastEl,
      start: "top top-=30%",
      end: "bottom botom",
      scrub: true,
      toggleActions: "play reverse play reverse",
    },
  });
};
