import ProjectCard from "components/dashboard/ProjectCard";
import client from "lib/prismadb";
import { getServerSession } from "lib/serverSession";

async function getData() {
  const session = await getServerSession();
  if (!session?.body?.user?.email) {
    return null;
  }

  const projects = await client.project.findMany({
    where: {
      members: {
        some: {
          email: session.body.user.email,
        },
      },
    },
    include: {
      members: {
        select: {
          name: true,
          id: true,
          image: true,
        },
      },
      tasks: {
        select: {
          completed: true,
        },
      },
    },
  });

  return projects;
}

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-4 px-8 mt-4">
      {data?.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
}
