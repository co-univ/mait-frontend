import clsx from "clsx";
import { Table } from "@/components/table";
import useUser from "@/hooks/useUser";
import type { UserDto } from "@/libs/types";

//
//
//

interface DashboardTeamRankingTableRowCellProps {
	rank: number | string;
	count: number;
	users: UserDto[];
	rankIcon: React.ReactNode;
}

//
//
//

const DashboardTeamRankingTableRowCell = ({
	rank,
	count,
	users,
	rankIcon,
}: DashboardTeamRankingTableRowCellProps) => {
	const { user } = useUser();

	return (
		<Table.Row className="h-full ">
			<Table.Cell width="12px" />
			<Table.Cell
				width="24px"
				className="!p-0 flex items-center justify-center"
			>
				{rankIcon}
			</Table.Cell>
			<Table.Cell width="112px">
				{typeof rank === "number" ? `${rank}등` : rank}
			</Table.Cell>
			<Table.Cell grow>
				{users.map((rankUser, index) => (
					<span
						key={rankUser.id}
						className={clsx({
							"font-bold text-primary-50": rankUser.id === user?.id,
						})}
					>
						{rankUser.name}({rankUser.nickname})
						{index < users.length - 1 ? ", " : ""}
					</span>
				))}
			</Table.Cell>
			<Table.Cell width="144px">{count}문제</Table.Cell>
		</Table.Row>
	);
};

export default DashboardTeamRankingTableRowCell;
