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
}

//
//
//

const SolvingBadege = ({
	lable,
	direction = "row",
	icon,
	as: Component = "div",
}: SolvingBadegeProps) => {
	const flexDirection =
		direction === "row-reverse" ? "flex-row-reverse" : "flex-row";

	return (
		<Component
			className={`flex p-padding-6 gap-gap-5 rounded-radius-medium1 bg-primary-5 items-center ${flexDirection}`}
		>
			{icon}
			<span className="typo-heading-small text-primary-50">{lable}</span>
		</Component>
	);
};

export default SolvingBadege;
