import { Project, Tag, Task, User } from "@prisma/client";
import BorderButton from "components/ui/BorderButton";
import CustomIcon from "components/ui/CustomIcon";
import Image from "next/image";
import Link from "next/link";
import { PlainObject } from "utils/plainTypes";
import removeTaskTag from "./api/removeTag";
import CardAddTag from "./CardAddTag";
import CardAsigneeSelect from "./CardAsigneeSelect";
import CardCompleteButton from "./CardCompleteButton";
import CardDeleteButton from "./CardDeleteButton";
import CardDescInput from "./CardDescInput";
import CardNameInput from "./CardNameInput";
import CardTagChip from "./CardTagChip";

export type TaskObject = PlainObject<Task> & {
  issuer: PlainObject<User>;
  assignee: PlainObject<User> | null;
  tags: PlainObject<Tag>[];
  project: PlainObject<Project> & {
    administrators: PlainObject<User>[];
    members: PlainObject<User>[];
    tags: PlainObject<Tag>[];
  };
  createdAt: string;
  updatedAt: string;
};

export default function TaskCard({
  task,
  userId,
  className,
}: {
  task: TaskObject;
  userId?: string;
  className?: string;
}) {
  const isIssuer = task.issuer.id === userId;
  const isAssignee = task.assignee?.id === userId;
  const isAdmin = task.project.administrators.some((m) => m.id === userId);

  return (
    <div
      className={`flex flex-col bg-primary-light dark:bg-primary-dark rounded-md ${className}`}
    >
      <div className="px-4 py-2 flex flex-col">
        <span className="text-xl font-semibold">
          <CardNameInput id={task.id} name={task.name} />
        </span>
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
          {isIssuer ? (
            <>
              <CardAsigneeSelect
                list={task.project.members}
                taskId={task.id}
                selected={task.assignee?.id}
              />
              <CustomIcon
                className="text-white"
                icon="fluent:edit-20-regular"
              />
            </>
          ) : (
            <div className="flex flex-row gap-2 items-center">
              <Image
                src={task.assignee?.image || "/pfp.jpg"}
                alt={task.assignee?.name || ""}
                width={32}
                height={32}
                className="rounded-full"
              />
              <a className="text-accent-light dark:text-accent-dark">
                {task.assignee?.name}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 text-lg flex-grow">
        {task.description ? (
          <CardDescInput id={task.id} description={task.description} />
        ) : (
          <span className="italic">No description provided</span>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-1 mx-2 px-2 mb-2">
        {task.tags.map((tag) => (
          <CardTagChip
            key={tag.id}
            tag={tag}
            taskId={task.id}
            isIssuer={isIssuer}
          />
        ))}
        {isIssuer && (
          <CardAddTag
            id={task.id}
            projectId={task.project.id}
            canCreate={isAdmin}
            tags={task.project.tags.filter(
              (t) => task.tags.findIndex((v) => v.name === t.name) === -1
            )}
          />
        )}
      </div>
      <div className="border-t mx-2 border-accent-light dark:border-accent-dark">
        <div className="flex flex-col gap-2 p-2">
          <div className="flex flex-row gap-2 @container">
            <Link href={`/task/${task.id}`} className="flex">
              <BorderButton
                icon={{
                  icon: "fluent:comment-multiple-20-regular",
                }}
              >
                <span className="hidden @xs:block">Comment</span>
              </BorderButton>
            </Link>
            {(isIssuer || isAssignee) && (
              <CardCompleteButton
                icon={{
                  icon: "fluent:checkmark-20-regular",
                  fontSize: "20px",
                }}
                className={`text-lg ${
                  !task.completed
                    ? "border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark"
                    : "bg-accent-light dark:bg-accent-dark border-gray-500 text-primary-light dark:text-primary-dark"
                } ml-auto flex-1`}
                id={task.id}
                completed={task.completed}
              >
                <span className="text-center flex-1">
                  {task.completed ? "Completed" : "Complete"}
                </span>
              </CardCompleteButton>
            )}
            {isIssuer && (
              <CardDeleteButton
                icon={{
                  icon: "fluent:delete-20-regular",
                  fontSize: "20px",
                }}
                className="text-sm text-red-500 border-red-500"
                id={task.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
