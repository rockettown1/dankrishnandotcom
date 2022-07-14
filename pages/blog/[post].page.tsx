import { useState, useEffect } from "react";
import client from "cms/contentfulClient";
import styled from "styled-components";
import PostBody from "components/blog/PostBody";
import PostHero from "components/blog/PostHero";
import { prisma } from "prisma";
import Router from "next/router";
import { IPost, IPostFields } from "types/generated/contentful";
import { fetcher } from "utils";

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
  const response = await client.getEntries<IPostFields>({
    content_type: "post",
    "fields.slug": ctx.params.post,
  });

  const post = response.items[0];
  let data: { likes: number } = { likes: 0 };

  //adding migrated like count to the post database when a new post is added to Contentful
  if (post) {
    try {
      await prisma.posts.upsert({
        where: { contentfulId: post.sys.id },
        update: {},
        create: {
          likes: post.fields.migratedLikes || 0,
          title: post.fields.title,
          contentfulId: post.sys.id,
        },
      });

      data = await prisma.posts.findUnique({
        where: {
          contentfulId: post.sys.id,
        },
        select: {
          likes: true,
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
      likes: data.likes,
    },
    revalidate: 10,
  };
}

export default function Post({ post, likes }: { post: IPost; likes: number }) {
  const [menuFixed, setMenuFixed] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeNumber, setLikeNumber] = useState<number>(likes);

  if (!post) {
    return <h1>Loading...</h1>;
  }

  const { body } = post.fields;
  const headings = body.content
    .filter((node) => node.nodeType.includes("heading-1"))
    .map((node) => node.content[0].nodeType === "text" && node.content[0].value);

  useEffect(() => {
    // POST request to updated likes in the database
    const updatePostLikes = async () => {
      if (liked) {
        await fetcher("/liked", { id: post.sys.id, likes: likeNumber });
      }
    };

    //handle cases where user navigates away from this page
    window.addEventListener("beforeunload", updatePostLikes);
    Router.events.on("routeChangeStart", updatePostLikes);
    return () => {
      window.removeEventListener("beforeunload", updatePostLikes);
      Router.events.off("routeChangeStart", updatePostLikes);
    };
  }, [liked]);

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
