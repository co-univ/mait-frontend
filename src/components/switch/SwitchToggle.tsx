import clsx from "clsx";
import { useContext } from "react";
import { SwitchContext } from "./SwitchContext";

export interface SwitchToggleProps {
	/** Additional CSS class names */
	className?: string;
}

/**
 * Switch toggle component that displays the visual switch button
 * Automatically reflects the checked state from the Switch.Root context
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Switch.Root checked={checked} onChange={setChecked}>
 *   <Switch.Toggle />
 * </Switch.Root>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <Switch.Root checked={checked} onChange={setChecked}>
 *   <Switch.Toggle className="w-10 h-6" />
 * </Switch.Root>
 * ```
 */
export const SwitchToggle = ({ className }: SwitchToggleProps) => {
	const context = useContext(SwitchContext);

	if (!context) {
		throw new Error("SwitchToggle must be used within Switch.Root");
	}

	const { checked, disabled } = context;

	return (
		<div
			className={clsx(
				"relative w-[36px] h-[20px] rounded-full shadow-sm transition-colors overflow-hidden",
				{
					"bg-primary-50": checked && !disabled,
					"bg-gray-10": !checked || disabled,
				},
				className,
			)}
			data-switch-toggle
		>
			<div
				className={clsx(
					"absolute size-2 bg-alpha-white100 rounded-full top-[2px] transition-all left-[2.5px]",
					{
						"translate-x-[15px]": checked,
					},
				)}
				data-switch-thumb
			/>
		</div>
	);
};
