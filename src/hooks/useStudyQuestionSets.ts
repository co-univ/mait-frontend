import { useQueryClient } from "@tanstack/react-query";
import { apiHooks } from "@/libs/api";
import type { QuestionSetGroup } from "@/libs/types";

//
//
//

interface UseStudyQuestionSetsProps {
	teamId: number;
	target: "management" | "progress";
}

interface UseStudyQuestionSetsReturn {
	questionSetGroup?: QuestionSetGroup["questionSets"];
	invalidateQuestionSetsQuery: () => void;
	isLoading: boolean;
	error: Error | null;
}

//
//
//

const useStudyQuestionSets = ({
	teamId,
	target,
}: UseStudyQuestionSetsProps): UseStudyQuestionSetsReturn => {
	const { data: managementData, isPending: isManagementPending, error: managementError } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/study/management",
		{
			params: {
				query: { teamId },
			},
		},
		{
			staleTime: 0,
			refetchOnMount: true,
			enabled: teamId > 0 && target === "management",
		},
	);

	const { data: progressData, isPending: isProgressPending, error: progressError } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/study/progress",
		{
			params: {
				query: { teamId },
			},
		},
		{
			staleTime: 0,
			refetchOnMount: true,
			enabled: teamId > 0 && target === "progress",
		},
	);

	const data = target === "management" ? managementData : progressData;
	const questionSets = data?.data?.questionSets;
	const questionSetGroup = !Array.isArray(questionSets) ? questionSets : undefined;

	const queryClient = useQueryClient();

	/**
	 *
	 */
	const invalidateQuestionSetsQuery = () => {
		if (target === "management") {
			queryClient.invalidateQueries({
				queryKey: apiHooks.queryOptions(
					"get",
					"/api/v1/question-sets/study/management",
					{
						params: { query: { teamId } },
					},
				).queryKey,
			});
		} else {
			queryClient.invalidateQueries({
				queryKey: apiHooks.queryOptions(
					"get",
					"/api/v1/question-sets/study/progress",
					{
						params: { query: { teamId } },
					},
				).queryKey,
			});
		}
	};

	return {
		questionSetGroup,
		invalidateQuestionSetsQuery,
		isLoading: target === "management" ? isManagementPending : isProgressPending,
		error: target === "management" ? managementError : progressError,
	};
};

export default useStudyQuestionSets;
