"use client";

import { Combobox, Popover, Transition } from "@headlessui/react";
import { Tag } from "@prisma/client";
import CustomIcon from "components/ui/CustomIcon";
import { useRouter } from "next/navigation";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { PlainObject } from "utils/plainTypes";
import addTaskTag from "./api/addTag";
import createTag from "./api/createTag";

export interface CardAddTagProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  tags: PlainObject<Tag>[];
  projectId: string;
  canCreate?: boolean;
}

/**
 * ### Description
 * Tag input popover for adding tags to a task
 *
 * ### Props
 *
 * - `id` - The id of the task
 * - `tags` - The tags of the task
 * - `projectId` - The id of the project
 * - `canCreate` - Whether the user can create tags
 *
 * ### Usage
 *
 * ```tsx
 * <CardAddTag id={id} tags={tags} projectId={projectId} canCreate={canCreate} />
 * ```
 *
 */
export default function CardAddTag({
  id,
  projectId,
  tags,
  canCreate = false,
  ...props
}: CardAddTagProps) {
  const [selected, setSelected] = useState<PlainObject<Tag> | null>(null);
  const [query, setQuery] = useState("");
  const [right, setRight] = useState(false);

  const router = useRouter();

  const filteredTags =
    query === ""
      ? tags
      : tags.filter((tag) =>
          tag.name.toLowerCase().includes(query.toLowerCase())
        );

  useEffect(() => {
    const exec = async () => {
      if (!selected) return;

      if (selected?.id === null) {
        selected.id = (
          await (await createTag(projectId, selected.name)).json()
        ).id;
      }

      await addTaskTag(id, selected.id);

      router.refresh();
    };

    exec();
  }, [selected, projectId, router, id]);

  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (!node) return;

      const width = node.getBoundingClientRect().width;
      const x = node.getBoundingClientRect().x;

      if (x + (right ? 2 * width : width) > window.innerWidth) {
        setRight(true);
      } else {
        setRight(false);
      }
    },
    [right]
  );

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${
                  open ? "" : "text-opacity-90"
                } rounded-full p-2 text-sm text-gray-400 bg-primary-light dark:bg-[#424242] outline-none`}
          >
            <CustomIcon icon="fluent:add-20-regular" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              unmount={false}
              as="div"
              className={`top-0 ${
                !right ? "left-full" : "right-full"
              } absolute z-10 rounded-xl bg-primary-light dark:bg-primary-dark border border-[#424242] p-2 mx-1 shadow-lg`}
              ref={ref}
            >
              <Combobox value={selected} onChange={setSelected} nullable>
                <Combobox.Input
                  className="outline-none bg-primary-light dark:bg-primary-dark border border-[#424242] p-2 rounded-md"
                  displayValue={(t: PlainObject<Tag>) => t?.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Options className="flex flex-row flex-wrap gap-2 mt-2">
                  {query.length > 0 && canCreate && (
                    <Combobox.Option value={{ id: null, name: query }}>
                      <span className="text-md px-2 py-1 text-gray-400 bg-primary-light dark:bg-[#424242] rounded-full">
                        {query}
                      </span>
                    </Combobox.Option>
                  )}
                  {filteredTags.map((tag) => (
                    <Combobox.Option key={tag.id} value={tag}>
                      <span className="text-md px-2 py-1 text-gray-400 bg-primary-light dark:bg-[#424242] rounded-full">
                        {tag.name}
                      </span>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
