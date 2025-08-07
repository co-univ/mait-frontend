import { create } from "zustand";

//
//
//

interface LoginModalOpenStore {
	isLoginModalOpen: boolean;
	setIsLoginModalOpen: (isOpen: boolean) => void;
}

interface LoginModalOpenStoreActions {
	openLoginModal: () => void;
	closeLoginModal: () => void;
	handleLoginSuccess: () => void;
}

//
//
//

const useLoginModalOpenStore = create<
	LoginModalOpenStore & LoginModalOpenStoreActions
>((set) => ({
	isLoginModalOpen: false,

	setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
	openLoginModal: () => set({ isLoginModalOpen: true }),
	closeLoginModal: () => set({ isLoginModalOpen: false }),
	handleLoginSuccess: () => {
		set({ isLoginModalOpen: false });
		window.location.reload();
	},
}));

export default useLoginModalOpenStore;
