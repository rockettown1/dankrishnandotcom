import { Entry } from "contentful";
import { listeners } from "process";
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
  const list = Object.values(hashMap) as IPost[];
  for (let date of list) {
    console.log(date.fields.date);
  }
  console.log("Date", new Date(Date.now()).toISOString());

  return list
    .sort(function (a, b) {
      return a.fields.date!.localeCompare(b.fields.date!);
    })
    .reverse();
};
