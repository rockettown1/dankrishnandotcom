import { IProject } from "./generated/contentful";

export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer InferredArrayMember>
  ? DeepPartialArray<InferredArrayMember>
  : T extends Object
  ? DeepPartialObject<T>
  : T | undefined;

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = {
  [Key in keyof T]?: DeepPartial<T[Key]>;
};

export type Project = Pick<IProject, "fields" | "metadata" | "sys">;
// export type Project = {
//   fields: {
//     name: string;
//     body?: {
//       content: [
//         {
//           content: [{ data: any; marks: []; nodeType: string; value: string }];
//           data: any;
//           nodeType: string;
//         }
//       ];
//       data: any;
//       nodeType: string;
//     };
//     featuredImage?: ContentfulFeaturedImage;
//     headline: string;
//     description: string;
//     slug: string;
//     type: string;
//     tech: {
//       data: ProjectTech[];
//     };
//     textblock: TextBlock;
//   };
//   metadata: {};
//   sys: {};
// };

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
