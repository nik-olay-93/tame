"use client";

import {
  InputHTMLAttributes,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import useClickOutside from "../../../utils/onClickOutside";

export default function InputToggle({
  onDone,
  value,
  onClick,
  className,
  onChange,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
  onDone?: (value: string) => void;
}) {
  const [plainMode, setPlainMode] = useState(true);
  const ref = useRef<HTMLInputElement>(null);
  const [current, setCurrent] = useState(value);

  const click: MouseEventHandler<HTMLInputElement> = (e) => {
    setPlainMode(false);
    onClick?.(e);
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent(e.target.value);
    onChange?.(e);
  };

  useClickOutside(ref, () => {
    setPlainMode(true);
    if (current) onDone?.(current);
    setCurrent(value);
  });

  return plainMode ? (
    <span className={`${className}`} onClick={click} {...props}>
      {value}
    </span>
  ) : (
    <input
      ref={ref}
      className={`bg-background-light dark:bg-background-dark rounded-md border-none outline-none text-inherit ${className}`}
      onClick={onClick}
      defaultValue={value}
      onChange={change}
      {...props}
    />
  );
}
