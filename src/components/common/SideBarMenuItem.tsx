import clsx from "clsx";
import type React from "react";
import { useNavigate } from "react-router-dom";

//
//
//

interface MenuItemProps {
  icon: (className: string) => React.ReactNode;
  label: string;
  path: string;
  selected: boolean;
  onSelect: () => void;
}

//
//
//

const SideBarMenuItem = ({
  icon,
  label,
  path,
  selected,
  onSelect,
}: MenuItemProps) => {
  const navigate = useNavigate();

  /**
   *
   */
  const handleMenuClick = () => {
    onSelect();
    navigate(path);
  };

  return (
    <button type="button" onClick={handleMenuClick}>
      <div
        className={clsx(
          "group flex items-center gap-[0.625rem] rounded-[0.375rem] p-padding-6 hover:bg-primary-5",
          { "bg-primary-5": selected },
        )}
      >
        {icon(
          clsx("w-4 h-4", {
            "text-primary-50": selected,
            "text-gray-30 group-hover:text-primary-50": !selected,
          }),
        )}
        <span
          className={clsx("typo-heading-xsmall", {
            "font-bold text-primary-50": selected,
            "text-gray-30 group-hover:font-bold group-hover:text-primary-50":
              !selected,
          })}
        >
          {label}
        </span>
      </div>
    </button>
  );
};

export default SideBarMenuItem;
