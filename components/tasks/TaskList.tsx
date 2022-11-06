"use client";

import { Project, Tag, Task, User } from "@prisma/client";
import { useState } from "react";
import CustomIcon from "../ui/CustomIcon";
import TaskCard from "./TaskCard";

export default function TaskList({
  header,
  tasks,
  userId,
  className,
}: {
  header: string;
  tasks: (Task & {
    issuer: User;
    assignee: User | null;
    tags: Tag[];
    project: Project;
  })[];
  userId?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div
        className={`px-6 py-2 bg-primary-light dark:bg-primary-dark flex flex-row items-center`}
        onClick={() => setOpen(!open)}
      >
        <span className="text-2xl font-bold">{header}</span>
        <CustomIcon
          icon={
            open
              ? "fluent:chevron-circle-down-20-regular"
              : "fluent:chevron-circle-right-20-regular"
          }
          fontSize="36px"
          className="ml-auto"
        />
      </div>
      {open &&
        tasks.map((task, i) => (
          <TaskCard key={i} task={task} userId={userId} className="mx-8" />
        ))}
    </>
  );
}
