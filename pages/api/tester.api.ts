import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma";
import { run } from "prisma/seed";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // await prisma.posts.create({ data: { likes: 17, title: "The best blog post ever" } });
  await run();
  res.status(200).json({ status: true });
}
