import { create } from "zustand";
import type {
	FillBlankSubmitAnswer,
	QuestionType,
} from "@/libs/types";

//
//
//

export type AnswersType = number[] | string[] | FillBlankSubmitAnswer[];

interface SolvingLiveAnswerState {
	userAnswers: AnswersType;
	questionType: QuestionType | null;
	isSubmitted: boolean;
	isCorrect: boolean | null;
}

interface SolvingLiveAnswerActions {
	getUserAnswers: () => AnswersType;
	getQuestionType: () => QuestionType | null;
	getIsSubmitted: () => boolean;
	getIsCorrect: () => boolean | null;

	setUserAnswers: (answers: AnswersType) => void;
	setQuestionType: (type: QuestionType) => void;
	setSubmitResult: (isCorrect: boolean) => void;
	reset: () => void;
}

//
//
//

const initialState: SolvingLiveAnswerState = {
	userAnswers: [],
	questionType: null,
	isSubmitted: false,
	isCorrect: null,
};

const useSolvingLiveAnswerStore = create<
	SolvingLiveAnswerState & SolvingLiveAnswerActions
>((set, get) => ({
	...initialState,

	getUserAnswers: () => get().userAnswers,

	getQuestionType: () => get().questionType,

	getIsSubmitted: () => get().isSubmitted,

	getIsCorrect: () => get().isCorrect,

	setUserAnswers: (answers: AnswersType) => {
		set({ userAnswers: answers });
	},

	setQuestionType: (type: QuestionType) => {
		set({ questionType: type });
	},

	setSubmitResult: (isCorrect: boolean) => {
		set({
			isSubmitted: true,
			isCorrect,
		});
	},

	reset: () => {
		set(initialState);
	},
}));

export default useSolvingLiveAnswerStore;
