"use client";

import { IconProps } from "@iconify/react";
import CustomIcon from "../CustomIcon";

export interface SearchProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: IconProps;
}

export default function Search({
  className,
  placeholder = "Search",
  value = "",
  onChange = () => {},
  icon = {
    icon: "fluent:search-20-regular",
    fontSize: "30px",
  },
}: SearchProps) {
  return (
    <div
      className={`flex flex-row gap-2 rounded-md bg-primary-light dark:bg-primary-dark p-2 ${className}`}
    >
      <CustomIcon {...icon} />
      <input
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
        className="flex-grow bg-inherit outline-none"
        size={1}
      />
    </div>
  );
}
