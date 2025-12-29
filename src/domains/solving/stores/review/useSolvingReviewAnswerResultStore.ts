import { create } from "zustand";

//
//
//

interface SolvingReviewAnswerResultState {
	selectedAnswers: Array<number | string>;
}

interface SolvingReviewAnswerResultActions {
	setSelectedAnswers: (
		selectedAnswers: SolvingReviewAnswerResultState["selectedAnswers"],
	) => void;
	reset: () => void;
}

//
//
//

const useSolvingReviewAnswerResultStore = create<
	SolvingReviewAnswerResultState & SolvingReviewAnswerResultActions
>((set) => ({
	selectedAnswers: [],

	setSelectedAnswers: (selectedAnswers) => set(() => ({ selectedAnswers })),
	reset: () => set(() => ({ selectedAnswers: [] })),
}));

export default useSolvingReviewAnswerResultStore;
