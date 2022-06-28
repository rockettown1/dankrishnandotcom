import { TechList } from "../utils/sortTech";
import { Project, ContentfulFeaturedImage } from "../types/Project";

export const mockTechList: TechList = {
  fields: {
    tech: [
      {
        fields: {
          title: "",
          description: "",
          file: { url: "" },
        },
        metadata: {
          tags: [{ sys: { id: "tech2" } }],
        },
      },
      {
        fields: {
          title: "",
          description: "",
          file: { url: "" },
        },
        metadata: {
          tags: [{ sys: { id: "tech3" } }],
        },
      },
      {
        fields: {
          title: "",
          description: "",
          file: { url: "" },
        },
        metadata: {
          tags: [{ sys: { id: "tech1" } }],
        },
      },
      {
        fields: {
          title: "",
          description: "",
          file: { url: "" },
        },
        metadata: {
          tags: [{ sys: { id: "tech2" } }],
        },
      },
      {
        fields: {
          title: "",
          description: "",
          file: { url: "" },
        },
        metadata: {
          tags: [{ sys: { id: "tech5" } }],
        },
      },
    ],
  },
};

export const mockProjects: Project[] = [
  {
    fields: {
      name: "Project 1",
      body: {},
      headline: "Project headline",
      description: "Project description",
      slug: "/project",
      type: "Fullstack",
      tech: {
        data: [{ type: "AWS", sub: ["Amplify", "Cloudfront"] }],
      },
    },
    metadata: {},
    sys: {},
  },
  {
    fields: {
      name: "Project 2",
      body: {},
      headline: "Project headline",
      description: "Project description",
      slug: "/project",
      type: "Fullstack",
      tech: {
        data: [{ type: "AWS", sub: ["Amplify", "Cloudfront"] }],
      },
    },
    metadata: {},
    sys: {},
  },
  {
    fields: {
      name: "Project 3",
      body: {},
      headline: "Project headline",
      description: "Project description",
      slug: "/project",
      type: "Fullstack",
      tech: {
        data: [{ type: "AWS", sub: ["Amplify", "Cloudfront"] }],
      },
    },
    metadata: {},
    sys: {},
  },
];
