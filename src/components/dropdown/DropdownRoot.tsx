import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react-dom";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { DropdownContext } from "@/components/dropdown/DropdownContext";

//
//
//

interface DropdownRootProps {
	/** Controlled open state */
	open?: boolean;
	/** Default open state for uncontrolled mode */
	defaultOpen?: boolean;
	/** Callback when open state changes */
	onOpenChange?: (open: boolean) => void;
	/** Controlled selected value */
	value?: string;
	/** Default value for uncontrolled mode */
	defaultValue?: string;
	/** Positioning strategy */
	strategy?: "absolute" | "fixed";
	/** Callback when value changes */
	onValueChange?: (value: string) => void;
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Root component for Dropdown. Manages the open state and selected value.
 *
 * @example
 * // Uncontrolled
 * <Dropdown.Root defaultValue="option1">
 *   <Dropdown.Trigger>...</Dropdown.Trigger>
 *   <Dropdown.Content>...</Dropdown.Content>
 * </Dropdown.Root>
 *
 * @example
 * // Controlled
 * <Dropdown.Root value={selected} onValueChange={setSelected} open={isOpen} onOpenChange={setIsOpen}>
 *   <Dropdown.Trigger>...</Dropdown.Trigger>
 *   <Dropdown.Content>...</Dropdown.Content>
 * </Dropdown.Root>
 */
const DropdownRoot = ({
	open: controlledOpen,
	defaultOpen,
	onOpenChange,
	value: controlledValue,
	defaultValue,
	strategy = "absolute",
	onValueChange,
	children,
	className,
}: DropdownRootProps) => {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

	const { refs, floatingStyles } = useFloating({
		placement: "bottom-start",
		middleware: [offset(2), flip()],
		strategy,
		whileElementsMounted: autoUpdate,
	});

	const triggerRef = useRef<HTMLElement>(null);

	const isOpenControlled = controlledOpen !== undefined;
	const isValueControlled = controlledValue !== undefined;

	const open = isOpenControlled ? controlledOpen : uncontrolledOpen;
	const value = isValueControlled ? controlledValue : uncontrolledValue;

	/**
	 * Handle open state change for both controlled and uncontrolled modes
	 */
	const handleOpenChange = (newOpen: boolean) => {
		if (!isOpenControlled) {
			setUncontrolledOpen(newOpen);
		}

		onOpenChange?.(newOpen);
	};

	/**
	 *  Handle value change for both controlled and uncontrolled modes
	 */
	const handleValueChange = (newValue: string) => {
		if (!isValueControlled) {
			setUncontrolledValue(newValue);
		}

		onValueChange?.(newValue);
	};

	return (
		<DropdownContext.Provider
			value={{
				open,
				onOpenChange: handleOpenChange,
				value,
				onValueChange: handleValueChange,
				triggerRef,
				setReference: refs.setReference,
				setFloating: refs.setFloating,
				floatingStyles,
			}}
		>
			<div className={clsx("relative", className)}>{children}</div>
		</DropdownContext.Provider>
	);
};

export default DropdownRoot;
