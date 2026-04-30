import { create } from "zustand";
import type {
	FillBlankSubmitAnswer,
	QuestionAnswerSubmitApiResponse,
	QuestionType,
} from "@/libs/types";

//
//
//

export type StudyAnswersType = number[] | string[] | FillBlankSubmitAnswer[];

interface SolvingStudyAnswerState {
	isGraded: boolean;
	result: Record<
		number,
		{
			type: QuestionType;
			userAnswers: StudyAnswersType;
			isCorrect: boolean | null;
			submittedAnswer?: string;
		}
	>;
	interactedOrderingQuestionIds: Set<number>;
}

interface SolvingStudyAnswerActions {
	getUserAnswers: (questionId: number) => StudyAnswersType;
	getIsCorrect: (questionId: number) => boolean | null;
	setAnswerInitInfo: (questionId: number, type: QuestionType) => void;
	setUserAnswers: (questionId: number, answers: StudyAnswersType) => void;
	replaceUserAnswers: (questionId: number, answers: StudyAnswersType) => void;
	markOrderingInteracted: (questionId: number) => void;
	setGradeResults: (results: QuestionAnswerSubmitApiResponse[]) => void;
	reset: () => void;
}

//
//
//

const useSolvingStudyAnswerStore = create<
	SolvingStudyAnswerState & SolvingStudyAnswerActions
>((set, get) => ({
	isGraded: false,
	result: {},
	interactedOrderingQuestionIds: new Set<number>(),

	getUserAnswers: (questionId: number) => {
		return get().result[questionId]?.userAnswers ?? [];
	},

	getIsCorrect: (questionId: number) => {
		return get().result[questionId]?.isCorrect ?? null;
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
					userAnswers: state.result[questionId]?.userAnswers ?? [],
					isCorrect: state.result[questionId]?.isCorrect ?? null,
					submittedAnswer: state.result[questionId]?.submittedAnswer,
				},
			},
		}));
	},

	setUserAnswers: (questionId: number, answers: StudyAnswersType) => {
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

	replaceUserAnswers: (questionId: number, answers: StudyAnswersType) => {
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

	markOrderingInteracted: (questionId: number) => {
		set((state) => ({
			interactedOrderingQuestionIds: new Set([
				...state.interactedOrderingQuestionIds,
				questionId,
			]),
		}));
	},

	setGradeResults: (results: QuestionAnswerSubmitApiResponse[]) => {
		set((state) => ({
			isGraded: true,
			result: results.reduce<SolvingStudyAnswerState["result"]>((acc, result) => {
				acc[result.questionId] = {
					type: state.result[result.questionId]?.type ?? "SHORT",
					userAnswers: state.result[result.questionId]?.userAnswers ?? [],
					isCorrect: result.isCorrect,
					submittedAnswer: result.submittedAnswer,
				};
				return acc;
			}, { ...state.result }),
		}));
	},

	reset: () =>
		set(() => ({
			isGraded: false,
			result: {},
			interactedOrderingQuestionIds: new Set<number>(),
		})),
}));

export default useSolvingStudyAnswerStore;
