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
  });

  return projects;
}

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div>
      {data?.map((project) => (
        <div key={project.id}>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
