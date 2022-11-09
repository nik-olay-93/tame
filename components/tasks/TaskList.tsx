"use client";

import { RefObject, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CustomIcon from "components/ui/CustomIcon";
import TaskCard, { TaskObject } from "./TaskCard";
import Search from "components/ui/forms/Search";

const searchFilter = (search: string) => (task: TaskObject) =>
  task.name.toLowerCase().includes(search.trim().toLowerCase()) ||
  task.description?.toLowerCase().includes(search.trim().toLowerCase());

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
  const [search, setSearch] = useState("");

  const outer = useAutoAnimate({ duration: 200, easing: "ease-out" });
  const inner = useAutoAnimate({ duration: 200, easing: "ease-out" });

  return (
    <div
      className={`flex flex-col gap-4 overflow-hidden ${className}`}
      ref={outer as RefObject<HTMLDivElement>}
    >
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
        <>
          <div className="mx-8 flex flex-row">
            <Search
              className="flex-grow"
              value={search}
              onChange={(v) => setSearch(v)}
            />
            <div className="p-2 rounded-md ml-2 bg-accent-light dark:bg-accent-dark">
              <CustomIcon icon="fluent:options-20-regular" fontSize="30px" />
            </div>
          </div>
          <div
            ref={inner as RefObject<HTMLDivElement>}
            className={`flex flex-col gap-4 mx-8`}
          >
            {tasks.filter(searchFilter(search)).map((task, i) => (
              <TaskCard key={i} task={task} userId={userId} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
