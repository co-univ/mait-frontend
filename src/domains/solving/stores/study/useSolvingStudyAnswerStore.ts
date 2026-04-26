import { create } from "zustand";
import type { FillBlankSubmitAnswer, QuestionType } from "@/libs/types";

//
//
//

export type StudyAnswersType = number[] | string[] | FillBlankSubmitAnswer[];

interface SolvingStudyAnswerState {
	result: Record<
		number,
		{
			type: QuestionType;
			userAnswers: StudyAnswersType;
		}
	>;
}

interface SolvingStudyAnswerActions {
	getUserAnswers: (questionId: number) => StudyAnswersType;
	setAnswerInitInfo: (questionId: number, type: QuestionType) => void;
	setUserAnswers: (questionId: number, answers: StudyAnswersType) => void;
	reset: () => void;
}

//
//
//

const useSolvingStudyAnswerStore = create<
	SolvingStudyAnswerState & SolvingStudyAnswerActions
>((set, get) => ({
	result: {},

	getUserAnswers: (questionId: number) => {
		return get().result[questionId]?.userAnswers ?? [];
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

	reset: () =>
		set(() => ({
			result: {},
		})),
}));

export default useSolvingStudyAnswerStore;
