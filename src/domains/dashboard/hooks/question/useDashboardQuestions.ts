import { useMemo } from "react";
import type { QuestionResponseType } from "@/app.constants";
import { apiHooks } from "@/libs/api";

//
//
//

interface UseDashboardQuestionsProps {
	questionSetId: number;
	questionId?: number;
}

interface UseDashboardQuestionsReturn {
	questions?: QuestionResponseType[];
	firstQuestion?: QuestionResponseType;
	targetQuestion?: QuestionResponseType;
	isLoading: boolean;
}

//
//
//

const useDashboardQuestions = ({
	questionSetId,
	questionId,
}: UseDashboardQuestionsProps): UseDashboardQuestionsReturn => {
	const { data, isLoading } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions",
		{
			params: {
				path: {
					questionSetId,
				},
				query: {
					mode: "REVIEW",
				},
			},
		},
	);

	const questions = data?.data;
	const firstQuestion = questions?.[0];
	const targetQuestion = useMemo(
		() => questions?.find((question) => question.id === questionId),
		[questions, questionId],
	);

	return { questions, firstQuestion, targetQuestion, isLoading };
};

export default useDashboardQuestions;
