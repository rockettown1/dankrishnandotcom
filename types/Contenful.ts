import * as z from "zod";

export const PostSchema = z.object({
  sys: z.object({
    id: z.string(),
    type: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    locale: z.string(),
    contentType: z.object({
      sys: z.object({
        id: z.literal("post"),
        linkType: z.literal("ContentType"),
        type: z.literal("Link"),
      }),
    }),
  }),
  fields: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    featuredImage: z.any(),
    body: z.any(),
    slug: z.string(),
    tagId: z.array(z.string()),
    topic: z.string(),
    migratedLikes: z.number(),
  }),
});
