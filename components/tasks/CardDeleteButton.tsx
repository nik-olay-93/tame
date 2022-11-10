"use client";

import BorderButton, { BorderButtonProps } from "components/ui/BorderButton";
import { useRouter } from "next/navigation";
import mutate from "utils/mutate";
import completeTask from "./api/complete";
import deleteTask from "./api/delete";

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
