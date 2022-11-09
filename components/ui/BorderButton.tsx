import { IconProps } from "@iconify/react";
import CustomIcon from "./CustomIcon";
import styles from "./BorderButton.module.css";

export default function BorderButton({
  children,
  className,
  onClick,
  icon,
  type = "button",
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: IconProps;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      className={`border rounded-md px-2 py-1 flex flex-row gap-1 items-center ${styles.ripple} ${className}`}
      onClick={onClick}
      type={type}
    >
      {icon && <CustomIcon {...icon} />}
      {children}
    </button>
  );
}
