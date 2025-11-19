import type React from "react";

//
//
//

interface SidebarItemProps {
	className?: string;
	children: React.ReactNode;
}

//
//
//

const SidebarItem = ({ className, children }: SidebarItemProps) => {
	return (
		<div
			className={`w-[216px] h-size-height-9 p-padding-6 rounded-medium1 typo-body-medium ${className}`}
		>
			{children}
		</div>
	);
};

export default SidebarItem;
