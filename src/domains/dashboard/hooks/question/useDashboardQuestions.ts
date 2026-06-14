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

interface UseDashboardQuestionsReturn<
	T extends QuestionResponseType = QuestionResponseType,
> {
	questions?: QuestionResponseType[];
	firstQuestion?: QuestionResponseType;
	targetQuestion?: T;
	isLoading: boolean;
}

//
//
//

const useDashboardQuestions = <
	T extends QuestionResponseType = QuestionResponseType,
>({
	questionSetId,
	questionId,
}: UseDashboardQuestionsProps): UseDashboardQuestionsReturn<T> => {
	const { data: questionsData, isLoading } = apiHooks.useQuery(
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

	const questions = questionsData?.data;
	const firstQuestion = questions?.[0];
	const targetQuestion = useMemo(
		() =>
			questions?.find((question) => question.id === questionId) as
				| T
				| undefined,
		[questions, questionId],
	);

	return { questions, firstQuestion, targetQuestion, isLoading };
};

export default useDashboardQuestions;
