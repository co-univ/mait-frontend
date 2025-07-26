import { ChevronsUpDown } from "lucide-react";
import type React from "react";
import type { Size } from "./Dropdown";

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
			className="flex items-center gap-[0.62rem] p-3 rounded-md hover:bg-primary-5 active:bg-alpha-white-100"
			type="button"
			onClick={handleButtonClick}
		>
			<span className="text-alpha-black-100 text-base font-medium">{text}</span>
			<ChevronsUpDown className="w-5 h-5 text-alpha-black-100" />
		</button>
	);
};

export default DropdownCollapse;
