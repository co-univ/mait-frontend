import { apiHooks } from "@/libs/api";
import type { QuestionType } from "@/libs/types";
import useSolvingReviewQuestions from "./useSolvingReviewQuestions";

//
//
//

interface UseSolvingReviewQuestionProps {
	questionSetId: number;
	questionId: number;
}

interface UseSolvingReviewQuestionReturn {
	content?: string;
	number?: number;
	imageUrl?: string;
	type?: QuestionType;
	isLoading: boolean;
}

//
//
//

const useSolvingReviewQuestion = ({
	questionSetId,
	questionId,
}: UseSolvingReviewQuestionProps): UseSolvingReviewQuestionReturn => {
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
					mode: "REVIEW",
				},
			},
		},
	);

	const question = data?.data;

	return {
		content: question?.content,
		number: question?.number,
		imageUrl: question?.imageUrl,
		type: question?.type as QuestionType,
		isLoading: isPending,
	};
};

export default useSolvingReviewQuestion;
