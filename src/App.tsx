import "./App.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoginModal from "./components/auth/LoginModal";
import AppLayout from "./components/common/AppLayout";
import type { SIDEBAR_VARIANT } from "./components/common/SideBar";
import Toast from "./components/common/Toast";
import useUser from "./hooks/useUser";
import useLoginModalOpenStore from "./stores/useLoginModalOpenStore";

//
//
//

const App = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);

	const { isLoginModalOpen, openLoginModal, closeLoginModal } =
		useLoginModalOpenStore();

	const { user } = useUser();

	const location = useLocation();

	const sidebarVariant: SIDEBAR_VARIANT = location.pathname.startsWith(
		"/quiz-solving",
	)
		? "overlay"
		: "default";

	/**
	 *
	 */
	const handleLoginButtonClick = () => {
		openLoginModal();
	};

	useEffect(() => {
		if (location.pathname.startsWith("/quiz-solving")) {
			setIsSideBarOpen(false);
		}
	}, [location.pathname]);

	return (
		<div className="w-screen h-screen flex">
			<Toast />
			<AppLayout
				isSideBarOpen={isSideBarOpen}
				setIsSideBarOpen={setIsSideBarOpen}
				variant={sidebarVariant}
			/>
			<main
				className={clsx("main-content", {
					"pl-[calc(17.5rem+2rem)] pr-8":
						isSideBarOpen && sidebarVariant === "default",
					"px-[10.75rem]": !isSideBarOpen && sidebarVariant === "default",
				})}
			>
				{!user && (
					<button
						type="button"
						className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						onClick={handleLoginButtonClick}
					>
						로그인
					</button>
				)}
				<LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
				<Outlet />
			</main>
		</div>
	);
};

export default App;
