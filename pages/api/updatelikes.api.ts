import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma";
import * as z from "zod";

const BodySchema = z.object({
  id: z.string(),
  likes: z.number(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!BodySchema.safeParse(req.body).success) {
    res.status(400).json({ status: "ERROR", error: "Bad Request" });
  }

  try {
    await prisma.posts.update({ where: { contentfulId: req.body.id }, data: { likes: req.body.likes } });
    res.status(200).json({ status: "SUCCESS" });
  } catch (error) {
    res.status(404).json({ status: "ERROR", error: "Resource Not Found" });
  }
}
