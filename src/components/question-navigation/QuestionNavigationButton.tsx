import clsx from "clsx";
import { useState } from "react";
import { BUTTON_SIZE } from "./constants";

interface QuestionNavigationButtonProps {
	isActive: boolean;
	canDelete: boolean;
	number: number;
	DeleteIcon: React.ReactNode;
	onClick: () => void;
	onDelete?: () => void;
}

//
//
//

const QuestionNavigationButton = ({
	isActive,
	canDelete,
	number,
	DeleteIcon,
	onClick,
	onDelete,
}: QuestionNavigationButtonProps) => {
	const [isMouseOver, setIsMouseOver] = useState(false);

	/**
	 *
	 */
	const handleMouseEnter = () => {
		setIsMouseOver(true);
	};

	/**
	 *
	 */
	const handleMouseLeave = () => {
		setIsMouseOver(false);
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: -- IGNORE --
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="relative"
			style={{
				width: BUTTON_SIZE,
				height: BUTTON_SIZE,
			}}
		>
			<button
				type="button"
				onClick={onClick}
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
			{canDelete && isMouseOver && (
				<button
					type="button"
					onClick={onDelete}
					className="absolute top-[5px] right-[5px]"
				>
					{DeleteIcon}
				</button>
			)}
		</div>
	);
};

export default QuestionNavigationButton;
