import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

const GetUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug: any = req.query["slug"];

  if (!slug) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "Not Found! Please use with a slug." }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "Slug not found!" }));
    return;
  }

  return res.json(data);
};

export default GetUrl;
