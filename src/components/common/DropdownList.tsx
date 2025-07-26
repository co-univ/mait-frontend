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

	/**
	 *
	 */
	const renderDropdownItem = (item: string | IconContent, i: number) => {
		const isItemObject = typeof item === "object" && item !== null;
		const icon = isItemObject && "icon" in item ? item.icon : null;
		const text = isItemObject && "text" in item ? item.text : item;

		return (
			<button
				key={i}
				type="button"
				className="group flex items-center gap-[0.62rem] py-[0.28rem] px-[0.5rem] w-full hover:bg-primary-5 rounded-sm"
			>
				{icon?.("w-5 h-5 text-gray-30 group-hover:text-alpha-black-100")}
				<p className="text-gray-30 text-left truncate font-medium text-[0.9375rem] group-hover:text-alpha-black-100 select-none">
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
			className="rounded-[6px] border border-gray-20 bg-alpha-white-100 mt-1"
			ref={dropdownRef}
			style={{
				height: isOpen ? dropdownHeight : 0,
				opacity: isOpen ? 1 : 0,
				transition: "height 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s",
				overflow: "hidden",
			}}
			aria-hidden={!isOpen}
		>
			<div className="w-full p-1">
				<p className="text-alpha-black-100 text-[0.9375rem] py-[0.28rem] px-[0.5rem] font-medium select-none">
					{group}
				</p>
			</div>
			<div className="w-full h-px bg-gray-20" />
			<div className="flex flex-col gap-[0.62rem] w-full p-1">
				{contents.map(renderDropdownItem)}
			</div>
		</div>
	);
};

export default DropdownList;
