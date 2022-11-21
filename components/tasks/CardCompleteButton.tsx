"use client";

import BorderButton, { BorderButtonProps } from "components/ui/BorderButton";
import { useRouter } from "next/navigation";
import mutate from "utils/mutate";
import completeTask from "./api/complete";

/**
 * ### Description
 *
 * Button for completing a task
 *
 * ### Props
 *
 * - `id` - The id of the task
 * - `completed` - Whether the task is completed
 *
 * ### Usage
 *
 * ```tsx
 * <CardCompleteButton id={id} completed={completed} />
 * ```
 */
export default function CardCompleteButton({
  id,
  completed,
  ...props
}: Omit<BorderButtonProps, "onClick"> & { id: string; completed: boolean }) {
  const router = useRouter();

  return (
    <BorderButton
      onClick={() => {
        mutate(completeTask(id, !completed), router.refresh);
      }}
      {...props}
    />
  );
}
