import { create } from "zustand";
import type { QuestionResponseType } from "@/domains/creation/creation.constant";

//
//
//

interface CreationQuestionState {
	isEditing: boolean;
	questions?: QuestionResponseType;
}

interface CreationQuestionActions {
	initQuestion: (questions: QuestionResponseType) => void;
	editQuestion: (question: QuestionResponseType) => void;
}

//
//
//

const useCreationQuestionStore = create<
	CreationQuestionState & CreationQuestionActions
>((set) => ({
	isEditing: false,
	questions: undefined,

	initQuestion: (questions: QuestionResponseType) =>
		set(() => ({
			questions,
			isEditing: false,
		})),

	editQuestion: (questions: QuestionResponseType) =>
		set(() => ({
			questions,
			isEditing: true,
		})),
}));

export default useCreationQuestionStore;
