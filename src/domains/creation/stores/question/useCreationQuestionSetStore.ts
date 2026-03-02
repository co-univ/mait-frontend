import { create } from "zustand";
import type { QuestionSetApiResponse } from "@/libs/types";

//
//
//

interface UseCreationQuestionSetStoreState {
	questionSet?: QuestionSetApiResponse;
}

interface UseCreationQuestionSetStoreActions {
	setQuestionSet: (questionSet?: QuestionSetApiResponse) => void;
}

//
//
//

const useCreationQuestionSetStore = create<
	UseCreationQuestionSetStoreState & UseCreationQuestionSetStoreActions
>((set) => ({
	questionSet: undefined,

	setQuestionSet: (questionSet) => set({ questionSet }),
}));

export default useCreationQuestionSetStore;
