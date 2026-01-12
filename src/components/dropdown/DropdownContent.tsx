import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
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

	const contentRef = useRef<HTMLDivElement>(null);

	const { open, triggerRef, onOpenChange, setFloating, floatingStyles } =
		useDropdownContext();

	//
	useEffect(() => {
		if (open && triggerRef?.current && !autoWidth) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			setWidth(`${triggerRect.width}px`);
		}
	}, [open, triggerRef, autoWidth]);

	//
	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				contentRef.current &&
				!contentRef.current.contains(target) &&
				triggerRef?.current &&
				!triggerRef.current.contains(target)
			) {
				onOpenChange?.(false);
			}
		};

		const timeoutId = setTimeout(() => {
			document.addEventListener("mousedown", handleClickOutside);
		}, 0);

		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open, triggerRef, onOpenChange]);

	if (!open) {
		return null;
	}

	return createPortal(
		<div
			ref={(node) => {
				contentRef.current = node;
				setFloating?.(node);
			}}
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
