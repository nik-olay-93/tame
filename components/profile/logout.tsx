"use client";

import { signOut } from "next-auth/react";
import BorderButton from "components/ui/BorderButton";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <BorderButton
      className={`px-4 py-2 text-red-500 border-red-500 flex flex-row items-center justify-center ${className}`}
      icon={{
        icon: "fluent:arrow-exit-20-regular",
        fontSize: "20px",
      }}
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </BorderButton>
  );
}
