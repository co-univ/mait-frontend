import clsx from "clsx";
import type { ReactNode } from "react";

export interface RadioLabelProps {
	/** Additional CSS class names */
	className?: string;
	/** The label text or content */
	children: ReactNode;
}

/**
 * Radio label component that displays text next to the radio input
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
 *   <Radio.Input />
 *   <Radio.Label className="text-blue-500 font-bold">
 *     Custom Label
 *   </Radio.Label>
 * </Radio.Item>
 * ```
 *
 * @example
 * With complex content:
 * ```tsx
 * <Radio.Item value="premium">
 *   <Radio.Input />
 *   <Radio.Label>
 *     <div>
 *       <div className="font-bold">Premium Plan</div>
 *       <div className="text-sm text-gray-500">$29/month</div>
 *     </div>
 *   </Radio.Label>
 * </Radio.Item>
 * ```
 */
export const RadioLabel = ({ className, children }: RadioLabelProps) => {
	return (
		<div
			className={clsx(
				"flex flex-col gap-gap-5 items-start justify-center shrink-0",
				className,
			)}
		>
			<div className="flex gap-gap-5 items-center justify-center shrink-0">
				<p className="typo-body-medium">{children}</p>
			</div>
		</div>
	);
};
