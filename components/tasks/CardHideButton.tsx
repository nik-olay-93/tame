"use client";

import BorderButton, { BorderButtonProps } from "components/ui/BorderButton";
import { useRouter } from "next/navigation";
import mutate from "utils/mutate";
import deleteTask from "./api/delete";
import hideTask from "./api/hide";

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
