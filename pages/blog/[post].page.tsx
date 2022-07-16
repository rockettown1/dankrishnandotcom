import { useState, useEffect } from "react";
import client from "cms/contentfulClient";
import styled from "styled-components";
import PostBody from "components/blog/PostBody";
import PostHero from "components/blog/PostHero";
import { prisma } from "prisma";
import Router from "next/router";
import { IPost, IPostFields } from "types/generated/contentful";
import { fetcher } from "utils";
import { GetStaticPropsContext } from "next";
import useSWR from "swr";

export async function getStaticPaths() {
  const response = await client.getEntries<IPost>({ content_type: "post" });

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
export async function getStaticProps(ctx: GetStaticPropsContext) {
  const response = await client.getEntries<IPostFields>({
    content_type: "post",
    "fields.slug": ctx.params!.post,
  });

  console.log("RESPONSE", response);

  const post = response.items[0];

  if (post) {
    try {
      //if the post is new (picked up during ISR) then add it to the database
      await prisma.posts.upsert({
        where: { contentfulId: post.sys.id },
        update: {},
        create: {
          likes: post.fields.migratedLikes || 0,
          title: post.fields.title,
          contentfulId: post.sys.id,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      prisma.$disconnect();
    }
  }

  return {
    props: {
      post: post || null,
    },
    revalidate: 10,
  };
}

export default function Post({ post }: { post: IPost }) {
  const [menuFixed, setMenuFixed] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeNumber, setLikeNumber] = useState<number | null>(null);
  console.log(post);
  // GET request for post likes on render
  const { data, error } = useSWR(`/getlikes?id=${post.sys.id}`, fetcher);

  useEffect(() => {
    if (data) {
      setLikeNumber(data.payload);
    }
  }, [data]);

  // POST request to update likes in the database when user navigates away
  useEffect(() => {
    const updatePostLikes = async () => {
      if (liked) {
        await fetcher("/updatelikes", { id: post.sys.id, likes: likeNumber });
      }
    };

    window.addEventListener("beforeunload", updatePostLikes);
    Router.events.on("routeChangeStart", updatePostLikes);
    return () => {
      window.removeEventListener("beforeunload", updatePostLikes);
      Router.events.off("routeChangeStart", updatePostLikes);
    };
  }, [liked]);

  const { body } = post.fields;

  //Collect headings from post body
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
          headings={headings as string[]}
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
