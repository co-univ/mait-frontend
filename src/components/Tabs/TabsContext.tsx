import { createContext, useContext } from "react";

//
//
//

/** Internal context for sharing tab state between components */

interface TabsContextValue {
	/** Current active tab value */
	value?: string;
	/** Function to update the active tab */
	onValueChange?: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

//
//
//

/**
 * Hook to access tab context.
 * Must be used within Tabs.Root.
 */
const useTabsContext = () => {
	const context = useContext(TabsContext);

	if (!context) {
		throw new Error("Tabs components must be used within Tabs.Root");
	}

	return context;
};

export { TabsContext, useTabsContext };
