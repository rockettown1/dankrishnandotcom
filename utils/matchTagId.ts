import { IPost } from "types/generated/contentful";

export const matchTagId = (posts: IPost[], input: string) => {
  const matches: IPost[] = [];

  for (let post of posts) {
    for (let tag of post.fields.tagId) {
      if (tag.toLowerCase() === input.toLowerCase()) {
        matches.push(post);
      }
    }
  }
  return matches;
};
