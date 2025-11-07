import clsx from "clsx";
import type { KeyboardEvent, ReactNode } from "react";
import { createContext, useContext } from "react";
import { useRadioItem } from "./useRadio";

export interface RadioItemProps {
	/** The value of this radio item */
	value: string;
	/** Additional CSS class names */
	className?: string;
	/** The radio input and label components */
	children: ReactNode;
}

interface RadioItemContextValue {
	isChecked: boolean;
}

const RadioItemContext = createContext<RadioItemContextValue | null>(null);

export const useRadioItemContext = () => {
	const context = useContext(RadioItemContext);
	if (!context) {
		throw new Error(
			"Radio.Input and Radio.Label must be used within Radio.Item",
		);
	}
	return context;
};

/**
 * Radio item component that wraps a radio input and label
 * Handles click and keyboard interactions
 *
 * @example
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
 * <Radio.Item value="option1" className="p-4 bg-gray-100">
 *   <Radio.Input />
 *   <Radio.Label>Custom Styled Option</Radio.Label>
 * </Radio.Item>
 * ```
 */
export const RadioItem = ({ value, className, children }: RadioItemProps) => {
	const { isChecked, handleChange, disabled } = useRadioItem(value);

	/**
	 *
	 */
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			handleChange();
		}
	};

	return (
		<RadioItemContext.Provider value={{ isChecked }}>
			<div
				// biome-ignore lint/a11y/useSemanticElements: <div> is used for custom radio item with role and keyboard handling
				role="radio"
				aria-checked={isChecked}
				aria-disabled={disabled}
				tabIndex={disabled ? -1 : 0}
				onClick={handleChange}
				onKeyDown={handleKeyDown}
				className={clsx(
					"flex items-center gap-gap-10 cursor-pointer",
					{ "opacity-50 cursor-not-allowed": disabled },
					className,
				)}
			>
				{children}
			</div>
		</RadioItemContext.Provider>
	);
};
