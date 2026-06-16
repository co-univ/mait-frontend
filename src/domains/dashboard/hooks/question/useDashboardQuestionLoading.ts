import { useQueries } from "@tanstack/react-query";
import useTeams from "@/hooks/useTeams";
import { teamRankingQueryOptions } from "../../queries/common/dashboardQueries";
import {
	questionSetResultQueryOptions,
	questionsQueryOptions,
	questionWrongRatesQueryOptions,
} from "../../queries/question/dashboardQuestionQueries";

//
//
//

interface UseDashboardQuestionLoadingProps {
	questionSetId: number;
}

//
//
//

const useDashboardQuestionLoading = ({
	questionSetId,
}: UseDashboardQuestionLoadingProps) => {
	const { activeTeam, isLoading: isTeamsLoading } = useTeams();

	const teamId = activeTeam?.teamId ?? 0;

	const results = useQueries({
		queries: [
			{ ...questionsQueryOptions(questionSetId) },
			{ ...questionSetResultQueryOptions(questionSetId) },
			{ ...teamRankingQueryOptions(teamId), enabled: !!activeTeam },
			{ ...questionWrongRatesQueryOptions(questionSetId) },
		],
	});

	const isLoading =
		isTeamsLoading || results.some((result) => result.isLoading);

	return { isLoading };
};

export default useDashboardQuestionLoading;
