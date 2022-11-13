import { NextApiRequest, NextApiResponse } from "next";
import getApiSession from "../../../../lib/apiSession";
import client from "../../../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id } = req.query;
  const { name } = req.body;

  if (typeof id !== "string" || typeof name !== "string") {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  const session = await getApiSession(req);

  if (!session || !session.user || !session.user.email) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const project = await client.project.findUnique({
    where: { id },
    include: {
      tags: true,
      administrators: true,
    },
  });

  if (!project) {
    res.status(404).json({ error: "Not Found" });
    return;
  }

  if (
    project.administrators.every(
      (member) => member.email !== session.user?.email
    )
  ) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  if (project.tags.some((tag) => tag.name === name)) {
    res.status(409).json({ error: "Conflict" });
    return;
  }

  const resp = await client.tag.create({
    data: {
      name,
      project: {
        connect: {
          id,
        },
      },
    },
  });

  res.status(200).json(resp);
}
