import { gsap } from "gsap";

//index.js

export const moveToWork = (sectionEl) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      toggleActions: "play none reverse reverse",
      snap: 1,
      markers: true,
    },
  });
};

export const moveToNoise = (lastEl) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: lastEl,
      start: "top top-=20%",
      end: "bottom bottom",
      scrub: true,
      toggleActions: "play reverse play reverse",
      snap: 1,
    },
  });
};

export const fadeInOut = (trigger) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "top top+=30%",
      end: "bottom top",
      pinSpacing: false,
      scrub: true,
      toggleActions: "play reverse play reverse",
      markers: true,
      pin: true,
    },
  });
};

export const pinIt = (pin) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: pin,
      start: "top top+=30%",
      // end: "bottom top-=50%",
      scrub: true,
      toggleActions: "play reverse play reverse",
      markers: true,
      pin: true,
    },
  });
};
