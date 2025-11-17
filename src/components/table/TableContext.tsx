import { createContext, useContext } from "react";

//
//
//

interface TableContextValue {
	/** Optional context values for table state management */
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

//
//
//

/**
 * Hook to access table context.
 * Must be used within Table.Root.
 */
const useTableContext = () => {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error("Table components must be used within Table.Root");
	}

	return context;
};

export { TableContext, useTableContext };
