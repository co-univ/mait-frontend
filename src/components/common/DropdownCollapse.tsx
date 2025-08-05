import { ChevronsUpDown } from "lucide-react";
import type React from "react";
import type { Size } from "@/components/common/Dropdown";

//
//
//

interface DropdownCollapseProps {
  size: Size;
  text: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  width?: string;
}

//
//
//

const DropdownCollapse = ({
  size,
  text,
  isOpen,
  setIsOpen,
  width,
}: DropdownCollapseProps) => {
  /**
   *
   */
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      className="flex w-full items-center gap-[10px] rounded-md p-padding-6 hover:bg-primary-5 active:bg-alpha-white100"
      type="button"
      onClick={handleButtonClick}
    >
      <span className="text-left text-base text-alpha-black100 typo-body-medium">
        {text}
      </span>
      <ChevronsUpDown className="h-3 w-3 text-alpha-black100" />
    </button>
  );
};

export default DropdownCollapse;
