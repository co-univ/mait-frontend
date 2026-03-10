import { Table } from "@/components/table";
import type { RankDto } from "@/libs/types";

//
//
//

interface DashboardTeamRankingTableRowCellProps {
	rank: RankDto;
	rankIcon: React.ReactNode;
	rankLabel?: string;
}

//
//
//

const DashboardTeamRankingTableRowCell = ({
	rank,
	rankIcon,
	rankLabel,
}: DashboardTeamRankingTableRowCellProps) => (
	<Table.Row>
		<Table.Cell width="12px" />
		<Table.Cell width="24px" className="!p-0 flex items-center justify-center">
			{rankIcon}
		</Table.Cell>
		<Table.Cell width="112px">
			{rank.rank}등{rankLabel ? ` [${rankLabel}]` : ""}
		</Table.Cell>
		<Table.Cell grow>
			{rank.user?.name}({rank.user?.nickname})
		</Table.Cell>
		<Table.Cell width="144px">{rank.count}문제</Table.Cell>
	</Table.Row>
);

export default DashboardTeamRankingTableRowCell;
