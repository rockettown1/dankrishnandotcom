import client from "cms/contentfulClient";
import { NextApiRequest, NextApiResponse } from "next";
import { IPost } from "types/generated/contentful";
import { Entry } from "contentful";
import * as z from "zod";

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

    const combinedResponse = [...titleResponse.items, ...bodyResponse.items];

    /*
    post objects are referentially differnt so can't use standard strategies for removing duplicate:s Sets, comparison and filter etc
    Creating a hashMap using post id's as strings will only add unique posts, then using Object.values to convert back to an array and return in the response
    */
    const hashMap: { [k: string]: Entry<IPost> } = {};
    for (let post of combinedResponse) {
      if (!hashMap[post.sys.id]) {
        hashMap[post.sys.id] = post;
      }
    }

    const response = Object.values(hashMap);

    if (response.length === 0) {
      res.status(200).send({ results: [], msg: "No posts matched that search query" });
    } else {
      res.status(200).send({ results: response, msg: `${response.length} results found` });
    }
  } catch (error) {
    res.status(500).send({ error: error, msg: "An error occured when searching for posts" });
  }
}
