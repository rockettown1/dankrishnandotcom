import { useState, useEffect } from "react";
import styled from "styled-components";
import client from "cms/contentfulClient";
import { BlogMain, BlogRecent } from "components/blog";
import { IFeaturedPostFields, IPostFields, IPost } from "types/generated/contentful";

export async function getStaticProps() {
  const { items } = await client.getEntries<IPostFields>({
    content_type: "post",
    order: "-fields.date",
  });
  const featuredPost = await client.getEntry<IFeaturedPostFields>("7wj3RCdFgxPSHX3OMTnpc9");

  //make a list of all the unique topics

  const mySet = new Set(items);

  const getTopics: Map<string, boolean> = new Map();
  for (let post of items) {
    if (!getTopics.has(post.fields.topic)) {
      getTopics.set(post.fields.topic, true);
    }
  }

  //filter to get the first four, but ignoring the featured post while doing it.
  const firstFourPosts = [
    ...items.filter((post) => post.fields.title !== featuredPost.fields.post.fields.title),
  ].splice(0, 4);

  return {
    props: {
      posts: items,
      featuredPost: featuredPost.fields.post.fields,
      firstFourPosts: firstFourPosts,
      topics: Array.from(getTopics.keys()),
    },
    revalidate: 10,
  };
}

type Topics = IPostFields["topic"];

type Props = {
  posts: IPost[];
  featuredPost: IPostFields;
  firstFourPosts: IPost[];
  topics: Topics[];
};

export default function Blog({ posts, featuredPost, firstFourPosts, topics }: Props) {
  const [menuFixed, setMenuFixed] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!posts) return <h1>Loading...</h1>;

  const props = {
    menuFixed,
    setMenuFixed,
    featuredPost,
  };

  return (
    <Container>
      <BlogMain {...props} firstFour={firstFourPosts} />
      <BlogRecent {...props} posts={posts} topics={topics} />
    </Container>
  );
}

const Container = styled.section`
  height: 100vh;
  width: 100vw;
`;
