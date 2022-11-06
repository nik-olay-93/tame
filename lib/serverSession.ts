import "server-only";

import { NextAuthHandler } from "next-auth/core";
import { OutgoingResponse, Session } from "next-auth";
import { headers, cookies } from "next/headers";
import { authOptions } from "../pages/api/auth/[...nextauth]";

function isSession(
  obj: OutgoingResponse<Session | {} | string>
): obj is OutgoingResponse<Session> {
  return typeof obj.body === "object" && "user" in obj.body;
}

export const getServerSession = async (options = authOptions) => {
  const session = await NextAuthHandler<Session | {} | string>({
    options,
    req: {
      host: headers().get("x-forwarded-host") ?? "http://localhost:3000",
      action: "session",
      method: "GET",
      cookies: cookies()
        .getAll()
        .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
      headers: headers(),
    },
  });

  if (isSession(session)) {
    return session;
  } else {
    return null;
  }
};
