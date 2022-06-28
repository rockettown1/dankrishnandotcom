import laptop1 from "../public/laptop1.jpg";
import laptop3 from "../public/laptop3.jpg";

export const data = [
  {
    item: "01",
    title: "Full stack stuff",
    desc: `Projects that involve work across the whole stack and usually some devops/architecture considerations`,
    link: "/work/fullstack",
    img: laptop1,
    available: true,
  },
  {
    item: "02",
    title: "Front-end stuff",
    desc: `Projects that focus specifically on front-end development`,
    link: "/work/frontend",
    img: laptop3,
    available: true,
  },
  {
    item: "03",
    title: "Design stuff",
    desc: `Any projects that involve design work`,
    link: "/work/design",
    img: laptop1,
    available: false,
  },
  {
    item: "04",
    title: "Tooling stuff",
    desc: `Projects that involve tooling or processes, mainly CLI development or design systems`,
    link: "/work/tooling",
    img: laptop1,
    available: false,
  },
  {
    item: "05",
    title: "Random stuff",
    desc: `Just random projects, like creating new fonts or npm packages`,
    link: "/work/random",
    img: laptop1,
    available: false,
  },
];
