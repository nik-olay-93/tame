"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import BorderButton from "../ui/BorderButton";

export default function SignInForm({ csrfToken }: { csrfToken: string }) {
  const [error, setError] = useState<string>();

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    const { username, password } = Object.fromEntries(
      new FormData(ev.target as HTMLFormElement)
    );
    const { ok, error } =
      (await signIn("github", { username, password, redirect: false })) ?? {};

    if (ok) window.location.href = "/";
    else if (error) setError(error);
  };

  const onClose = () => setError(undefined);

  return (
    <>
      <form
        method="post"
        action="/api/auth/callback/github"
        onSubmit={onSubmit}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <BorderButton
          icon={{
            icon: "uit:github-alt",
            fontSize: "20px",
          }}
          type="submit"
        >
          <span className="text-lg">SignIn with GitHub</span>
        </BorderButton>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>
    </>
  );
}
