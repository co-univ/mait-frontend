import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDropdownContext } from "@/components/dropdown/DropdownContext";

//
//
//

interface DropdownContentProps {
	autoWidth?: boolean;
	className?: string;
	children: ReactNode;
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
const DropdownContent = ({
	children,
	className,
	autoWidth = false,
}: DropdownContentProps) => {
	const [width, setWidth] = useState<string>("auto");

	const { open, triggerRef, setFloating, floatingStyles } =
		useDropdownContext();

	useEffect(() => {
		if (open && triggerRef?.current && !autoWidth) {
			const triggerRect = triggerRef.current.getBoundingClientRect();

			setWidth(`${triggerRect.width}px`);
		}
	}, [open, triggerRef, autoWidth]);

	if (!open) {
		return null;
	}

	return createPortal(
		<div
			ref={setFloating}
			className={clsx(
				"z-50 bg-color-alpha-white100 flex flex-col items-start pt-padding-2 rounded-radius-medium1 border border-color-gray-20 shadow-m",
				className,
			)}
			style={Object.assign({}, floatingStyles, { width }) as CSSProperties}
		>
			{children}
		</div>,
		document.body,
	);
};

export default DropdownContent;
