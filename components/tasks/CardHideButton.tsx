"use client";

import BorderButton, { BorderButtonProps } from "components/ui/BorderButton";
import { useRouter } from "next/navigation";
import mutate from "utils/mutate";
import hideTask from "./api/hide";

/**
 * ### Description
 *
 * Button for marking a task as hidden
 *
 * ### Props
 *
 * - `id` - The id of the task
 *
 * ### Usage
 *
 * ```tsx
 * <CardHideButton id={id} />
 * ```
 */
export default function CardHideButton({
  id,
  ...props
}: Omit<BorderButtonProps, "onClick"> & { id: string }) {
  const router = useRouter();

  return (
    <BorderButton
      onClick={() => {
        mutate(hideTask(id), router.refresh);
      }}
      {...props}
    />
  );
}
