import clsx from "clsx";
import type { ReactNode } from "react";
import { useDropdownContext } from "@/components/dropdown/DropdownContext";

//
//
//

interface DropdownContentProps {
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Container for dropdown items.
 *
 * @example
 * <Dropdown.Content>
 *   <Dropdown.Item value="option1">Option 1</Dropdown.Item>
 *   <Dropdown.Item value="option2">Option 2</Dropdown.Item>
 * </Dropdown.Content>
 */
const DropdownContent = ({ children, className }: DropdownContentProps) => {
	const { open } = useDropdownContext();

	if (!open) {
		return null;
	}

	return (
		<div
			className={clsx(
				"absolute z-50 bg-color-alpha-white100 flex flex-col items-start py-padding-2 rounded-radius-medium1 w-full border border-color-gray-20 shadow-m",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default DropdownContent;
