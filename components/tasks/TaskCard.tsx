import { Project, Tag, Task, User } from "@prisma/client";
import Image from "next/image";

export default function TaskCard({
  task,
  userId,
  className,
}: {
  task: Task & {
    issuer: User;
    assignee: User | null;
    tags: Tag[];
    project: Project;
  };
  userId?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col bg-primary-light dark:bg-primary-dark rounded-md ${className}`}
    >
      <div className="px-4 py-2 flex flex-col">
        <span className="text-xl font-semibold">{task.name}</span>
        <span className="text-gray-400">{task.project.name}</span>
      </div>
      <div className="mx-2 p-2 border-y border-accent-light dark:border-accent-dark flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-gray-400">
          <span>Assigned By: </span>
          <Image
            src={task.issuer.image || "/pfp.jpg"}
            alt={task.issuer.id}
            width={32}
            height={32}
            className="rounded-full"
          />
          <a className="text-accent-light dark:text-accent-dark">
            {task.issuer.name}
          </a>
        </div>
        <div className="flex flex-row items-center gap-2 text-gray-400">
          <span>Assigned To:</span>
          {task.assignee ? (
            <>
              <Image
                src={task.assignee.image || "/pfp.jpg"}
                alt={task.assignee.id}
                width={32}
                height={32}
                className="rounded-full"
              />
              <a className="text-accent-light dark:text-accent-dark">
                {task.assignee.name}
              </a>
            </>
          ) : (
            <span>None</span>
          )}
        </div>
      </div>
      <div className="p-4 text-lg">{task.description}</div>
      {task.tags.length > 0 && (
        <div className="flex flex-row flex-wrap gap-1 mx-2 px-2 mb-2">
          {task.tags.map((tag, i) => (
            <div
              key={i}
              className="text-sm px-2 py-1 text-gray-400 bg-primary-light dark:bg-[#424242] rounded-full"
            >
              {tag.name}
            </div>
          ))}
        </div>
      )}
      {
        <div className="border-t mx-2 border-accent-light dark:border-accent-dark">
          <div className="flex flex-row flex-wrap gap-2 p-2">
            <button className="text-sm text-gray-500">Comment</button>
            {(task.assignee?.id === userId || task.issuer.id === userId) && (
              <>
                <button className="text-sm text-gray-500">Edit</button>
                <button className="text-sm text-gray-500">Delete</button>
                <button className="text-accent-light dark:text-accent-dark ml-auto">
                  Mark as Complete
                </button>
              </>
            )}
          </div>
        </div>
      }
    </div>
  );
}
