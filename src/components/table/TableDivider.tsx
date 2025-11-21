import clsx from "clsx";

//
//
//

interface TableDividerProps {
	className?: string;
}

//
//
//

/**
 * Divider component for Table. Creates a horizontal line separator.
 * Used between header/rows.
 *
 * @example
 * <Table.Divider />
 */
const TableDivider = ({ className }: TableDividerProps) => {
	return <div className={clsx("h-px w-full bg-color-gray-10", className)} />;
};

export default TableDivider;
