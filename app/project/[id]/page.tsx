import BorderButton from "components/ui/BorderButton";
import client from "lib/prismadb";
import { getServerSession } from "lib/serverSession";
import { notFound } from "next/navigation";
import Image from "next/image";
import CustomIcon from "components/ui/CustomIcon";
import CollapseList from "components/ui/CollapseList";
import Link from "next/link";

async function getData(id: string) {
  const session = await getServerSession();

  const email = session?.body?.user?.email;

  if (!email) {
    return null;
  }

  const project = await client.project.findUnique({
    where: {
      id,
    },
    include: {
      members: true,
      administrators: true,
      tasks: true,
    },
  });

  const user = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !project || project.members.every((m) => m.email !== email)) {
    return null;
  }

  return { project, user };
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  if (!data) {
    notFound();
  }

  const { project, user } = data;

  const isAdmin = project.administrators.some((a) => a.email === user.email);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="bg-primary-light dark:bg-primary-dark rounded-md mx-4 px-4 py-2 flex flex-col gap-4">
        <div className="text-2xl font-semibold">{project.name}</div>
        <div className="text-xl">{project.description}</div>
      </div>
      <CollapseList title="Members">
        {project.members.map((m) => (
          <div key={m.id} className="flex flex-row items-center gap-2 px-4">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={m.image || "/pfp.jpg"}
                alt={m.name || ""}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="text-lg">{m.name}</div>
            </div>
            {isAdmin && (
              <BorderButton
                icon={{
                  icon: "fluent:person-delete-20-regular",
                  fontSize: "1.5rem",
                }}
                className="text-red-400 border-red-400 ml-auto"
              >
                Remove
              </BorderButton>
            )}
          </div>
        ))}
        {isAdmin && (
          <BorderButton
            icon={{ icon: "fluent:person-add-20-regular", fontSize: "2rem" }}
            className="border-accent-light text-accent-light ml-auto mr-4 mb-2"
          >
            Add members
          </BorderButton>
        )}
      </CollapseList>
      <CollapseList
        title={`Tasks (${
          project.tasks.filter((t) => !t.completed).length
        } open)`}
      >
        {project.tasks
          .filter((t) => !t.completed)
          .map((t) => (
            <div
              key={t.id}
              className="flex flex-row items-center gap-2 px-4 pb-2"
            >
              <div className="flex flex-row items-center gap-2">
                <CustomIcon
                  icon={"fluent:circle-20-regular"}
                  fontSize="1.5rem"
                />
                <div className="text-lg">{t.name}</div>
              </div>
              <Link href={`/task/${t.id}`} className="ml-auto">
                <BorderButton
                  icon={{
                    icon: "fluent:info-20-regular",
                    fontSize: "1.75rem",
                  }}
                  className="text-accent-dark border-accent-dark"
                >
                  Info
                </BorderButton>
              </Link>
            </div>
          ))}
      </CollapseList>
    </div>
  );
}
