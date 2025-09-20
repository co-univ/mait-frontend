import clsx from "clsx";
import { SquareMinus } from "lucide-react";
import type React from "react";

interface DeleteCheckBoxProps {
	disabled?: boolean;
	size?: number;
	className?: string;
	onClick?: () => void;
}

const DeleteCheckBox = ({
	disabled = false,
	size = 24,
	className,
	onClick,
}: DeleteCheckBoxProps) => {
	/**
	 *
	 */
	const handleClick = () => {
		if (!disabled && onClick) {
			onClick();
		}
	};

	/**
	 *
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if ((event.key === "Enter" || event.key === " ") && !disabled && onClick) {
			event.preventDefault();
			onClick();
		}
	};

	return (
		<div
			className={clsx(
				"inline-flex cursor-pointer",
				{
					"opacity-50 cursor-not-allowed": disabled,
				},
				className,
			)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			// biome-ignore lint/a11y/useSemanticElements: div is used for custom delete checkbox
			role="button"
			tabIndex={disabled ? -1 : 0}
		>
			<SquareMinus
				size={size}
				className={clsx(
					"fill-color-point-5 text-color-point-5 [&>path]:text-color-point-50 hover:fill-color-point-10 hover:text-color-point-10",
					{
						"fill-color-gray-10 text-color-gray-10": disabled,
					}
				)}
			/>
		</div>
	);
};

export default DeleteCheckBox;