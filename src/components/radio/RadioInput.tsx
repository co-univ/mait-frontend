import clsx from "clsx";

import { useRadioItemContext } from "./RadioItem";

export interface RadioInputProps {
	/** Additional CSS class names */
	className?: string;
}

/**
 * Radio input component that displays the visual radio button
 * Automatically reflects the checked state from the Radio.Group context
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Radio.Item value="option1">
 *   <Radio.Input />
 *   <Radio.Label>Option 1</Radio.Label>
 * </Radio.Item>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <Radio.Item value="option1">
 *   <Radio.Input className="border-2 border-blue-500" />
 *   <Radio.Label>Custom Radio</Radio.Label>
 * </Radio.Item>
 * ```
 */
export const RadioInput = ({ className }: RadioInputProps) => {
	const { isChecked } = useRadioItemContext();

	return (
		<div
			className={clsx(
				"relative size-[16px] border border-color-alpha-black100 rounded-full shrink-0",
				className,
			)}
			data-radio-input
		>
			<div className="overflow-hidden rounded-inherit size-4">
				<div
					className={clsx(
						"absolute size-[12px] bg-color-alpha-black100 border border-color-alpha-black100 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
						isChecked ? "opacity-100" : "opacity-0",
					)}
					data-radio-inner
				/>
			</div>
		</div>
	);
};
