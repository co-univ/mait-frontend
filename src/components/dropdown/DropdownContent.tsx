import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
	const { open, triggerRef } = useDropdownContext();
	const [position, setPosition] = useState<CSSProperties>({});

	useEffect(() => {
		if (open && triggerRef?.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			setPosition({
				position: "fixed",
				top: `${triggerRect.bottom + 2}px`,
				left: `${triggerRect.left}px`,
				width: `${triggerRect.width}px`,
			});
		}
	}, [open, triggerRef]);

	if (!open) {
		return null;
	}

	return createPortal(
		<div
			className={clsx(
				"z-50 bg-color-alpha-white100 flex flex-col items-start py-padding-2 rounded-radius-medium1 border border-color-gray-20 shadow-m",
				className,
			)}
			style={position}
		>
			{children}
		</div>,
		document.body,
	);
};

export default DropdownContent;
