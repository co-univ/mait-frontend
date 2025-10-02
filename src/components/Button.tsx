import clsx from "clsx";
import type React from "react";

//
//
//

export interface ButtonProps {
	className?: string;
	icon?: React.ReactNode;
	item?: React.ReactNode;
	onClick?: () => void;
}

//
//
//

const Button = ({ className, icon, item, onClick }: ButtonProps) => {
	return (
		<button
			type="button"
			className={clsx(
				"p-padding-6 flex gap-gap-5 rounded-medium1 border border-color-gray-10 typo-body-medium",
				className,
			)}
			onClick={onClick}
		>
			{icon}
			{item}
		</button>
	);
};

export default Button;
