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
      body: {
        content: [
          {
            content: [{ data: {}, marks: [], nodeType: "text", value: "Technical Discussion" }],
            data: {},
            nodeType: "heading-1",
          },
        ],
        data: {},
        nodeType: "document",
      },
      featuredImage: {
        fields: {
          title: "Test featured image",
          description: "imaginary image",
          file: {
            contentType: "image/png",
            details: {
              size: 13323,
              image: {
                width: 900,
                height: 900,
              },
            },
            fileName: "test file name",
            url: "http://testimage.test",
          },
        },
        metadata: {},
        sys: {},
      },
      headline: "Project headline",
      description: "Project description",
      slug: "/project",
      type: "fullstack",
      tech: {
        data: [
          { type: "React.js", sub: [] },
          { type: "Next.js", sub: [] },
          { type: "AWS", sub: ["Amplify", "Cloudfront"] },
        ],
      },
      textblock: [
        {
          fields: {
            heading: "Text block heading",
            name: "Text block name",
            paragraph: "Text block paragraph",
            type: "mainText",
          },
          metadata: {
            tags: [],
          },
          sys: {
            contentType: {
              sys: {
                id: "textBlockWithTitle",
                linkType: "contentType",
                type: "Link",
              },
            },
          },
        },
      ],
    },
    metadata: {},
    sys: {},
  },
  {
    fields: {
      name: "Project 2",
      headline: "Project headline",
      description: "Project description",
      slug: "/project",
      type: "fullstack",
      tech: {
        data: [{ type: "AWS", sub: ["Amplify", "Cloudfront"] }],
      },
      textblock: [
        {
          fields: {
            heading: "Some type of heading",
            name: "Project name",
            paragraph: "Paragraph of information",
            type: "mainText",
          },
          metadata: {
            tags: [],
          },
          sys: {
            contentType: {
              sys: {
                id: "textBlockWithTitle",
                linkType: "contentType",
                type: "Link",
              },
            },
          },
        },
      ],
    },
    metadata: {},
    sys: {},
  },
  {
    fields: {
      name: "Project 3",
      headline: "Project headline",
      description: "Project description",
      slug: "/project",
      type: "fullstack",
      tech: {
        data: [{ type: "AWS", sub: ["Amplify", "Cloudfront"] }],
      },
      textblock: [
        {
          fields: {
            heading: "Some type of heading",
            name: "Project name",
            paragraph: "Paragraph of information",
            type: "mainText",
          },
          metadata: {
            tags: [],
          },
          sys: {
            contentType: {
              sys: {
                id: "textBlockWithTitle",
                linkType: "contentType",
                type: "Link",
              },
            },
          },
        },
      ],
    },
    metadata: {},
    sys: {},
  },
  {
    fields: {
      name: "Project 4",
      headline: "Project headline",
      description: "Project description",
      slug: "/project",
      type: "frontend",
      tech: {
        data: [{ type: "AWS", sub: ["Amplify", "Cloudfront"] }],
      },
      textblock: [
        {
          fields: {
            heading: "Some type of heading",
            name: "Project name",
            paragraph: "Paragraph of information",
            type: "mainText",
          },
          metadata: {
            tags: [],
          },
          sys: {
            contentType: {
              sys: {
                id: "textBlockWithTitle",
                linkType: "contentType",
                type: "Link",
              },
            },
          },
        },
      ],
    },
    metadata: {},
    sys: {},
  },
  {
    fields: {
      name: "Project 5",
      headline: "Project headline",
      description: "Project description",
      slug: "/project",
      type: "frontend",
      tech: {
        data: [{ type: "AWS", sub: ["Amplify", "Cloudfront"] }],
      },
      textblock: [
        {
          fields: {
            heading: "Some type of heading",
            name: "Project name",
            paragraph: "Paragraph of information",
            type: "mainText",
          },
          metadata: {
            tags: [],
          },
          sys: {
            contentType: {
              sys: {
                id: "textBlockWithTitle",
                linkType: "contentType",
                type: "Link",
              },
            },
          },
        },
      ],
    },
    metadata: {},
    sys: {},
  },
  {
    fields: {
      name: "Project 6",
      headline: "Project headline",
      description: "Project description",
      slug: "/project",
      type: "frontend",
      tech: {
        data: [
          { type: "React.js", sub: [] },
          { type: "Next.js", sub: [] },
          { type: "AWS", sub: ["Amplify", "Cloudfront"] },
        ],
      },
      textblock: [
        {
          fields: {
            heading: "Some type of heading",
            name: "Project name",
            paragraph: "Paragraph of information",
            type: "mainText",
          },
          metadata: {
            tags: [],
          },
          sys: {
            contentType: {
              sys: {
                id: "textBlockWithTitle",
                linkType: "contentType",
                type: "Link",
              },
            },
          },
        },
      ],
    },
    metadata: {},
    sys: {},
  },
];
