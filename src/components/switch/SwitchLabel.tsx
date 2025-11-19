import clsx from "clsx";
import type { ReactNode } from "react";

export interface SwitchLabelProps {
	/** Additional CSS class names */
	className?: string;
	/** The label text or content */
	children: ReactNode;
}

/**
 * Switch label component that displays text inside the switch root
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Switch.Root checked={checked} onChange={setChecked}>
 *   <Switch.Label>문제 공개</Switch.Label>
 *   <Switch.Toggle />
 * </Switch.Root>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <Switch.Root checked={checked} onChange={setChecked}>
 *   <Switch.Label className="text-primary-50 font-bold">
 *     Custom Label
 *   </Switch.Label>
 *   <Switch.Toggle />
 * </Switch.Root>
 * ```
 */
export const SwitchLabel = ({ className, children }: SwitchLabelProps) => {
	return (
		<p
			className={clsx(
				"typo-body-medium text-color-alpha-black100 text-center text-nowrap",
				className,
			)}
		>
			{children}
		</p>
	);
};
