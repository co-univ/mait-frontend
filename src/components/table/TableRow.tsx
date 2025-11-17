import clsx from "clsx";
import type { ReactNode } from "react";

//
//
//

interface TableRowProps {
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Row component for Table. Contains table cells.
 * Used within Table.Body.
 *
 * @example
 * <Table.Row>
 *   <Table.Cell>John Doe</Table.Cell>
 *   <Table.Cell>john@example.com</Table.Cell>
 * </Table.Row>
 */
const TableRow = ({ children, className }: TableRowProps) => {
	return (
		<div className={clsx("flex w-full items-center", className)}>
			{children}
		</div>
	);
};

export default TableRow;
