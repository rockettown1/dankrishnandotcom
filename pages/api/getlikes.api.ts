import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma";
import * as z from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await prisma.posts.findUnique({
      where: { contentfulId: req.query.id as string },
      select: {
        likes: true,
      },
    });

    res.status(200).json({ status: "SUCCESS", payload: response!.likes });
  } catch (error) {
    res.status(404).json({ status: "ERROR", error: "Resource Not Found" });
  }
}
