"use client";

import {
  InputHTMLAttributes,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import useClickOutside from "utils/onClickOutside";

export default function TextAreaToggle({
  onDone,
  value,
  onClick,
  className,
  onChange,
  ...props
}: InputHTMLAttributes<HTMLTextAreaElement> & {
  value?: string;
  onDone?: (value: string) => void;
}) {
  const [plainMode, setPlainMode] = useState(true);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [current, setCurrent] = useState(value);

  const click: MouseEventHandler<HTMLTextAreaElement> = (e) => {
    setPlainMode(false);
    onClick?.(e);
  };

  const change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrent(e.target.value);
    onChange?.(e);
  };

  useClickOutside(ref, () => {
    setPlainMode(true);
    if (value === current) return;
    if (current) onDone?.(current);
    setCurrent(value);
  });

  return plainMode ? (
    <span className={`${className}`} onClick={click} {...props}>
      {value}
    </span>
  ) : (
    <textarea
      ref={ref}
      className={`bg-background-light dark:bg-background-dark rounded-md border-none outline-none text-inherit ${className}`}
      onClick={onClick}
      defaultValue={value}
      onChange={change}
      {...props}
    />
  );
}
