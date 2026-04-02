import { useMemo } from "react";
import ranking1 from "@/assets/images/ranking-1.png";
import ranking2 from "@/assets/images/ranking-2.png";
import ranking3 from "@/assets/images/ranking-3.png";
import { Table } from "@/components/table";
import type { RankDto, UserDto } from "@/libs/types";
import DashboardTeamRankingEmpty from "./DashboardTeamRankingEmpty";
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
	//
	const rankings: Array<
		Omit<RankDto, "user"> & {
			users: UserDto[];
		}
	> = useMemo(() => {
		const ret: Array<
			Omit<RankDto, "user"> & {
				users: UserDto[];
			}
		> = [];

		teamRankings?.forEach((ranking) => {
			if (ranking.user === undefined) {
				return;
			}

			if (ret[ranking.rank - 1] === undefined) {
				ret[ranking.rank - 1] = {
					rank: ranking.rank,
					count: ranking.count,
					users: [ranking.user],
				};
			} else {
				ret[ranking.rank - 1].users.push(ranking.user);
			}
		});

		return ret;
	}, [teamRankings]);

	return (
		<Table.Root className="h-full bg-color-alpha-white100">
			<Table.Header>
				<Table.HeaderCell width="12px" />
				<Table.HeaderCell width="24px" />
				<Table.HeaderCell width="112px">순위</Table.HeaderCell>
				<Table.HeaderCell grow>이름</Table.HeaderCell>
				<Table.HeaderCell width="144px">문제</Table.HeaderCell>
			</Table.Header>

			<Table.Divider />

			<Table.Body className="h-full">
				{rankings.length === 0 && userRank == null ? (
					<DashboardTeamRankingEmpty />
				) : null}

				{rankings.map((ranking) => (
					<>
						<DashboardTeamRankingTableRowCell
							key={ranking.rank}
							rank={ranking.rank}
							count={ranking.count}
							users={ranking?.users ?? []}
							rankIcon={
								<img
									src={RANKING_ICON[ranking.rank]}
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
						users={userRank.user ? [userRank.user] : []}
						rank={`${userRank.rank}등 [내 등수]`}
						count={userRank.count}
						rankIcon={
							<div className="size-[12px] bg-color-point-50 rounded-radius-max" />
						}
					/>
				)}
			</Table.Body>
		</Table.Root>
	);
};

export default DashboardTeamRankingTable;
