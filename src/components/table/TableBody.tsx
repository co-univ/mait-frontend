import clsx from "clsx";
import type { ReactNode } from "react";

//
//
//

interface TableBodyProps {
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Body component for Table. Contains table rows.
 *
 * @example
 * <Table.Body>
 *   <Table.Row>...</Table.Row>
 *   <Table.Row>...</Table.Row>
 * </Table.Body>
 */
const TableBody = ({ children, className }: TableBodyProps) => {
	return (
		<div
			className={clsx(
				"w-full flex flex-col items-center typo-body-small",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default TableBody;
