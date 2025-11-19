import type React from "react";
import { useEffect, useRef, useState } from "react";
import useUser from "src/hooks/useUser";
import DropdownCollapse from "./DropdownCollapse";
import DropdownList from "./DropdownList";
import DropdownSelectBox from "./DropdownSelectBox";

//
//
//

export type ButtonType = "select box" | "collapse";
export type Size = "large" | "medium" | "small";

export interface Content {
	id: number;
	text: string;
}

export interface IconContent {
	id: number;
	icon: (className: string) => React.ReactNode;
	text: string;
}

interface DropdownProps {
	size: Size;
	buttonType: ButtonType;
	buttonText: string;
	group: string;
	contents: Content[] | IconContent[];
	width?: string;
}

//
//
//

const Dropdown = ({
	size,
	buttonType,
	buttonText,
	group,
	contents,
	width,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownHeight, setDropdownHeight] = useState(0);

	const { user } = useUser();

	const dropdownRef = useRef<HTMLDivElement>(null);

	/**
	 *
	 */
	const renderButton = () => {
		if (buttonType === "select box") {
			return (
				<DropdownSelectBox
					size={size}
					text={buttonText}
					width={width}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			);
		}

		if (buttonType === "collapse") {
			return (
				<DropdownCollapse
					size={size}
					text={buttonText}
					width={width}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			);
		}
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
		<div className="relative w-full flex">
			{renderButton()}
			<DropdownList
				isOpen={isOpen && !!user}
				group={group}
				contents={contents}
			/>
		</div>
	);
};

export default Dropdown;
