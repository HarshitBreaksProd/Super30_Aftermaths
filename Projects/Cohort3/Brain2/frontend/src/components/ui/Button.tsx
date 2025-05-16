import type { ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "danger-outline" | "badge";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick: () => void;
  className?: string;
}

const Button = (props: ButtonProps) => {
  let variant;
  let size;
  let iconSize: number;

  switch (props.variant) {
    case "primary":
      variant = "bg-indigo-600 text-white font-light tracking-wide";
      break;
    case "secondary":
      variant = "bg-indigo-100 text-indigo-800 font-light tracking-wide border border-indigo-600";
      break;
    case "danger":
      variant = "bg-red-500 text-white font-light tracking-wide";
      break;
    case "danger-outline":
      variant = "bg-red-200 border text-red-600 font-light tracking-wide";
      break;
    case "badge":
      variant = "px-1.5! py-2";
      break;
  }

  switch (props.size) {
    case "sm":
      size = "px-2 py-0.5 rounded-sm text-sm";
      iconSize = 12;
      break;
    case "md":
      size = "px-3 py-2 rounded-md";
      iconSize = 16;
      break;
    case "lg":
      size = "px-6 py-2 rounded-lg text-lg";
      iconSize = 20;
      break;
  }

  const getIconWithSize = (icon: ReactNode) => {
    if (isValidElement(icon)) {
      return cloneElement(icon, { size: iconSize } as { size: number });
    }
    return null;
  };

  return (
    <button
      className={`${variant} ${size} hover:cursor-pointer ${props.className}`}
      onClick={props.onClick}
    >
      <span
        className={`flex items-center ${
          props.size === "sm" ? "gap-1" : "gap-2"
        }`}
      >
        {props.startIcon && <span>{getIconWithSize(props.startIcon)}</span>}
        {props.text}
        {props.endIcon && <span>{getIconWithSize(props.endIcon)}</span>}
      </span>
    </button>
  );
};

export default Button;
