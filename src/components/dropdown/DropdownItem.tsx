import clsx from "clsx";
import type { ReactNode } from "react";
import { useDropdownContext } from "@/components/dropdown/DropdownContext";

//
//
//

interface DropdownItemProps {
	disabled?: boolean;
	/** Whether this is a header/label item (non-selectable) */
	isHeader?: boolean;
	/** Unique value identifying this item */
	value: string;
	/** Optional icon to display before the label */
	icon?: ReactNode;
	/** Optional check icon to display when selected */
	checkIcon?: ReactNode;
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Selectable item within a dropdown.
 *
 * @example
 * <Dropdown.Item value="option1" icon={<Icon />} checkIcon={<CheckIcon />}>
 *   Option 1
 * </Dropdown.Item>
 */
const DropdownItem = ({
	value,
	children,
	icon,
	checkIcon,
	isHeader = false,
	className,
	disabled = false,
}: DropdownItemProps) => {
	const {
		value: selectedValue,
		onValueChange,
		onOpenChange,
	} = useDropdownContext();

	const isSelected = value === selectedValue;

	const handleClick = () => {
		if (disabled || isHeader) return;

		onValueChange?.(value);
		onOpenChange?.(false);
	};

	return (
		<div
			className={clsx(
				"box-border flex items-center px-padding-4 w-full",
				className,
			)}
		>
			<button
				type="button"
				onClick={handleClick}
				disabled={disabled || isHeader}
				className={clsx(
					"flex items-center relative py-padding-2 px-padding-4 mb-padding-2 rounded-sm w-full",
					{
						"bg-color-primary-5": isSelected && !isHeader,
						"cursor-pointer hover:bg-color-primary-5": !disabled && !isHeader,
						"cursor-default": disabled || isHeader,
					},
				)}
			>
				<div
					className={clsx("flex items-center justify-center pr-padding-4", {
						"opacity-0": !isSelected || isHeader,
					})}
				>
					{checkIcon}
				</div>

				<div
					className={clsx("flex gap-gap-5 items-center grow", {
						"text-color-gray-30": (disabled || !isSelected) && !isHeader,
						"text-black": !disabled,
					})}
				>
					{icon && <div className="flex items-center">{icon}</div>}
					<p className="typo-body-small text-nowrap whitespace-pre">
						{children}
					</p>
				</div>
			</button>
		</div>
	);
};

export default DropdownItem;
