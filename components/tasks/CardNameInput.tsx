"use client";

import InputToggle from "components/ui/forms/InputToggle";
import { useRouter } from "next/navigation";
import mutate from "utils/mutate";
import renameTask from "./api/rename";

/**
 * ### Description
 *
 * Input for changing the name of a task
 *
 * ### Props
 *
 * - `id` - The id of the task
 * - `name` - The name of the task
 *
 * ### Usage
 *
 * ```tsx
 * <CardNameInput id={id} name={name} />
 * ```
 */
export default function CardNameInput({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  const router = useRouter();

  return (
    <InputToggle
      value={name}
      onDone={(v) => {
        mutate(renameTask(id, v), router.refresh);
      }}
      type={"text"}
    />
  );
}
