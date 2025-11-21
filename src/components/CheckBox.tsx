import clsx from "clsx";
import { Square, SquareCheck } from "lucide-react";
import type React from "react";

//
//
//

interface CheckBoxProps {
	checked: boolean;
	disabled?: boolean;
	size?: number;
	className?: string;
	onChange: (checked: boolean) => void;
}

//
//
//

const CheckBox = ({
	checked,
	disabled = false,
	size = 24,
	className,
	onChange,
}: CheckBoxProps) => {
	/**
	 *
	 */
	const handleClick = () => {
		if (!disabled) {
			onChange(!checked);
		}
	};

	/**
	 *
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if ((event.key === "Enter" || event.key === " ") && !disabled) {
			event.preventDefault();
			onChange(!checked);
		}
	};

	/**
	 *
	 */
	const renderIcon = () => {
		if (checked) {
			return (
				<SquareCheck
					size={size}
					className={clsx(
						"fill-color-primary-50 [&>path]:text-color-alpha-white100",
						{
							"text-color-primary-50": !disabled,
							"fill-color-gray-10 text-color-gray-10": disabled,
						},
					)}
				/>
			);
		}

		return (
			<Square
				size={size}
				className={clsx({
					"text-color-gray-20 fill-color-gray-10 cursor-not-allowed": disabled,
				})}
			/>
		);
	};

	return (
		<div
			className={clsx(
				"inline-flex cursor-pointer text-color-gray-30",
				{
					"opacity-50 cursor-not-allowed": disabled,
				},
				className,
			)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			// biome-ignore lint/a11y/useSemanticElements: div is used for custom checkbox
			role="checkbox"
			aria-checked={checked}
			tabIndex={disabled ? -1 : 0}
		>
			{renderIcon()}
		</div>
	);
};

export default CheckBox;
