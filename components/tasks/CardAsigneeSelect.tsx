"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { PlainObject } from "utils/plainTypes";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import changeTaskAssignee from "./api/changeAssignee";
import { useRouter } from "next/navigation";

export interface CardAsigneeSelectProps
  extends React.HTMLAttributes<HTMLDivElement> {
  selected?: string;
  list: (PlainObject<User> | null)[];
  taskId: string;
}

export default function CardAsigneeSelect({
  selected,
  list,
  taskId,
  ...props
}: CardAsigneeSelectProps) {
  const [selectedUser, setSelectedUser] = useState(
    list.find((u) => u?.id === selected) || null
  );

  const router = useRouter();

  useEffect(() => {
    const changeUser = async () => {
      await changeTaskAssignee(taskId, selectedUser?.id);
      router.refresh();
    };

    changeUser();
  }, [selectedUser, router, taskId]);

  return (
    <div className="relative flex flex-col items-center">
      <Listbox value={selectedUser} onChange={setSelectedUser}>
        <Listbox.Button>
          {selectedUser ? (
            <div className="flex flex-row gap-2 items-center">
              <Image
                src={selectedUser.image || "/pfp.jpg"}
                alt={selectedUser.name || ""}
                width={32}
                height={32}
                className="rounded-full"
              />
              <a className="text-accent-light dark:text-accent-dark">
                {selectedUser.name}
              </a>
            </div>
          ) : (
            <div className="flex flex-row gap-2 items-center">
              <Image
                src={"/pfp.jpg"}
                alt={"None"}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>None</span>
            </div>
          )}
        </Listbox.Button>
        <Listbox.Options className="mt-1 p-2 border border-gray-500 absolute flex flex-col items-center gap-2 top-full left-0 w-max bg-primary-light dark:bg-primary-dark rounded-md">
          {selectedUser !== null && (
            <Listbox.Option
              value={null}
              className="flex flex-row gap-2 items-center"
            >
              {({ selected }) => (
                <>
                  <span>None</span>
                </>
              )}
            </Listbox.Option>
          )}
          {list
            .filter((u) => !!u)
            .filter((u) => u?.id !== selectedUser?.id)
            .map((user) => (
              <Listbox.Option
                key={user!.id}
                value={user}
                className="flex flex-row gap-2 items-center"
              >
                {({ selected }) => (
                  <>
                    <Image
                      src={user!.image || "/pfp.jpg"}
                      alt={user!.name || ""}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <a className="text-accent-light dark:text-accent-dark">
                      {user!.name}
                    </a>
                  </>
                )}
              </Listbox.Option>
            ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
