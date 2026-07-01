import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { OnboardingCode } from "@/components/onboarding/onboarding.config";

//
//
//

interface OnboardingState {
	pendingCodes: OnboardingCode[];
	pendingScreenIds: number[];
	currentCodeIndex: number;
	currentStepIndex: number;
	startStepIndex: number;
	isActive: boolean;
	isFinishModalOpen: boolean;
	questionManageIds: { questionSetId: number; questionId: number } | null;
	isDismissed: boolean;
}

interface OnboardingStoreActions {
	setPendingCodes: (codes: OnboardingCode[]) => void;
	setPendingScreenIds: (ids: number[]) => void;
	setCurrentCodeIndex: (i: number) => void;
	setCurrentStepIndex: (i: number) => void;
	setStartStepIndex: (i: number) => void;
	setIsActive: (v: boolean) => void;
	setIsFinishModalOpen: (v: boolean) => void;
	setQuestionManageIds: (ids: { questionSetId: number; questionId: number } | null) => void;
	setIsDismissed: (v: boolean) => void;
	reset: () => void;
}

//
//
//

const INITIAL_STATE: OnboardingState = {
	pendingCodes: [],
	pendingScreenIds: [],
	currentCodeIndex: 0,
	currentStepIndex: 0,
	startStepIndex: 0,
	isActive: false,
	isFinishModalOpen: false,
	questionManageIds: null,
	isDismissed: false,
};

//
//
//

const useOnboardingStore = create<OnboardingState & OnboardingStoreActions>()(
	persist(
		(set) => ({
			...INITIAL_STATE,
			setPendingCodes: (codes) => set({ pendingCodes: codes }),
			setPendingScreenIds: (ids) => set({ pendingScreenIds: ids }),
			setCurrentCodeIndex: (i) => set({ currentCodeIndex: i }),
			setCurrentStepIndex: (i) => set({ currentStepIndex: i }),
			setStartStepIndex: (i) => set({ startStepIndex: i }),
			setIsActive: (v) => set({ isActive: v }),
			setIsFinishModalOpen: (v) => set({ isFinishModalOpen: v }),
			setQuestionManageIds: (ids) => set({ questionManageIds: ids }),
			setIsDismissed: (v) => set({ isDismissed: v }),
			reset: () => set(INITIAL_STATE),
		}),
		{
			name: "onboarding-storage",
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				pendingCodes: state.pendingCodes,
				pendingScreenIds: state.pendingScreenIds,
				currentCodeIndex: state.currentCodeIndex,
				currentStepIndex: state.currentStepIndex,
				startStepIndex: state.startStepIndex,
				isActive: state.isActive,
				isFinishModalOpen: state.isFinishModalOpen,
				questionManageIds: state.questionManageIds,
				isDismissed: state.isDismissed,
			}),
		},
	),
);

export default useOnboardingStore;
