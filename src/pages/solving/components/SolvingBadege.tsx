import clsx from "clsx";
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
	color?: "gray" | "primary" | "success" | "point";
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
	color = "primary",
	disabled = false,
}: SolvingBadegeProps) => {
	const flexDirection =
		direction === "row-reverse" ? "flex-row-reverse" : "flex-row";

	return (
		<Component
			className={clsx(
				"flex p-padding-6 gap-gap-5 rounded-radius-medium1 items-center",
				flexDirection,
				{
					"bg-gray-5 text-alpha-black100 stroke-color-alpha-black100":
						color === "gray" && !disabled,
					"bg-primary-5 text-primary-50 stroke-color-primary-50":
						color === "primary" && !disabled,
					"bg-success-5 text-success-50 stroke-color-success-50":
						color === "success" && !disabled,
					"bg-point-5 text-point-50 stroke-color-point-50":
						color === "point" && !disabled,
				},
				{
					"cursor-not-allowed": disabled,
					"cursor-pointer": !disabled,
					"bg-gray-5 text-gray-20 stroke-color-gray-20": disabled,
				},
			)}
			onClick={disabled ? undefined : onClick}
		>
			{icon}
			<span className="typo-heading-small">{lable}</span>
		</Component>
	);
};

export default SolvingBadege;
