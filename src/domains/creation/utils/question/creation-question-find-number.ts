import type { QuestionResponseType } from "@/app.constants";

/**
 *
 */
export const creationQuestionFindNumber = (
	questions: QuestionResponseType[] = [],
	questionId: number = 0,
): number => {
	const questionIndex = questions.findIndex((q) => q.id === questionId);

	return questionIndex + 1;
};
