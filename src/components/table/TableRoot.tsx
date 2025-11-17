import clsx from "clsx";
import type { ReactNode } from "react";
import { TableContext } from "@/components/table/TableContext";

//
//
//

interface TableRootProps {
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Root component for Table. Provides context and container styling.
 *
 * @example
 * <Table.Root>
 *   <Table.Header>...</Table.Header>
 *   <Table.Body>...</Table.Body>
 * </Table.Root>
 */
const TableRoot = ({ children, className }: TableRootProps) => {
	return (
		<TableContext.Provider value={{}}>
			<div
				className={clsx(
					"flex flex-col items-start rounded-radius-medium1 border border-color-gray-10",
					className,
				)}
			>
				{children}
			</div>
		</TableContext.Provider>
	);
};

export default TableRoot;
