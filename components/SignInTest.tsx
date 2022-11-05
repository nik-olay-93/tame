"use client";

import { signIn } from "next-auth/react";

export default function SignInTest() {
  return <button onClick={() => signIn()}>SignIn</button>;
}
