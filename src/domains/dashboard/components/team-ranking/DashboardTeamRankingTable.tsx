import ranking1 from "@/assets/images/ranking-1.png";
import ranking2 from "@/assets/images/ranking-2.png";
import ranking3 from "@/assets/images/ranking-3.png";
import { Table } from "@/components/table";
import type { RankDto } from "@/libs/types";
import DashboardTeamRankingTableRowCell from "./DashboardTeamRankingTableRowCell";

//
//
//

const RANKING_ICON: Record<number, string> = {
	1: ranking1,
	2: ranking2,
	3: ranking3,
};

interface DashboardTeamRankingTableProps {
	teamRankings?: RankDto[];
	userRank?: RankDto;
}

//
//
//

const DashboardTeamRankingTable = ({
	teamRankings,
	userRank,
}: DashboardTeamRankingTableProps) => {
	console.log("teamRankings in table", teamRankings);
	return (
		<Table.Root className="bg-color-alpha-white100">
			<Table.Header>
				<Table.HeaderCell width="12px" />
				<Table.HeaderCell width="24px" />
				<Table.HeaderCell width="112px">순위</Table.HeaderCell>
				<Table.HeaderCell grow>이름</Table.HeaderCell>
				<Table.HeaderCell width="144px">문제</Table.HeaderCell>
			</Table.Header>

			<Table.Divider />

			<Table.Body>
				{teamRankings?.map((rank) => (
					<>
						<DashboardTeamRankingTableRowCell
							key={rank.user?.id}
							rank={rank}
							rankIcon={
								<img
									src={RANKING_ICON[rank.rank]}
									alt="ranking"
									className="w-full h-full"
								/>
							}
						/>

						<Table.Divider />
					</>
				))}

				{userRank && (
					<DashboardTeamRankingTableRowCell
						rank={userRank}
						rankIcon={
							<div className="size-[12px] bg-color-point-50 rounded-radius-max" />
						}
						rankLabel="내 등수"
					/>
				)}
			</Table.Body>
		</Table.Root>
	);
};

export default DashboardTeamRankingTable;
