import type { FillBlankSubmitAnswer, QuestionType } from "@/libs/types";
import type { StudyAnswersType } from "../stores/study/useSolvingStudyAnswerStore";

export const solvingIsStudyQuestionAnswered = (
	userAnswers: StudyAnswersType,
	type?: QuestionType,
) => {
	if (!type) {
		return false;
	}

	switch (type) {
		case "MULTIPLE":
			return (userAnswers as number[]).length > 0;
		case "SHORT":
			return (
				(userAnswers as string[]).length > 0 &&
				(userAnswers as string[]).every((answer) => answer.trim().length > 0)
			);
		case "FILL_BLANK":
			return (
				(userAnswers as FillBlankSubmitAnswer[]).length > 0 &&
				(userAnswers as FillBlankSubmitAnswer[]).every(
					(answer) => answer.answer.trim().length > 0,
				)
			);
		case "ORDERING":
			return (userAnswers as number[]).length > 0;
		default:
			return false;
	}
};
