import clsx from "clsx";
import { BUTTON_SIZES, type QuestionNavigationSize } from "./constants";

//
//
//

type QuestionNavigationVariant = "default" | "success" | "point";

interface QuestionNavigationButtonProps {
	isActive: boolean;
	isMouseOver?: boolean;
	number: number;
	size?: QuestionNavigationSize;
	variant?: QuestionNavigationVariant;
	onClick: () => void;
	className?: string;
}

//
//
//

const QuestionNavigationButton = ({
	isActive,
	isMouseOver,
	number,
	size = "default",
	variant = "default",
	onClick,
	className,
}: QuestionNavigationButtonProps) => {
	const buttonSize = BUTTON_SIZES[size];

	/**
	 *
	 */
	const getVariantClassName = () => {
		if (variant === "success") {
			return "bg-color-success-5 text-color-success-50 border border-color-success-50";
		}

		if (variant === "point") {
			return "bg-color-point-5 text-color-point-50 border border-color-point-50";
		}

		return clsx({
			"bg-color-primary-5 text-color-primary-50 border border-color-primary-50":
				isActive,
			"text-color-alpha-black100": !isActive,
			"hover:bg-color-gray-5": !isActive && isMouseOver,
		});
	};

	return (
		<div
			style={{
				width: buttonSize,
				height: buttonSize,
			}}
		>
			<button
				type="button"
				onClick={onClick}
				aria-label={`Question ${number}${isActive ? " (active)" : ""}`}
				className={clsx(
					"w-full h-full rounded-medium1 flex items-center justify-center",
					"typo-heading-small",
					getVariantClassName(),
					className,
				)}
			>
				{number}
			</button>
		</div>
	);
};

export default QuestionNavigationButton;
