import NewComment from "components/tasks/NewCommentBar";
import TaskCard from "components/tasks/TaskCard";
import client from "lib/prismadb";
import { getServerSession } from "lib/serverSession";
import Image from "next/image";
import makeSerializable from "utils/makeSerializable";

async function getData(id: string) {
  const session = await getServerSession();

  const email = session?.body?.user?.email;

  if (!email) {
    return null;
  }

  const task = await client.task.findUnique({
    where: {
      id,
    },
    include: {
      assignee: true,
      issuer: true,
      project: {
        include: {
          members: true,
          administrators: true,
          tags: true,
        },
      },
      tags: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
      },
    },
  });

  const user = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (!task || task.project.members.every((m) => m.email !== email)) {
    return null;
  }

  return { task, user };
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  if (!data) {
    return <div>Not Found</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <TaskCard
        task={makeSerializable(data.task)}
        className="mx-8"
        userId={data.user?.id}
      />
      <NewComment taskId={params.id} className="mx-8" />
      <div className="flex flex-col gap-2 mx-8">
        {data.task.comments.map((comment, i) => (
          <div
            key={comment.id}
            className={`flex ${
              comment.authorId === data.user?.id
                ? "flex-row-reverse"
                : "flex-row"
            } gap-2`}
          >
            <Image
              src={comment.author.image || "/pfp.jpg"}
              alt={comment.author.name || ""}
              width={40}
              height={40}
              className="rounded-full mt-auto"
            />
            <div
              className={`flex flex-col gap-2 rounded-md ${
                comment.authorId === data.user?.id
                  ? "rounded-br-none"
                  : "rounded-bl-none"
              } bg-primary-light dark:bg-primary-dark flex-grow p-2`}
            >
              {comment.text}
              <span className="text-gray-500 dark:text-gray-400 text-sm flex flex-row justify-between">
                <span>{comment.author.name}</span>
                <span>
                  {comment.createdAt.toLocaleString(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
