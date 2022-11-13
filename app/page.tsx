import TaskList from "components/tasks/TaskList";
import client from "lib/prismadb";
import { getServerSession } from "lib/serverSession";
import makeSerializable from "utils/makeSerializable";

export const revalidate = 60;

async function getData() {
  const session = await getServerSession();
  if (!session?.body?.user?.email) {
    return null;
  }

  const user = await client.user.findUnique({
    where: {
      email: session.body.user.email,
    },
    include: {
      assigned_tasks: {
        include: {
          assignee: true,
          issuer: true,
          project: {
            include: {
              administrators: true,
              members: true,
              tags: true,
            },
          },
          tags: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      issued_tasks: {
        include: {
          assignee: true,
          issuer: true,
          project: {
            include: {
              administrators: true,
              members: true,
              tags: true,
            },
          },
          tags: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return {
    user,
    assigned: user.assigned_tasks.filter((t) => !t.completed),
    completed: user.assigned_tasks.filter((t) => t.completed),
    issued: user.issued_tasks,
  };
}

export default async function Home() {
  const data = await getData();

  if (!data) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <TaskList
        header="Assigned tasks"
        tasks={makeSerializable(data.assigned)}
        userId={data.user.id}
      />
      <TaskList
        header="Issued tasks"
        tasks={makeSerializable(data.issued)}
        userId={data.user.id}
      />
      <TaskList
        header="Completed tasks"
        tasks={makeSerializable(data.completed)}
        userId={data.user.id}
      />
    </div>
  );
}

