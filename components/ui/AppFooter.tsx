"use client";

import CustomIcon from "./CustomIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./AppFooter.module.css";

const routes = [
  {
    title: "Tasks",
    icon: "fluent:task-list-square-rtl-20-regular",
    path: "/",
  },
  {
    title: "Dashboard",
    icon: "fluent:data-treemap-20-regular",
    path: "/dashboard",
  },
  {
    title: "Messages",
    icon: "fluent:comment-20-regular",
    path: "/messages",
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
    <nav className="flex justify-around px-4 py-1 bg-primary-light dark:bg-[#424242]">
      {routes.map((r, i) => (
        <Link
          href={r.path}
          key={i}
          className={`flex flex-col items-center px-1 rounded-md ${
            r.path === pathname ? "text-accent" : "text-gray-400"
          } ${styles.ripple} 
          `}
        >
          <CustomIcon icon={r.icon} fontSize="30px" />
          <span className="text-sx">{r.title}</span>
        </Link>
      ))}
    </nav>
  );
}
