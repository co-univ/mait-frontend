import { apiHooks } from "@/libs/api";
import type { QuestionSetGroup, QuestionSetList } from "@/libs/types";

//
//
//

interface UseQuestionSetsProps {
	teamId: number;
	mode: string;
}

interface UseQuestionSetsReturn {
	questionSetList?: QuestionSetList["questionSets"];
	questionSetGroup?: QuestionSetGroup["questionSets"];
	isLoading: boolean;
	error: Error | null;
}

enum MODE_MAP {
	making = "MAKING",
	review = "REVIEW",
	"live-time" = "LIVE_TIME",
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
					teamId: teamId,
					mode: MODE_MAP[mode as keyof typeof MODE_MAP],
				},
			},
		},
	);

	const questionSets = data?.data?.content?.questionSets;

	const questionSetList = Array.isArray(questionSets)
		? questionSets
		: undefined;
	const questionSetGroup = !Array.isArray(questionSets)
		? questionSets
		: undefined;

	return {
		questionSetList,
		questionSetGroup,
		isLoading: isPending,
		error,
	};
};

export default useQuestionSets;
