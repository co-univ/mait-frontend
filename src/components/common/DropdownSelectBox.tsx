import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import type { Size } from "./Dropdown";

//
//
//

const CHEVRON_STYLE = "text-alpha-black-50 w-4 h-4";

//
//
//

interface DropdownSelectBoxProps {
	size: Size;
	text: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	width?: string;
}

//
//
//

const DropdownSelectBox = ({
	size,
	text,
	isOpen,
	setIsOpen,
	width,
}: DropdownSelectBoxProps) => {
	/**
	 *
	 */
	const handleButtonClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<button
			className="group bg-alpha-white-100 rounded-md border border-gray-20 p-3 w-full h-[47px] flex items-center justify-between focus:border-primary-50"
			type="button"
			onClick={handleButtonClick}
		>
			<p className="text-gray-30 text-[15px] font-medium group-focus:text-alpha-black-100">
				{text}
			</p>
			{isOpen ? (
				<ChevronUp className={CHEVRON_STYLE} />
			) : (
				<ChevronDown className={CHEVRON_STYLE} />
			)}
		</button>
	);
};

export default DropdownSelectBox;
