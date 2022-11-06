"use client";

import CustomIcon from "./CustomIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";

const routes = [
  {
    title: "Tasks",
    icon: "fluent:task-list-square-rtl-20-regular",
    path: "/",
  },
  {
    title: "Profile",
    icon: "ep:user",
    path: "/profile",
  },
];

export default function BottomMenu() {
  const pathname = usePathname();

  return (
    <div className="flex justify-around p-1 bg-primary-light dark:bg-[#424242]">
      {routes.map((r, i) => (
        <Link
          href={r.path}
          key={i}
          className={`flex flex-col items-center transition-colors ease-in active:bg-[rgba(255,255,255,0.05)] rounded-full px-1 ${
            r.path === pathname ? "text-accent" : ""
          }`}
        >
          <CustomIcon icon={r.icon} fontSize="30px" />
          <span className="text-sx">{r.title}</span>
        </Link>
      ))}
    </div>
  );
}
