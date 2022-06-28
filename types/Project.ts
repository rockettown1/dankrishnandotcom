export type Project = {
  fields: {
    name: string;
    body?: {
      content: [
        {
          content: [{ data: any; marks: []; nodeType: string; value: string }];
          data: any;
          nodeType: string;
        }
      ];
      data: any;
      nodeType: string;
    };
    featuredImage?: ContentfulFeaturedImage;
    headline: string;
    description: string;
    slug: string;
    type: string;
    tech: {
      data: ProjectTech[];
    };
    textblock: TextBlock;
  };
  metadata: {};
  sys: {};
};

type ProjectTech = {
  type: string;
  sub: string[];
};

export type ContentfulFeaturedImage = {
  fields: {
    title: string;
    description: string;
    file: {
      contentType: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      url: string;
    };
  };
  metadata: {};
  sys: {};
};

type TextBlock = [
  {
    fields: {
      heading: string;
      name: string;
      paragraph: string;
      type: string;
    };
    metadata: {
      tags: [];
    };
    sys: {
      contentType: {
        sys: {
          id: string;
          linkType: string;
          type: string;
        };
      };
    };
  }
];
