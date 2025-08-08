import { create } from "zustand";

//
//
//

interface SolvingCorrectStoreState {
	isSubmitted: boolean;
	isCorrected: boolean;
}

interface SolvingCorrectStoreActions {
	setIsSubmitted: (isSubmitted: boolean) => void;
	setIsCorrected: (isCorrected: boolean) => void;
}

//
//
//

const useSolvingCorrectStore = create<
	SolvingCorrectStoreState & SolvingCorrectStoreActions
>((set) => ({
	isSubmitted: false,
	isCorrected: false,

	setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
	setIsCorrected: (isCorrected) => set({ isCorrected }),
}));

export default useSolvingCorrectStore;
