"use client";

import { signIn, SignInOptions } from "next-auth/react";
import { FormEvent, useState } from "react";
import BorderButton from "components/ui/BorderButton";

export default function SignInForm({ csrfToken }: { csrfToken?: string }) {
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);

  const submitGit = async (ev: FormEvent) => {
    ev.preventDefault();

    const { ok, error } = (await signIn("github", { redirect: false })) ?? {};

    if (ok) window.location.href = "/";
    else if (error) setError(error);
  };

  const submitMail = async (ev: FormEvent) => {
    ev.preventDefault();

    const { email } = Object.fromEntries(
      new FormData(ev.target as HTMLFormElement)
    );

    const { ok, error } =
      (await signIn("email", { email, redirect: false })) ?? {};

    if (ok) setSent(true);
    else if (error) setError(error);
  };

  return (
    <>
      <form
        method="post"
        action="/api/auth/callback/email"
        onSubmit={submitMail}
        className="flex flex-col items-center gap-2"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <span className="text-lg">Sign In using email</span>
        <div className="flex flex-row justify-between gap-4">
          <input
            name="email"
            className="border dark:border-white dark:bg-background-dark outline-none rounded-md p-2"
          />
          <BorderButton
            icon={{
              icon: "fluent:arrow-enter-20-regular",
              fontSize: "30px",
            }}
            type="submit"
          ></BorderButton>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
        {sent && (
          <div className="text-green-500 text-center">
            Check your email for a sign in link
          </div>
        )}
      </form>
      <span className="text-lg">Or</span>
      <form
        method="post"
        action="/api/auth/callback/github"
        onSubmit={submitGit}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <BorderButton
          icon={{
            icon: "uit:github-alt",
            fontSize: "30px",
          }}
          type="submit"
        >
          <span className="text-lg">Sign In with GitHub</span>
        </BorderButton>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>
    </>
  );
}
