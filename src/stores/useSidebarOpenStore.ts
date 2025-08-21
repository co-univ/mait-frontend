import { create } from "zustand";

//
//
//

interface SidebarOpenState {
	isSidebarOpen: boolean;
}

interface SidebarOpenStoreActions {
	toggleSidebarOpen: () => void;
}

//
//
//

const useSidebarOpenStore = create<SidebarOpenState & SidebarOpenStoreActions>(
	(set) => ({
		isSidebarOpen: true,
		toggleSidebarOpen: () =>
			set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
	}),
);

export default useSidebarOpenStore;
