import { createContext, useContext } from "react";

//
//
//

interface DropdownContextValue {
	/** Current open state */
	open?: boolean;
	/** Function to update the open state */
	onOpenChange?: (open: boolean) => void;
	/** Current selected value */
	value?: string;
	/** Function to update the selected value */
	onValueChange?: (value: string) => void;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
	undefined,
);

//
//
//

/**
 * Hook to access dropdown context.
 * Must be used within Dropdown.Root.
 */
const useDropdownContext = () => {
	const context = useContext(DropdownContext);

	if (!context) {
		throw new Error("Dropdown components must be used within Dropdown.Root");
	}

	return context;
};

export { DropdownContext, useDropdownContext };
