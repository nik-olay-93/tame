"use client";

import { useSession } from "next-auth/react";
import SignInTest from "./SignInTest";

export default function UserTest() {
  const session = useSession();

  return session.status === "authenticated" ? (
    <div>
      <div>Authenticated as {session.data.user?.email}</div>
    </div>
  ) : (
    <SignInTest />
  );
}
