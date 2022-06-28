export type Project = {
  fields: {
    name: string;
    body: {};
    featuredImage?: ContentfulFeaturedImage;
    headline: string;
    description: string;
    slug: string;
    type: string;
    tech: {
      data: ProjectTech[];
    };
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
