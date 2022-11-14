import { Listbox, Transition } from "@headlessui/react";
import { Project, Tag } from "@prisma/client";
import CustomIcon from "components/ui/CustomIcon";
import CustomListbox from "components/ui/Listbox";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { PlainObject } from "utils/plainTypes";
import { TaskObject } from "./TaskCard";

export interface TaskFilterProps {
  projects: (PlainObject<Project> & {
    tags: PlainObject<Tag>[];
  })[];
  setFilter: Dispatch<SetStateAction<(p: TaskObject) => boolean>>;
}

export default function TaskFilter({
  projects = [],
  setFilter = () => {},
}: Partial<TaskFilterProps>) {
  const [project, setProject] = useState<
    | (PlainObject<Project> & {
        tags: PlainObject<Tag>[];
      })
    | null
  >(null);
  const [tag, setTag] = useState<PlainObject<Tag> | null>(null);

  const reset = () => {
    setProject(null);
    setTag(null);
    setFilter(() => () => true);
  };

  const apply = () => {
    setFilter(() => (p: TaskObject) => {
      if (!project) return true;
      return (
        p.projectId === project.id &&
        (!tag || p.tags.some((t) => t.id === tag.id))
      );
    });
  };

  return (
    <div className="p-2 rounded-md bg-primary-light dark:bg-primary-dark">
      <div className="flex flex-row gap-2 flex-wrap">
        <CustomListbox
          display={(p) => p?.name}
          empty="Any"
          label="Project:"
          onChange={setProject}
          value={project}
          values={projects}
        />
        {project && project.tags.length > 0 && (
          <CustomListbox
            display={(t) => t?.name}
            empty="Any"
            label="Tag:"
            onChange={setTag}
            value={tag}
            values={project.tags}
          />
        )}
      </div>
      <div className="mt-2 flex flex-row justify-between">
        <button
          className="rounded-md p-2 border border-red-500 text-red-400"
          onClick={() => reset()}
        >
          Reset
        </button>
        <button
          className="bg-accent-light dark:bg-accent-dark rounded-md p-2"
          onClick={() => apply()}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
