import { useQueryClient } from "@tanstack/react-query";
import { apiHooks } from "@/libs/api";
import type {
	DeliveryMode,
	QuestionSetGroup,
	QuestionSetList,
} from "@/libs/types";

//
//
//

interface UseQuestionSetsProps {
	teamId: number;
	mode: DeliveryMode;
}

interface UseQuestionSetsReturn {
	questionSetList?: QuestionSetList["questionSets"];
	questionSetGroup?: QuestionSetGroup["questionSets"];
	invalidateQuestionSetsQuery: (params?: {
		teamId?: number;
		mode?: DeliveryMode;
	}) => void;
	isLoading: boolean;
	error: Error | null;
}

//
//
//

const useQuestionSets = ({
	teamId,
	mode,
}: UseQuestionSetsProps): UseQuestionSetsReturn => {
	const { data, isPending, error } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets",
		{
			params: {
				query: {
					teamId,
					mode,
				},
			},
		},
	);

	const queryClient = useQueryClient();

	const questionSets = data?.data?.content?.questionSets;

	const questionSetList = Array.isArray(questionSets)
		? questionSets
		: undefined;
	const questionSetGroup = !Array.isArray(questionSets)
		? questionSets
		: undefined;

	/**
	 *
	 */
	const invalidateQuestionSetsQuery = (
		params: { teamId?: number; mode?: DeliveryMode } = {},
	) => {
		const { teamId: _teamId = teamId, mode: _mode = mode } = params;

		queryClient.invalidateQueries({
			queryKey: apiHooks.queryOptions("get", "/api/v1/question-sets", {
				params: {
					query: {
						teamId: _teamId,
						mode: _mode,
					},
				},
			}).queryKey,
		});
	};

	return {
		questionSetList,
		questionSetGroup,
		invalidateQuestionSetsQuery,
		isLoading: isPending,
		error,
	};
};

export default useQuestionSets;
