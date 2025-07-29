import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { Content, IconContent } from "./Dropdown";

//
//
//

interface DropdownListProps {
  isOpen: boolean;
  group: string;
  contents: Content[] | IconContent[];
}

//
//
//

const DropdownList = ({ isOpen, group, contents }: DropdownListProps) => {
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const animationStyle = (
    isOpen: boolean,
    height: number,
  ): React.CSSProperties => ({
    height: isOpen ? height : 0,
    opacity: isOpen ? 1 : 0,
    transition: "height 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s",
    overflow: "hidden",
  });

  /**
   *
   */
  const renderDropdownItem = (item: Content | IconContent, i: number) => {
    const isItemObject = typeof item === "object" && item !== null;
    const icon = isItemObject && "icon" in item ? item.icon : null;
    const text = isItemObject && "text" in item ? item.text : item;

    return (
      <button
        key={i}
        type="button"
        className="group flex w-full items-center gap-[0.62rem] rounded-sm px-[0.5rem] py-[0.28rem] hover:bg-primary-5"
      >
        {icon?.("w-5 h-5 text-gray-30 group-hover:text-alpha-black-100")}
        <p className="select-none truncate text-left text-[0.9375rem] font-medium text-gray-30 group-hover:text-alpha-black-100">
          {text}
        </p>
      </button>
    );
  };

  //
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight);
    } else {
      setDropdownHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className="absolute mt-1 rounded-[6px] border border-gray-20 bg-alpha-white-100"
      ref={dropdownRef}
      style={animationStyle(isOpen, dropdownHeight)}
      aria-hidden={!isOpen}
    >
      <div className="w-full p-1">
        <p className="select-none px-[0.5rem] py-[0.28rem] text-[0.9375rem] font-medium text-alpha-black-100">
          {group}
        </p>
      </div>
      <div className="h-px w-full bg-gray-20" />
      <div className="flex w-full flex-col gap-[0.62rem] p-1">
        {contents.map(renderDropdownItem)}
      </div>
    </div>
  );
};

export default DropdownList;
