import { create } from "zustand";
import type {
	QuestionResponseType,
	QuestionResponseTypeWithIsEditing,
} from "@/domains/creation/creation.constant";
import type { QuestionValidationApiResponse } from "@/libs/types";

//
//
//

interface CreationQuestionState {
	questions: QuestionResponseTypeWithIsEditing[];
	invalidQuestions?: QuestionValidationApiResponse[];
}

interface CreationQuestionActions {
	initQuestions: (questions: QuestionResponseType[]) => void;
	editQuestion: (question: QuestionResponseType) => void;
	setInvalidQuestions: (
		invalidQuestions: QuestionValidationApiResponse[],
	) => void;
}

//
//
//

const useCreationQuestionsStore = create<
	CreationQuestionState & CreationQuestionActions
>((set) => ({
	questions: [],
	invalidQuestions: undefined,

	initQuestions: (questions) =>
		set({
			questions: questions.map((question) => ({
				...question,
				isEditing: false,
			})),
		}),

	editQuestion: (question) => {
		set((state) => ({
			questions: state.questions.map((q) =>
				q.id === question.id ? { ...question, isEditing: true } : q,
			),
		}));

		set((state) => ({
			invalidQuestions: state.invalidQuestions?.filter(
				(invalidQuestion) => invalidQuestion.questionId !== question.id,
			),
		}));
	},

	setInvalidQuestions: (invalidQuestions) =>
		set({
			invalidQuestions,
		}),
}));

export default useCreationQuestionsStore;
