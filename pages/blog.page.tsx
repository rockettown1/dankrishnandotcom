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

  const collectTopics = items.map((post) => post.fields.topic);
  console.log(collectTopics);

  const firstFourPosts = items.splice(0, 4);

  return {
    props: {
      posts: items,
      featuredPost: featuredPost.fields.post.fields,
      firstFourPosts: firstFourPosts,
      topics: collectTopics,
    },
  };
}

type Props = {
  posts: IPost[];
  featuredPost: IPostFields;
  firstFourPosts: IPost[];
  topics: string[];
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
