import clsx from "clsx";
import type { ReactNode } from "react";

//
//
//

interface TableHeaderCellProps {
	children: ReactNode;
	className?: string;
	/** Width of the cell (e.g., "100px", "auto", "1fr") */
	width?: string;
	/** Make the cell grow to fill available space */
	grow?: boolean;
}

//
//
//

/**
 * Header cell component for Table. Used within Table.Header.
 *
 * @example
 * <Table.HeaderCell width="100px">Name</Table.HeaderCell>
 * <Table.HeaderCell grow>Description</Table.HeaderCell>
 */
const TableHeaderCell = ({
	children,
	className,
	width,
	grow,
}: TableHeaderCellProps) => {
	return (
		<span
			className={clsx(
				"p-padding-4",
				{
					"grow basis-0": grow,
				},
				className,
			)}
			style={{ width: width }}
		>
			{children}
		</span>
	);
};

export default TableHeaderCell;
