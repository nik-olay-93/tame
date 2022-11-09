"use client";

import { useState } from "react";
import CustomIcon from "../ui/CustomIcon";
import TaskCard, { TaskObject } from "./TaskCard";

export default function TaskList({
  header,
  tasks,
  userId,
  className,
}: {
  header: string;
  tasks: TaskObject[];
  userId?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <div
        className={`px-6 py-2 bg-primary-light dark:bg-primary-dark flex flex-row items-center`}
        onClick={() => setOpen(!open)}
      >
        <span className="text-2xl font-bold">{header}</span>
        <CustomIcon
          icon="fluent:chevron-circle-down-20-regular"
          fontSize="36px"
          className="ml-auto transition-transform"
          style={{
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
          }}
        />
      </div>
      {open && (
        <div className={`flex flex-col gap-4`}>
          {tasks.map((task, i) => (
            <TaskCard key={i} task={task} userId={userId} className="mx-8" />
          ))}
        </div>
      )}
    </div>
  );
}
