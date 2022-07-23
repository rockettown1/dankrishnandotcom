import { Action } from "kbar";
import Router from "next/router";

const actions: Action[] = [
  {
    id: "home",
    name: "Home",
    shortcut: ["i"],
    keywords: "index main",
    perform: () => {
      Router.push("/");
    },
    section: "Navigation",
  },
  {
    id: "hello",
    name: "Hello",
    shortcut: ["h"],
    keywords: "bio about",
    perform: () => {
      Router.push("/hello");
    },
    section: "Navigation",
  },
  {
    id: "work",
    name: "Work",
    shortcut: ["w"],
    keywords: "projects work",
    perform: () => {
      Router.push("/work");
    },
    section: "Navigation",
  },

  {
    id: "blog",
    name: "Blog",
    shortcut: ["b"],
    keywords: "articles",
    perform: () => {
      Router.push("/blog");
    },
    section: "Navigation",
    subtitle: "Read my blog posts",
  },
  {
    id: "github",
    name: "GitHub",
    keywords: "gh code",
    perform: () => {
      open("https://github.com/rockettown1", "_blank");
    },
    section: "External Links",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    keywords: "dc message dm",
    perform: () => {
      open("https://linkedin.com/in/dankrishnan", "_blank");
    },
    section: "External Links",
    subtitle: "Feel free to message me",
  },
];

export default actions;
