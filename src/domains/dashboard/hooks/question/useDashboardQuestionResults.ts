import { apiHooks } from "@/libs/api";
import type {
	QuestionSetSolveMode,
	QuestionSolveResultApiResponse,
} from "@/libs/types";

//
//
//

interface UseDashboardQuestionResultProps {
	questionSetId: number;
	questionId?: number;
}

interface UseDashboardQuestionResultReturn {
	solveResults?: QuestionSolveResultApiResponse[];
	targetSolveResult?: QuestionSolveResultApiResponse;
	solveMode?: QuestionSetSolveMode;
	totalCount?: number;
	correctCount?: number;
	score?: number;
	isLoading: boolean;
}

//
//
//

const useDashboardQuestionResults = ({
	questionSetId,
	questionId,
}: UseDashboardQuestionResultProps): UseDashboardQuestionResultReturn => {
	const { data: questionResultData, isLoading } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/user/result",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const { solveMode, totalCount, correctCount, score, results } =
		questionResultData?.data ?? {};
	const targetSolveResult = results?.find(
		(result) => result.questionId === questionId,
	);

	return {
		solveResults: results,
		targetSolveResult,
		solveMode,
		totalCount,
		correctCount,
		score,
		isLoading,
	};
};

export default useDashboardQuestionResults;
