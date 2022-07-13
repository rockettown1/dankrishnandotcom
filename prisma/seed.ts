import { PrismaClient } from "@prisma/client";
import client from "../cms/contentfulClient";
import { IPostFields } from "types/generated/contentful";

const prisma = new PrismaClient();

//seeding Post likes into database
export const run = async () => {
  try {
    const PostsCollection = await client.getEntries<IPostFields>({ content_type: "post" });
    await Promise.all(
      PostsCollection.items.map(async (post) => {
        return prisma.posts.upsert({
          where: { contentfulId: post.sys.id },
          update: {},
          create: {
            likes: post.fields.migratedLikes || 0,
            title: post.fields.title,
            contentfulId: post.sys.id,
          },
        });
      })
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

run();
