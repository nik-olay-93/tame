"use client";

import TextAreaToggle from "components/ui/forms/TextAreaToggle";
import { useRouter } from "next/navigation";
import mutate from "utils/mutate";
import changeTaskDescription from "./api/changeDescription";

/**
 * ### Description
 *
 * Input for changing the description of a task
 *
 * ### Props
 *
 * - `id` - The id of the task
 * - `description` - The description of the task
 *
 * ### Usage
 *
 * ```tsx
 * <CardDescInput id={id} description={description} />
 * ```
 */
export default function CardDescInput({
  id,
  description,
}: {
  description: string;
  id: string;
}) {
  const router = useRouter();

  return (
    <TextAreaToggle
      value={description}
      className="w-full"
      onDone={(v) => {
        mutate(changeTaskDescription(id, v), router.refresh);
      }}
    />
  );
}
