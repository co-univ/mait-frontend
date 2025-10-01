import { apiHooks } from "@/libs/api";
import type {
	FillBlankQuestionApiResponse,
	MultipleQuestionApiResponse,
	OrderingQuestionApiResponse,
	ShortQuestionApiResponse,
} from "@/libs/types";

//
//
//

interface UseQuestionsProps {
	questionSetId: number;
}

interface UseQuestionsReturn {
	questions: (
		| MultipleQuestionApiResponse
		| ShortQuestionApiResponse
		| OrderingQuestionApiResponse
		| FillBlankQuestionApiResponse
	)[];
	isLoading: boolean;
	error: Error | null;
}

//
//
//

const useQuestions = ({
	questionSetId,
}: UseQuestionsProps): UseQuestionsReturn => {
	const { data, isPending, error } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const questions = data?.data || [];

	return {
		questions,
		isLoading: isPending,
		error,
	};
};

export default useQuestions;
