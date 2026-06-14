import { useQuery } from "@tanstack/react-query";
import { ChartColumnIncreasing } from "lucide-react";
import useTeams from "@/hooks/useTeams";
import { userSolvingStatsQueryOptions } from "../../queries/common/dashboardQueries";
import DashboardHeader from "../common/DashboardHeader";
import DashboardMySolvingCircleStatus from "./DashboardMySolvingCircleStatus";
import DashboardMySolvingDivider from "./DashboardMySolvingDivider";
import DashboardMySolvingRow from "./DashboardMySolvingRow";

//
//
//

const DashboardMySolving = () => {
	const { activeTeam } = useTeams();

	const { data } = useQuery(userSolvingStatsQueryOptions(activeTeam?.teamId ?? 0));

	const solvingData = data?.data;

	return (
		<div className="flex w-full h-full flex-col gap-gap-9 rounded-radius-large2 border border-color-gray-20 bg-color-alpha-white100 p-padding-11 shadow-base">
			<DashboardHeader icon={<ChartColumnIncreasing />} title="내 풀이 정보" />

			<DashboardMySolvingDivider />
			<DashboardMySolvingRow label="총 풀이 문제 수">
				<div className="typo-heading-large text-color-secondary-50">
					{solvingData?.totalSolvedCount}개
				</div>
			</DashboardMySolvingRow>

			<DashboardMySolvingDivider />
			<DashboardMySolvingRow label="맞힌 문제 수">
				<div className="typo-heading-large text-color-primary-50">
					{solvingData?.correctCount}개
				</div>
			</DashboardMySolvingRow>

			<DashboardMySolvingDivider />
			<DashboardMySolvingRow label="평균 정답률">
				<DashboardMySolvingCircleStatus
					percentage={solvingData?.accuracyRate ?? 0}
				/>
			</DashboardMySolvingRow>
		</div>
	);
};

export default DashboardMySolving;
