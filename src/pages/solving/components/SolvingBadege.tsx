import type React from "react";
import type { JSX } from "react";

//
//
//

export interface SolvingBadegeProps {
	lable: string;
	direction?: "row" | "row-reverse";
	icon: React.ReactNode;
	as?: keyof JSX.IntrinsicElements;
	onClick?: () => void;
	disabled?: boolean;
}

//
//
//

const SolvingBadege = ({
	lable,
	direction = "row",
	icon,
	as: Component = "div",
	onClick,
	disabled = false,
}: SolvingBadegeProps) => {
	const flexDirection =
		direction === "row-reverse" ? "flex-row-reverse" : "flex-row";

	const bgColor = disabled ? "bg-color-gray-5" : "bg-primary-5";
	const textColor = disabled ? "text-color-gray-20" : "text-primary-50";
	const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";

	return (
		<Component
			className={`flex p-padding-6 gap-gap-5 rounded-radius-medium1 ${bgColor} items-center ${flexDirection} ${cursor}`}
			onClick={disabled ? undefined : onClick}
		>
			{icon}
			<span className={`typo-heading-small ${textColor}`}>{lable}</span>
		</Component>
	);
};

export default SolvingBadege;
