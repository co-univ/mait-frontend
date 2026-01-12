import type { ReferenceType } from "@floating-ui/react-dom";
import type { RefObject } from "react";
import { createContext, useContext } from "react";

//
//
//

interface DropdownContextValue<T extends string = string> {
	/** Current open state */
	open?: boolean;
	/** Function to update the open state */
	onOpenChange?: (open: boolean) => void;
	/** Current selected value */
	value?: T;
	/** Function to update the selected value */
	onValueChange?: (value: T) => void;
	/** Reference to the trigger element for positioning */
	triggerRef?: RefObject<HTMLElement | null>;
	/** Function to set the reference element for positioning */
	setReference?: (node: ReferenceType | null) => void;
	/** Function to set the floating element for positioning */
	setFloating?: (node: HTMLElement | null) => void;
	/** Styles for positioning the floating element */
	floatingStyles?: React.CSSProperties;
}

const DropdownContext = createContext<DropdownContextValue<string> | undefined>(
	undefined,
);

//
//
//

/**
 * Hook to access dropdown context.
 * Must be used within Dropdown.Root.
 */
const useDropdownContext = <
	T extends string = string,
>(): DropdownContextValue<T> => {
	const context = useContext(DropdownContext);

	if (!context) {
		throw new Error("Dropdown components must be used within Dropdown.Root");
	}

	return context as unknown as DropdownContextValue<T>;
};

export { DropdownContext, useDropdownContext };
