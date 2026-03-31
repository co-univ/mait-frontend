import clsx from "clsx";
import { BUTTON_SIZES, type QuestionNavigationVariation } from "./constants";

//
//
//

interface QuestionNavigationButtonProps {
	isActive: boolean;
	isMouseOver?: boolean;
	number: number;
	onClick: () => void;
	className?: string;
	variation?: QuestionNavigationVariation;
}

//
//
//

const QuestionNavigationButton = ({
	isActive,
	isMouseOver,
	number,
	onClick,
	className,
	variation = "default",
}: QuestionNavigationButtonProps) => {
	const size = BUTTON_SIZES[variation];

	return (
		<div
			style={{
				width: size,
				height: size,
			}}
		>
			<button
				type="button"
				onClick={onClick}
				aria-label={`Question ${number}${isActive ? " (active)" : ""}`}
				className={clsx(
					"w-full h-full rounded-medium1 flex items-center justify-center",
					"typo-heading-small",
					{
						"bg-color-primary-5 text-color-primary-50 border border-color-primary-50":
							isActive,
						"text-color-alpha-black100": !isActive,
						"hover:bg-color-gray-5": !isActive && isMouseOver,
					},
					className,
				)}
			>
				{number}
			</button>
		</div>
	);
};

export default QuestionNavigationButton;
