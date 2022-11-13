import { NextApiRequest, NextApiResponse } from "next";
import getApiSession from "../../../../lib/apiSession";
import client from "../../../../lib/prismadb";

export default async function addTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id } = req.query;
  const { tagId } = await req.body;

  if (typeof id !== "string" || typeof tagId !== "string") {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  const session = await getApiSession(req);

  if (!session || !session.user || !session.user.email) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const task = await client.task.findUnique({
    where: { id },
    include: {
      issuer: true,
      assignee: true,
    },
  });

  if (!task) {
    res.status(404).json({ error: "Not Found" });
    return;
  }

  if (task.issuer.email !== session.user.email) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const resp = await client.task.update({
    where: { id },
    data: {
      tags: {
        connect: {
          id: tagId,
        },
      },
    },
  });

  res.status(200).json(resp);
}
