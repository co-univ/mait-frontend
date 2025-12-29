import type { QuestionResponseType } from "@/app.constants";
import { apiHooks } from "@/libs/api";

//
//
//

interface UseSolvingReviewQuestionsProps {
	questionSetId: number;
}

interface UseSolvingReviewQuestionsRetrurn {
	questions: QuestionResponseType[];
	isLoading: boolean;
}

//
//
//

const useSolvingReviewQuestions = ({
	questionSetId,
}: UseSolvingReviewQuestionsProps): UseSolvingReviewQuestionsRetrurn => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions",
		{
			params: {
				query: {
					mode: "REVIEW",
				},
				path: {
					questionSetId,
				},
			},
		},
	);

	const questions = data?.data ?? [];

	return {
		questions,
		isLoading: isPending,
	};
};

export default useSolvingReviewQuestions;
