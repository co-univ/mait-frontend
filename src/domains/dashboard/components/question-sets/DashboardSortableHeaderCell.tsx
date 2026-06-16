import type { ReactNode } from "react";
import { Table } from "@/components/table";
import DashboardSortIcon from "./DashboardSortIcon";

//
//
//

type SortDirection = "asc" | "desc" | null;

interface DashboardSortableHeaderCellProps {
	children?: ReactNode;
	width?: string;
	direction: SortDirection;
	onClick: () => void;
}

//
//
//

const DashboardSortableHeaderCell = ({
	children,
	width,
	direction,
	onClick,
}: DashboardSortableHeaderCellProps) => {
	return (
		<Table.HeaderCell width={width}>
			<button
				type="button"
				onClick={onClick}
				className="flex items-center gap-1"
			>
				<span>{children}</span>
				<DashboardSortIcon direction={direction} />
			</button>
		</Table.HeaderCell>
	);
};

export default DashboardSortableHeaderCell;
