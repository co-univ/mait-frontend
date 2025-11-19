import clsx from "clsx";
import type { ReactNode } from "react";

//
//
//

interface TableHeaderProps {
	children: ReactNode;
	className?: string;
}

//
//
//

/**
 * Header component for Table. Contains table header cells.
 *
 * @example
 * <Table.Header>
 *   <Table.HeaderCell>Name</Table.HeaderCell>
 *   <Table.HeaderCell>Email</Table.HeaderCell>
 * </Table.Header>
 */
const TableHeader = ({ children, className }: TableHeaderProps) => {
	return (
		<div
			className={clsx(
				"flex w-full items-center typo-body-small text-color-gray-50",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default TableHeader;
