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
