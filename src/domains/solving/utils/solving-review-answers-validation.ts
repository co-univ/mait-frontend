import type { FillBlankSubmitAnswer, QuestionType } from "@/libs/types";
import type { AnswersType } from "../stores/review/useSolvingReviewAnswerResultStore";

/**
 * Validates user's answers based on question type
 * @param userAnswers - User's submitted answers
 * @param type - Type of question (MULTIPLE, SHORT, ORDERING, FILL_BLANK)
 * @returns Validation result with error message if invalid
 */
export const solvingReviewAnswersValidation = (
	userAnswers: AnswersType,
	type: QuestionType,
): {
	isValid: boolean;
	errorMessage?: string;
} => {
	switch (type) {
		case "MULTIPLE": {
			const answers = userAnswers as number[];

			if (answers.length === 0) {
				return {
					isValid: false,
					errorMessage: "답안을 선택해주세요.",
				};
			}

			return {
				isValid: true,
			};
		}
		case "SHORT": {
			const answers = userAnswers as string[];

			if (answers.some((answer) => answer.trim().length === 0)) {
				return {
					isValid: false,
					errorMessage: "답안을 입력해주세요.",
				};
			}

			return { isValid: true };
		}
		case "ORDERING": {
			return { isValid: true };
		}
		case "FILL_BLANK": {
			const answers = userAnswers as FillBlankSubmitAnswer[];

			if (answers.some((answer) => answer.answer.trim().length === 0)) {
				return {
					isValid: false,
					errorMessage: "답안을 입력해주세요.",
				};
			}

			return { isValid: true };
		}
	}
};
