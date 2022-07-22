import { Entry } from "contentful";
import { IPost } from "types/generated/contentful";
/*
    post objects are referentially differnt so can't use standard strategies for removing duplicate:s Sets, comparison and filter etc
    Creating a hashMap using post id's as strings will only add unique posts, then using Object.values to convert back to an array and return in the response
  */

export const deDupPosts = (arr: Entry<IPost>[] | IPost[]) => {
  const hashMap: { [k: string]: Entry<IPost> | IPost } = {};
  for (let post of arr) {
    if (!hashMap[post.sys.id]) {
      hashMap[post.sys.id] = post;
    }
  }

  return Object.values(hashMap);
};