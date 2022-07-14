import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.posts.update({ where: { contentfulId: req.body.id }, data: { likes: req.body.likes } });

    res.status(200).json({ status: "SUCCESS" });
  } catch (error) {
    res.status(500).json({ status: "ERROR", error });
  }
}
