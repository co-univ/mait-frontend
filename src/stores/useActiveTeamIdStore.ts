import { create } from "zustand";
import { persist } from "zustand/middleware";

//
//
//

interface ActiveTeamIdState {
	activeTeamId: number | null;
}

interface ActiveTeamIdStoreActions {
	setActiveTeamId: (teamId: number) => void;
}

//
//
//

const useActiveTeamIdStore = create<
	ActiveTeamIdState & ActiveTeamIdStoreActions
>()(
	persist(
		(set) => ({
			activeTeamId: null,
			setActiveTeamId: (teamId: number) => set({ activeTeamId: teamId }),
		}),
		{
			name: "active-team-id-storage",
		},
	),
);

export default useActiveTeamIdStore;
