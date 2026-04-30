import type { FillBlankSubmitAnswer } from "@/libs/types";
import type { StudyAnswersType } from "../stores/study/useSolvingStudyAnswerStore";

type DraftSubmitAnswerDto = {
	type?: string;
	submitAnswers?: unknown | { type?: string; submitAnswers?: unknown };
};

/**
 * Parse study draft response into local answer store format.
 */
export const solvingParseStudyDraftData = (
	submittedAnswer: unknown,
): StudyAnswersType => {
	const draft =
		typeof submittedAnswer === "string"
			? (() => {
					try {
						return JSON.parse(submittedAnswer) as DraftSubmitAnswerDto;
					} catch {
						return undefined;
					}
				})()
			: (submittedAnswer as DraftSubmitAnswerDto | undefined);

	if (!draft?.type) {
		return [];
	}

	const resolveSubmitAnswers = (raw: unknown): unknown => {
		if (Array.isArray(raw)) return raw;
		if (raw !== null && typeof raw === "object" && "submitAnswers" in raw) {
			return (raw as { submitAnswers?: unknown }).submitAnswers;
		}
		return raw;
	};

	switch (draft.type) {
		case "SHORT":
		case "ShortQuestionSubmitApiRequest":
		case "ShortQuestionSubmitAnswer": {
			const answers = resolveSubmitAnswers(draft.submitAnswers);
			return Array.isArray(answers) ? (answers as string[]) : [];
		}

		case "MULTIPLE":
		case "MultipleQuestionSubmitApiRequest":
		case "MultipleQuestionSubmitAnswer": {
			const answers = resolveSubmitAnswers(draft.submitAnswers);
			return Array.isArray(answers) ? (answers as number[]) : [];
		}

		case "ORDERING":
		case "OrderingQuestionSubmitApiRequest":
		case "OrderingQuestionSubmitAnswer": {
			const answers = resolveSubmitAnswers(draft.submitAnswers);
			return Array.isArray(answers) ? (answers as number[]) : [];
		}

		case "FILL_BLANK":
		case "FillBlankQuestionSubmitApiRequest":
		case "FillBlankQuestionSubmitAnswer": {
			const answers = resolveSubmitAnswers(draft.submitAnswers);
			return Array.isArray(answers) ? (answers as FillBlankSubmitAnswer[]) : [];
		}

		default:
			return [];
	}
};
