import clsx from "clsx";
import type React from "react";

//
//
//

export interface ButtonProps {
	className?: string;
	variant?: "primary" | "secondary";
	icon?: React.ReactNode;
	item?: React.ReactNode;
	onClick?: () => void;
}

//
//
//

const Button = ({ className, variant, icon, item, onClick }: ButtonProps) => {
	return (
		<button
			type="button"
			className={clsx(
				"p-padding-6 flex gap-gap-5 rounded-medium1 border border-color-gray-10 typo-body-medium",
				className,
				variant === "primary" &&
					"hover:bg-color-primary-50 hover:border-color-primary-50 hover:text-color-alpha-white100",
				variant === "secondary" &&
					"hover:bg-color-secondary-50 hover:border-color-secondary-50 hover:text-color-alpha-white100",
			)}
			onClick={onClick}
		>
			{icon}
			{item}
		</button>
	);
};

export default Button;
