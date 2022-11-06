import { NextApiRequest } from "next";
import { Session } from "next-auth";
import { getSession } from "./session";

export default async function getApiSession(
  req: NextApiRequest
): Promise<Session | null> {
  const { cookies } = req;
  if (cookies) {
    const flat = Object.keys(cookies).reduce(
      (acc, key) => `${acc}${key}=${cookies[key]};`,
      ""
    );
    return await getSession(flat);
  }
  return null;
}
