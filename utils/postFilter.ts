import { IPost } from "types/generated/contentful";
import { deDupPosts } from "./deDupPosts";

export const postFilter = (posts: IPost[], topic: string) => {
  const temp = [...posts];
  const filteredOnTopic = temp.filter((post) => post.fields.topic === topic);
  const filteredOnTag = temp.filter((post) => post.fields.tagId.includes(topic.toLowerCase()));
  return deDupPosts([...filteredOnTopic, ...filteredOnTag]);
};
