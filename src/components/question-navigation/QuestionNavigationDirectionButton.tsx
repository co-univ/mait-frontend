import clsx from "clsx";
import type React from "react";
import { BUTTON_SIZE } from "./constants";

//
//
//

interface QuestionNavigationDirectionButtonProps {
	onClick: () => void;
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
}

//
//
//

const QuestionNavigationDirectionButton = ({
	onClick,
	disabled,
	className,
	children,
}: QuestionNavigationDirectionButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			aria-label="Scroll direction button"
			className={clsx(
				"flex items-center justify-center rounded-medium1",
				{
					"hover:bg-color-gray-5": !disabled,
					"opacity-30 cursor-default": disabled,
				},
				className,
			)}
			style={{
				width: BUTTON_SIZE,
				height: BUTTON_SIZE,
			}}
		>
			{children}
		</button>
	);
};

export default QuestionNavigationDirectionButton;
