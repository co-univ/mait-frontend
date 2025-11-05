import type { QuestionResponseType } from "../../creation.constant";

/**
 *
 */
export const creationQuestionFindNumber = (
	questions: QuestionResponseType[],
	questionId: number,
) => {
	const questionIndex = questions.findIndex((q) => q.id === questionId);

	return questionIndex + 1;
};
