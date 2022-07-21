import client from "cms/contentfulClient";
import { NextApiRequest, NextApiResponse } from "next";
import { IPost } from "types/generated/contentful";
import { Entry } from "contentful";
import * as z from "zod";
import { deDupPosts } from "utils";

const QuerySchema = z.object({
  search: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!QuerySchema.safeParse(req.query).success) {
    res.status(400).send({ results: null, msg: "Bad Request" });
  }

  try {
    //query the string in post title
    const titleResponse = await client.getEntries<IPost>({
      content_type: "post",
      "fields.title[match]": req.query.search,
    });
    //query the string in post body
    const bodyResponse = await client.getEntries<IPost>({
      content_type: "post",
      "fields.body[match]": req.query.search,
    });

    //query the string in post tags

    const tagResponse = await client.getEntries<IPost>({
      content_type: "post",
      "fields.tagId[match]": req.query.search,
    });

    const combinedResponse = [...titleResponse.items, ...bodyResponse.items, ...tagResponse.items];

    const response = deDupPosts(combinedResponse);

    if (response.length === 0) {
      res.status(200).send({ results: [], msg: "No posts matched that search query" });
    } else {
      res.status(200).send({ results: response, msg: `${response.length} results found` });
    }
  } catch (error) {
    res.status(500).send({ error: error, msg: "An error occured when searching for posts" });
  }
}
