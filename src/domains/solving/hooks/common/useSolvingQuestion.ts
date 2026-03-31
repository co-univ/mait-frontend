import { apiHooks } from "@/libs/api";
import type { QuestionApiResponse, QuestionType } from "@/libs/types";

//
//
//

type QuestionMode = "LIVE_TIME" | "REVIEW";

interface UseQuestionProps {
	questionSetId: number;
	questionId: number;
	mode: QuestionMode;
}

interface UseQuestionReturn {
	question: QuestionApiResponse | undefined;
	content: string | undefined;
	number: number | undefined;
	imageUrl: string | undefined;
	type: QuestionType | undefined;
	isLoading: boolean;
}

//
//
//

const useSolvingQuestion = ({
	questionSetId,
	questionId,
	mode,
}: UseQuestionProps): UseQuestionReturn => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			params: {
				path: {
					questionSetId,
					questionId,
				},
				query: {
					mode,
				},
			},
		},
	);

	const question = data?.data as QuestionApiResponse | undefined;

	return {
		question,
		content: question?.content,
		number: question?.number,
		imageUrl: question?.imageUrl,
		type: question?.type as QuestionType | undefined,
		isLoading: isPending,
	};
};

export default useSolvingQuestion;
