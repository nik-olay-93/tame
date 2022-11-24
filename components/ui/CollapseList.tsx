"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { RefObject, useState } from "react";
import CustomIcon from "./CustomIcon";

export interface CollapseListProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export default function CollapseList({
  className,
  title,
  children,
}: CollapseListProps) {
  const [open, setOpen] = useState(false);

  const parentRef = useAutoAnimate({ duration: 200, easing: "ease-out" });

  return (
    <div
      className={`bg-primary-light dark:bg-primary-dark rounded-md mx-4 flex flex-col gap-2 items-stretch ${className}`}
      ref={parentRef as RefObject<HTMLDivElement>}
    >
      <span
        onClick={() => setOpen((p) => !p)}
        className="text-xl border-gray-500 border rounded-md px-4 py-2 flex flex-row justify-between items-center"
      >
        <span>{title}</span>
        <CustomIcon
          icon="fluent:chevron-circle-right-20-regular"
          fontSize="2rem"
          className={`transition-transform ${open ? "rotate-90" : ""}`}
        />
      </span>
      {open && children}
    </div>
  );
}
