import { cookies } from "next/headers";
import SignInForm from "./SignInForm";

export default function SignIn() {
  const token = cookies().get("next-auth.csrf-token");
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-3xl font-bold">
        Hi. Welcome to{" "}
        <span className="text-accent-light dark:text-accent-dark">TaMe</span>.
      </span>
      <span className="text-lg">Looks like you are not logged in</span>
      <SignInForm csrfToken={token?.value} />
    </div>
  );
}
