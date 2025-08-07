import "./App.css";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppLayout from "./components/common/AppLayout";
import type { SIDEBAR_VARIANT } from "./components/common/SideBar";
import Toast from "./components/common/Toast";
import SolvingNextStage from "./pages/solving/pages/SolvingNextStage";
import SolvingWinner from "./pages/solving/pages/SolvingWinner";

//
//
//

const App = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);

	const location = useLocation();
	const location = useLocation();

	const sidebarVariant: SIDEBAR_VARIANT = location.pathname.startsWith(
		"/quiz-solving",
	)
		? "overlay"
		: "default";
	const sidebarVariant: SIDEBAR_VARIANT = location.pathname.startsWith(
		"/quiz-solving",
	)
		? "overlay"
		: "default";

	useEffect(() => {
		if (location.pathname.startsWith("/quiz-solving")) {
			setIsSideBarOpen(false);
		}
	}, [location.pathname]);

	return (
		<div className="app-container">
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
				<Outlet />
			</main>
		</div>
	);
};

export default App;
