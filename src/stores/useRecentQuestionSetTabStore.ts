import { create } from "zustand";
import { persist } from "zustand/middleware";

//
//
//

interface RecentQuestionSetTabState {
	recentTab: string | null;
}

interface RecentQuestionSetTabStoreActions {
	setRecentTab: (tab: string) => void;
}

//
//
//

const useRecentQuestionSetTabStore = create<
	RecentQuestionSetTabState & RecentQuestionSetTabStoreActions
>()(
	persist(
		(set) => ({
			recentTab: null,
			setRecentTab: (tab: string) => set({ recentTab: tab }),
		}),
		{
			name: "recent-question-set-tab-storage",
		},
	),
);

export default useRecentQuestionSetTabStore;
