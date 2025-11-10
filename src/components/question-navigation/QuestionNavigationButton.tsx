import clsx from "clsx";
import { BUTTON_SIZE } from "./constants";

//
//
//

interface QuestionNavigationButtonProps {
	isActive: boolean;
	isMouseOver?: boolean;
	number: number;
	onClick: () => void;
}

//
//
//

const QuestionNavigationButton = ({
	isActive,
	isMouseOver,
	number,
	onClick,
}: QuestionNavigationButtonProps) => {
	return (
		<div
			style={{
				width: BUTTON_SIZE,
				height: BUTTON_SIZE,
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
				)}
			>
				{number}
			</button>
		</div>
	);
};

export default QuestionNavigationButton;
