import "./App.css";
import clsx from "clsx";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoginModal from "./components/auth/LoginModal";
import AppLayout from "./components/common/AppLayout";
import type { SIDEBAR_VARIANT } from "./components/common/SideBar";
import Toast from "./components/common/Toast";

//
//
//

const App = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const location = useLocation();

	const sidebarVariant: SIDEBAR_VARIANT = location.pathname.startsWith(
		"/quiz-solving",
	)
		? "overlay"
		: "default";

	return (
		<div className="app-container">
			<Toast />
			<AppLayout
				isSideBarOpen={isSideBarOpen}
				setIsSideBarOpen={setIsSideBarOpen}
				variant={sidebarVariant}
			/>
			<main
				className={clsx(
					"main-content transition-all duration-300 ease-in-out",
					{
						"pl-[calc(17.5rem+2rem)] pr-8":
							isSideBarOpen && sidebarVariant === "default",
						"px-[10.75rem]": !isSideBarOpen && sidebarVariant === "default",
					},
				)}
			>
				<button
					type="button"
					className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					onClick={() => setIsLoginModalOpen(true)}
				>
					로그인
				</button>
				<LoginModal
					open={isLoginModalOpen}
					onClose={() => setIsLoginModalOpen(false)}
				/>
				<Outlet />
			</main>
		</div>
	);
};

export default App;
