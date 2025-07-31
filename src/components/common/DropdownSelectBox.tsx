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
			className="group flex h-[47px] w-full items-center justify-between rounded-md border border-gray-20 bg-alpha-white-100 p-3 focus:border-primary-50"
			type="button"
			onClick={handleButtonClick}
		>
			<p className="text-[15px] font-medium text-gray-30 group-focus:text-alpha-black-100">
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
