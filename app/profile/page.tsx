import Image from "next/image";
import BorderButton from "../../components/ui/BorderButton";
import { getServerSession } from "../../lib/serverSession";

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

  return (
    <div className="flex flex-col gap-4 mt-4">
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

      <BorderButton
        className="px-4 py-2 mx-4 text-red-500 border-red-500 flex flex-row items-center justify-center"
        icon={{
          icon: "fluent:arrow-exit-20-regular",
          fontSize: "20px",
        }}
      >
        Logout
      </BorderButton>
    </div>
  );
}
