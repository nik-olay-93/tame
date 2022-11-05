import "server-only";

import { NextAuthHandler } from "next-auth/core";
import { Session } from "next-auth";
import { headers, cookies } from "next/headers";
import { authOptions } from "../pages/api/auth/[...nextauth]";

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

  return session;
};
