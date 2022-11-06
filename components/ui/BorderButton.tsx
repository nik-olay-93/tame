import { IconProps } from "@iconify/react";
import CustomIcon from "./CustomIcon";
import styles from "./BorderButton.module.css";

export default function BorderButton({
  children,
  className,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: IconProps;
}) {
  return (
    <button
      className={`border border-gray-400 rounded-md px-2 py-1 flex flex-row gap-1 items-center ${styles.ripple} ${className}`}
      onClick={onClick}
    >
      {icon && <CustomIcon {...icon} />}
      {children}
    </button>
  );
}
