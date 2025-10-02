import clsx from "clsx";
import type React from "react";

//
//
//

interface BadgeProps {
	className?: string;
	icon: React.ReactNode;
	item: React.ReactNode;
}

//
//
//

const Badge = ({ className, icon, item }: BadgeProps) => {
	return (
		<div
			className={clsx(
				"p-padding-6 flex gap-gap-5 rounded-medium1 bg-color-gray-5",
				className,
			)}
		>
			{icon}
			{item}
		</div>
	);
};

export default Badge;
