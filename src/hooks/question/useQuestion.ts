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

interface UseQuestionProps {
	questionSetId: number;
	questionId: number;
}

interface UseQuestionReturn {
	question?:
		| MultipleQuestionApiResponse
		| ShortQuestionApiResponse
		| OrderingQuestionApiResponse
		| FillBlankQuestionApiResponse;
	isLoading: boolean;
	error: Error | null;
}

//
//
//

const useQuestion = ({
	questionSetId,
	questionId,
}: UseQuestionProps): UseQuestionReturn => {
	const { data, isPending, error } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			params: {
				path: {
					questionSetId,
					questionId,
				},
			},
		},
	);

	const question = data?.data;

	return {
		question,
		isLoading: isPending,
		error,
	};
};

export default useQuestion;
