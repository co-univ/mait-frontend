import clsx from "clsx";
import type React from "react";

//
//
//

interface TeamManagementCategoriesBoxProps {
	hasBottomBorder?: boolean;
	hasRightBorder?: boolean;
	className?: string;
	children?: React.ReactNode;
}

//
//
//

const TeamManagementCategoriesBox = ({
	hasBottomBorder,
	hasRightBorder,
	className,
	children,
}: TeamManagementCategoriesBoxProps) => {
	return (
		<div
			className={clsx(
				"flex items-center px-padding-4 h-[40px] w-full border-color-gray-20",
				{
					"border-b": hasBottomBorder,
					"border-r": hasRightBorder,
				},
				className,
			)}
		>
			{children}
		</div>
	);
};

export default TeamManagementCategoriesBox;
