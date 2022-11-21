"use client";

import BorderButton, { BorderButtonProps } from "components/ui/BorderButton";
import { useRouter } from "next/navigation";
import mutate from "utils/mutate";
import deleteTask from "./api/delete";

/**
 * ### Description
 *
 * Button for deleting a task
 *
 * ### Props
 *
 * - `id` - The id of the task
 *
 * ### Usage
 *
 * ```tsx
 * <CardDeleteButton id={id} />
 * ```
 */
export default function CardDeleteButton({
  id,
  ...props
}: Omit<BorderButtonProps, "onClick"> & { id: string }) {
  const router = useRouter();

  return (
    <BorderButton
      onClick={() => {
        mutate(deleteTask(id), router.refresh);
      }}
      {...props}
    />
  );
}
