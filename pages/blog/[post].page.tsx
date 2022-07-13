import { useRef, useState, useEffect } from "react";
import client from "cms/contentfulClient";
import styled from "styled-components";
import PostBody from "components/blog/PostBody";
import PostHero from "components/blog/PostHero";
import { GetStaticPropsContext } from "next";
import { IPost, IPostFields } from "types/generated/contentful";
import { Document } from "@contentful/rich-text-types";

export async function getStaticPaths() {
  const response = await client.getEntries({ content_type: "post" });

  const paths = response.items.map((item: any) => ({
    params: {
      post: item.fields.slug,
    },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}
export async function getStaticProps(ctx) {
  const response = await client.getEntries({
    content_type: "post",
    "fields.slug": ctx.params.post,
  });

  return {
    props: {
      post: response.items[0] || null,
    },
    revalidate: 10,
  };
}

export default function Post({ post }: { post: IPost }) {
  const [menuFixed, setMenuFixed] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeNumber, setLikeNumber] = useState<number>(12);

  if (!post) {
    return <h1>Loading...</h1>;
  }

  const { body } = post.fields;
  const headings = body.content
    .filter((node) => node.nodeType.includes("heading-1"))
    .map((node) => node.content[0].nodeType === "text" && node.content[0].value);

  return (
    <Container>
      <PostHero post={post} menuFixed={menuFixed} setMenuFixed={setMenuFixed} liked={liked} likeNumber={likeNumber} />
      <Body>
        <PostBody
          body={body}
          menuFixed={menuFixed}
          headings={headings}
          liked={liked}
          setLiked={setLiked}
          likeNumber={likeNumber}
          setLikeNumber={setLikeNumber}
        />
      </Body>
    </Container>
  );
}

const Container = styled.article`
  min-height: 100vh;
  width: 100vw;
`;

const Body = styled.section`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.secondary_background};
  padding-top: 30px;
`;
