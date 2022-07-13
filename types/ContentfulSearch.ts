import { IPost } from "./generated/contentful";

export interface ContentfulSearchResult {
  results: IPost[];
  msg: string;
}
