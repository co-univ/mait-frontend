import clsx from "clsx";
import type React from "react";
import { forwardRef } from "react";

//
//
//

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	variant?: "primary" | "secondary";
	icon?: React.ReactNode;
	item?: React.ReactNode;
	onClick?: () => void;
}

//
//
//

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, icon, item, onClick, ...props }, ref) => {
		return (
			<button
				ref={ref}
				type="button"
				className={clsx(
					"p-padding-6 flex items-center gap-gap-5 rounded-medium1 border border-color-gray-10 typo-body-medium",
					variant === "primary" &&
						"hover:bg-color-primary-50 hover:border-color-primary-50 hover:text-color-alpha-white100",
					variant === "secondary" &&
						"hover:bg-color-secondary-50 hover:border-color-secondary-50 hover:text-color-alpha-white100",
					className,
				)}
				onClick={onClick}
				{...props}
			>
				{icon}
				{item}
			</button>
		);
	},
);

Button.displayName = "Button";

export default Button;
