import { apiHooks } from "@/libs/api";
import type { QuestionSetApiResponse } from "@/libs/types";

//
//
//

interface UseQuestionSetsProps {
  teamId: number;
  mode: string;
}

interface UseQuestionSetsReturn {
  questionSets: QuestionSetApiResponse[];
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

const useQuestionSets = ({ teamId, mode }: UseQuestionSetsProps): UseQuestionSetsReturn => {
	const { data, isPending, error } = apiHooks.useQuery("get", "/api/v1/question-sets", {
		params: {
			query: {
				teamId: teamId,
				mode: MODE_MAP[mode as keyof typeof MODE_MAP],
			},
		},
	});

	const questionSets = data?.data || [];

	return {
		questionSets,
		isLoading: isPending,
    error,
	};
};

export default useQuestionSets;