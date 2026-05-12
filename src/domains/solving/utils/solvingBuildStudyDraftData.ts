import type { FillBlankSubmitAnswer, QuestionType } from "@/libs/types";
import type { StudyAnswersType } from "../stores/study/useSolvingStudyAnswerStore";

/**
 * Build request body for study draft save API.
 */
export const solvingBuildStudyDraftData = (
	userAnswers: StudyAnswersType,
	questionType: QuestionType,
) => {
	switch (questionType) {
		case "SHORT":
			return {
				type: "SHORT" as const,
				submitAnswers: (userAnswers as string[]).filter(
					(answer) => answer.trim() !== "",
				),
			};

		case "MULTIPLE":
			return {
				type: "MULTIPLE" as const,
				submitAnswers: userAnswers as number[],
			};

		case "FILL_BLANK":
			return {
				type: "FILL_BLANK" as const,
				submitAnswers: userAnswers as FillBlankSubmitAnswer[],
			};

		case "ORDERING":
			return {
				type: "ORDERING" as const,
				submitAnswers: userAnswers as number[],
			};

		default:
			throw new Error("지원하지 않는 문제 타입입니다.");
	}
};

/**
 * Check whether the current study answers contain any meaningful input.
 */
export const hasStudyAnswers = (
	userAnswers: StudyAnswersType,
	questionType: QuestionType,
) => {
	switch (questionType) {
		case "SHORT":
			return (userAnswers as string[]).some((answer) => answer.trim() !== "");
		case "MULTIPLE":
			return (userAnswers as number[]).length > 0;
		case "FILL_BLANK":
			return (userAnswers as FillBlankSubmitAnswer[]).some(
				(answer) => answer.answer.trim() !== "",
			);
		case "ORDERING":
			return (userAnswers as number[]).length > 0;
		default:
			return false;
	}
};
