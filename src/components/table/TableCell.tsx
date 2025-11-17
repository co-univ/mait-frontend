import clsx from "clsx";
import type { ReactNode } from "react";

//
//
//

interface TableCellProps {
	/** Make the cell grow to fill available space */
	grow?: boolean;
	/** Width of the cell (e.g., "100px", "auto", "1fr") */
	width?: string;
	className?: string;
	children: ReactNode;
}

//
//
//

/**
 * Cell component for Table. Used within Table.Row.
 *
 * @example
 * <Table.Cell width="100px">John Doe</Table.Cell>
 */
const TableCell = ({ grow, width, className, children }: TableCellProps) => {
	return (
		<div
			className={clsx(
				"px-padding-4 py-padding-6",
				{
					"grow basis-0": grow,
				},
				className,
			)}
			style={{ width: width }}
		>
			{children}
		</div>
	);
};

export default TableCell;
