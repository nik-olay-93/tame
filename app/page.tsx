import { PrismaClient } from "@prisma/client";
import { userAgent } from "next/server";
import TaskCard from "../components/tasks/TaskCard";
import TaskList from "../components/tasks/TaskList";
import CustomIcon from "../components/ui/CustomIcon";
import { getServerSession } from "../lib/serverSession";

export const revalidate = 60;

const prisma = new PrismaClient();

async function getData() {
  const session = await getServerSession();
  if (!session?.body?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.body.user.email,
    },
    include: {
      assigned_tasks: {
        include: {
          assignee: true,
          issuer: true,
          project: true,
          tags: true,
        },
      },
      issued_tasks: {
        include: {
          assignee: true,
          issuer: true,
          project: true,
          tags: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return {
    user,
    assigned: user.assigned_tasks,
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
        tasks={data.assigned}
        userId={data.user.id}
      />
      <TaskList
        header="Issued tasks"
        tasks={data.issued}
        userId={data.user.id}
      />
    </div>
  );
}

