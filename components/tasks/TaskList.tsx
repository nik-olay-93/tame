"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import CustomIcon from "components/ui/CustomIcon";
import Search from "components/ui/forms/Input";
import { RefObject, useMemo, useState } from "react";
import TaskCard, { TaskObject } from "./TaskCard";
import TaskFilter from "./TaskFilter";

/**
 * ### Description
 *
 * Generates a predicate for filtering tasks
 *
 * ### Props
 *
 * - `search` - The search input
 *
 * ### Usage
 *
 * ```ts
 * searchFilter("search term")(task)
 * ```
 */
const searchFilter = (search: string) => (task: TaskObject) =>
  task.name.toLowerCase().includes(search.trim().toLowerCase()) ||
  task.description?.toLowerCase().includes(search.trim().toLowerCase());

/**
 * ### Description
 *
 * The task list
 *
 * ### Props
 *
 * - `tasks` - The tasks
 * - `header` - The header
 * - `userId` - The id of the user
 *
 * ### Usage
 *
 * ```tsx
 * <TaskList tasks={tasks} header={header} userId={userId} />
 * ```
 */
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

  const [filter, setFilter] = useState<(p: TaskObject) => boolean>(
    () => (p: TaskObject) => true
  );
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter(searchFilter(search)).filter(filter);
  }, [tasks, search, filter]);

  const outer = useAutoAnimate({ duration: 200, easing: "ease-out" });
  const inner = useAutoAnimate({ duration: 200, easing: "ease-out" });

  return (
    <div
      className={`flex flex-col gap-4 ${className}`}
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
            <div
              className="p-2 rounded-md ml-2 bg-accent-light dark:bg-accent-dark"
              onClick={() => setFilterOpen((v) => !v)}
            >
              <CustomIcon icon="fluent:options-20-regular" fontSize="30px" />
            </div>
          </div>
          {filterOpen && (
            <div className="mx-8">
              <TaskFilter
                projects={tasks
                  .map((t) => t.project)
                  .filter((p, i, a) => a.findIndex((v) => v.id === p.id) === i)}
                setFilter={setFilter}
              />
            </div>
          )}
          <div
            ref={inner as RefObject<HTMLDivElement>}
            className={`flex flex-col gap-4 mx-8`}
          >
            {filteredTasks.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No tasks found
              </div>
            )}
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} userId={userId} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
