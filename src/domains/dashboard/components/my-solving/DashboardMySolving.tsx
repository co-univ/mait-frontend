import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import DashboardMySolvingCircleStatus from "./DashboardMySolvingCircleStatus";
import DashboardMySolvingDivider from "./DashboardMySolvingDivider";
import DashboardMySolvingHeader from "./DashboardMySolvingHeader";
import DashboardMySolvingRow from "./DashboardMySolvingRow";

//
//
//

const DashboardMySolving = () => {
	const { activeTeam } = useTeams();

	const { data } = apiHooks.useQuery(
		"get",
		"/api/v1/teams/{teamId}/user-solving-stats",
		{
			params: {
				path: {
					teamId: activeTeam?.teamId ?? 0,
				},
			},
		},
	);

	const solvingData = data?.data;

	return (
		<div className="flex w-full h-full flex-col gap-gap-9 rounded-radius-large2 border border-color-gray-20 bg-color-alpha-white100 p-padding-11 shadow-base">
			<DashboardMySolvingHeader />

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
			<DashboardMySolvingRow label="정답률 평균">
				<DashboardMySolvingCircleStatus
					percentage={solvingData?.accuracyRate ?? 0}
				/>
			</DashboardMySolvingRow>
		</div>
	);
};

export default DashboardMySolving;
