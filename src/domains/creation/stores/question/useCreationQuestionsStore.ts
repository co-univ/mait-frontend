import { create } from "zustand";
import type {
	QuestionResponseType,
	QuestionResponseTypeWithIsEditing,
} from "@/domains/creation/creation.constant";

//
//
//

interface CreationQuestionState {
	questions: QuestionResponseTypeWithIsEditing[];
}

interface CreationQuestionActions {
	initQuestions: (questions: QuestionResponseType[]) => void;
	editQuestion: (question: QuestionResponseType) => void;
}

//
//
//

const useCreationQuestionsStore = create<
	CreationQuestionState & CreationQuestionActions
>((set) => ({
	questions: [],

	initQuestions: (questions) =>
		set({
			questions: questions.map((question) => ({
				...question,
				isEditing: false,
			})),
		}),
	editQuestion: (question) =>
		set((state) => ({
			questions: state.questions.map((q) =>
				q.id === question.id ? { ...question, isEditing: true } : q,
			),
		})),
}));

export default useCreationQuestionsStore;
