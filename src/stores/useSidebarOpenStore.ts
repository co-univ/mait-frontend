import { create } from "zustand";
import { persist } from "zustand/middleware";

//
//
//

interface SidebarOpenState {
	isSidebarOpen: boolean;
}

interface SidebarOpenStoreActions {
	toggleSidebarOpen: () => void;
	closeSidebar: () => void;
}

//
//
//

const useSidebarOpenStore = create<
	SidebarOpenState & SidebarOpenStoreActions
>()(
	persist(
		(set) => ({
			isSidebarOpen: true,
			toggleSidebarOpen: () =>
				set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
			closeSidebar: () => set({ isSidebarOpen: false }),
		}),
		{
			name: "sidebar-open-storage",
		},
	),
);

export default useSidebarOpenStore;
