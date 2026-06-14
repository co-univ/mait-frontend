import { useQueries } from "@tanstack/react-query";
import useTeams from "@/hooks/useTeams";
import {
	categoryCorrectRatesQueryOptions,
	questionSetsStatisticsQueryOptions,
	teamRankingQueryOptions,
	userSolvingStatsQueryOptions,
} from "../../queries/common/dashboardQueries";

//
//
//

const useDashboardLoading = () => {
	const { activeTeam, isLoading: isTeamsLoading } = useTeams();

	const teamId = activeTeam?.teamId ?? 0;

	const results = useQueries({
		queries: [
			{ ...teamRankingQueryOptions(teamId), enabled: !!activeTeam },
			{ ...userSolvingStatsQueryOptions(teamId), enabled: !!activeTeam },
			{ ...categoryCorrectRatesQueryOptions(teamId), enabled: !!activeTeam },
			{ ...questionSetsStatisticsQueryOptions(teamId), enabled: !!activeTeam },
		],
	});

	const isLoading =
		isTeamsLoading || results.some((result) => result.isLoading);

	return { isLoading };
};

export default useDashboardLoading;
