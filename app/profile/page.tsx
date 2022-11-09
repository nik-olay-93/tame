import { cookies } from "next/headers";
import Image from "next/image";
import LogoutButton from "components/profile/logout";
import SignInForm from "components/profile/SignInForm";
import { getServerSession } from "lib/serverSession";

async function getData() {
  const data = await getServerSession();
  if (!data?.body?.user) {
    return null;
  }

  const user = data.body.user;

  if (!user.email) {
    return null;
  }

  return user;
}

export default async function ProfilePage() {
  const user = await getData();

  const csrfToken = cookies().get("next-auth.csrf-token");

  return (
    <div className="flex flex-col gap-4 mt-4">
      {user ? (
        <>
          <div className="text-2xl font-bold px-6 py-2 bg-primary-light dark:bg-primary-dark">
            Profile
          </div>

          <div className="mx-4 flex flex-row gap-4 bg-primary-light dark:bg-primary-dark rounded-md">
            <div className="relative flex-1 aspect-square m-4">
              <Image
                src={user?.image || "/pfp.jpg"}
                alt={user?.email || ""}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col gap-4 m-4 items-center justify-around">
              <span className="text-2xl font-bold">{user?.name}</span>
              <span className="text-lg font-semibold">{user?.email}</span>
            </div>
          </div>

          <LogoutButton className="mx-4" />
        </>
      ) : (
        <div className="m-auto">
          {csrfToken?.value && <SignInForm csrfToken={csrfToken.value} />}
        </div>
      )}
    </div>
  );
}
