import { cloneElement, isValidElement, type ReactNode } from "react";

export interface SidebarItemProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
}

const SidebarItem = (props: SidebarItemProps) => {
  const getIconWithSize = () => {
    if (isValidElement(props.icon)) {
      return cloneElement(props.icon, { size: 20 } as { size: number });
    }
    return null;
  };

  return (
    <button
      className="flex items-center mb-3 py-2 px-2 pl-10 text-lg text-neutral-700 gap-3 w-full hover:cursor-pointer"
      onClick={props.onClick}
    >
      {getIconWithSize()}
      {props.title}
    </button>
  );
};

export default SidebarItem;
