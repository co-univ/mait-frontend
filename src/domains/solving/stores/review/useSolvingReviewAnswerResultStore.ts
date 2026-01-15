import { create } from "zustand";
import type {
	FillBlankSubmitAnswer,
	GradedAnswerFillBlankResult,
	GradedAnswerMultipleResult,
	GradedAnswerShortResult,
	QuestionType,
} from "@/libs/types";

//
//
//

export type AnswersType = number[] | string[] | FillBlankSubmitAnswer[];
export type GradedResultType =
	| GradedAnswerMultipleResult[]
	| GradedAnswerShortResult[]
	| GradedAnswerFillBlankResult[];

interface SolvingReviewAnswerResultState {
	result: Record<
		number,
		{
			isSubmitted: boolean;
			isCorrect: boolean | null;
			isExplanationShown: boolean;
			type: QuestionType;
			userAnswers: AnswersType;
			gradedResults: GradedResultType | null;
		}
	>;
}

interface SolvingReviewAnswerResultActions {
	getUserAnswers: (questionId: number) => AnswersType;
	getIsSubmitted: (questionId: number) => boolean;
	getIsCorrect: (questionId: number) => boolean | null;
	getIsExplanationShown: (questionId: number) => boolean;
	getIsGradedResults: (questionId: number) => GradedResultType | null;

	setAnswerInitInfo: (questionId: number, type: QuestionType) => void;
	setUserAnswers: (questionId: number, answers: AnswersType) => void;
	setAnswerSubmitted: (
		questionId: number,
		isCorrect: boolean,
		gradedResults: GradedResultType,
	) => void;
	setIsExplanationShown: (questionId: number, isShown: boolean) => void;
	reset: () => void;
}

//
//
//

const useSolvingReviewAnswerResultStore = create<
	SolvingReviewAnswerResultState & SolvingReviewAnswerResultActions
>((set, get) => ({
	result: {},

	getUserAnswers: (questionId: number) => {
		return get().result[questionId]?.userAnswers ?? [];
	},

	getIsSubmitted: (questionId: number) => {
		return get().result[questionId]?.isSubmitted ?? false;
	},

	getIsCorrect: (questionId: number) => {
		return get().result[questionId]?.isCorrect ?? null;
	},

	getIsExplanationShown: (questionId: number) => {
		return get().result[questionId]?.isExplanationShown ?? false;
	},

	getIsGradedResults: (questionId: number) => {
		return get().result[questionId]?.gradedResults ?? null;
	},

	setAnswerInitInfo: (questionId: number, type: QuestionType) => {
		if (get().result[questionId]?.type) {
			return;
		}

		set((state) => ({
			result: {
				...state.result,
				[questionId]: {
					type,
					isSubmitted: false,
					isCorrect: null,
					isExplanationShown: false,
					userAnswers: state.result[questionId]?.userAnswers ?? [],
					gradedResults: null,
				},
			},
		}));
	},

	setUserAnswers: (questionId: number, answers: AnswersType) => {
		set((state) => ({
			result: {
				...state.result,
				[questionId]: {
					...state.result[questionId],
					userAnswers: answers,
				},
			},
		}));
	},

	setAnswerSubmitted: (
		questionId: number,
		isCorrect: boolean,
		gradedResults: GradedResultType,
	) => {
		set((state) => ({
			result: {
				...state.result,
				[questionId]: {
					...state.result[questionId],
					isSubmitted: true,
					isCorrect,
					gradedResults,
				},
			},
		}));
	},

	setIsExplanationShown: (questionId: number, isShown: boolean) => {
		set((state) => ({
			result: {
				...state.result,
				[questionId]: {
					...state.result[questionId],
					isExplanationShown: isShown,
				},
			},
		}));
	},

	reset: () =>
		set(() => ({
			result: {},
		})),
}));

export default useSolvingReviewAnswerResultStore;
