"use client";

import BorderButton, { BorderButtonProps } from "components/ui/BorderButton";
import { useRouter } from "next/navigation";
import mutate from "utils/mutate";
import completeTask from "./api/complete";

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
