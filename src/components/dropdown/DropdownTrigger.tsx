import clsx from "clsx";
import type { ReactNode } from "react";
import { useDropdownContext } from "@/components/dropdown/DropdownContext";

//
//
//

interface DropdownTriggerProps {
	placeholder?: string;
	className?: string;
	icon?: ReactNode;
	children: ReactNode;
}

//
//
//

/**
 * Clickable trigger button that toggles the dropdown content.
 *
 * @example
 * <Dropdown.Trigger placeholder="선택해주세요." icon={<ChevronDownIcon />}>
 *   {selectedLabel}
 * </Dropdown.Trigger>
 */
const DropdownTrigger = ({
	placeholder,
	className,
	children,
	icon,
}: DropdownTriggerProps) => {
	const { open, onOpenChange, value, setReference, triggerRef } =
		useDropdownContext();

	return (
		<button
			ref={(node) => {
				setReference?.(node);

				if (triggerRef) {
					triggerRef.current = node;
				}
			}}
			type="button"
			onClick={() => onOpenChange?.(!open)}
			className={clsx(
				"bg-color-alpha-white100 box-border flex items-center justify-between px-padding-6 py-padding-6 mb-padding-2 rounded-radius-medium1 relative w-full",
				{
					"border border-color-primary-50": open,
					"border border-color-gray-60": !open,
				},
				className,
			)}
		>
			<div className="flex gap-gap-6 items-center">
				<p className="typo-body-small text-nowrap whitespace-pre">
					{value ? children : placeholder || "선택해주세요."}
				</p>
			</div>
			{icon && (
				<div
					className={clsx(
						"flex gap-gap-6 items-center justify-end opacity-50",
						{
							"rotate-180": open,
						},
					)}
				>
					{icon}
				</div>
			)}
		</button>
	);
};

export default DropdownTrigger;
