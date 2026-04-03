import clsx from "clsx";
import type React from "react";
import type { JSX } from "react";
import useBreakpoint from "@/hooks/useBreakpoint";

//
//
//

export interface SolvingBadgeProps {
	lable: string;
	direction?: "row" | "row-reverse";
	icon?: React.ReactNode;
	as?: keyof JSX.IntrinsicElements;
	onClick?: () => void;
	color?: "gray" | "primary" | "success" | "point";
	disabled?: boolean;
}

//
//
//

const SolvingBadge = ({
	lable,
	direction = "row",
	icon,
	as,
	onClick,
	color = "primary",
	disabled = false,
}: SolvingBadgeProps) => {
	const Component = as ?? "div";

	const { isMobile } = useBreakpoint();

	const flexDirection =
		direction === "row-reverse" ? "flex-row-reverse" : "flex-row";

	return (
		<Component
			className={clsx(
				"flex gap-gap-5 rounded-radius-medium1 items-center",
				{
					"p-padding-6": !isMobile,
					"p-padding-3": isMobile,
				},
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
					"cursor-not-allowed": disabled && as === "button",
					"cursor-pointer": !disabled && as === "button",
					"bg-gray-5 text-gray-20 stroke-color-gray-20": disabled,
				},
			)}
			onClick={disabled ? undefined : onClick}
		>
			{icon && (
				<div
					className={clsx("*:w-full *:h-full", {
						"w-4 h-4": !isMobile,
						"w-3 h-3": isMobile,
					})}
				>
					{icon}
				</div>
			)}
			<span
				className={clsx({
					"typo-heading-small": !isMobile,
					"typo-heading-xxsmall": isMobile,
				})}
			>
				{lable}
			</span>
		</Component>
	);
};

export default SolvingBadge;
