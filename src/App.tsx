import "./App.css";
import clsx from "clsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppLayout from "./components/common/AppLayout";

const App = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);

	return (
		<div className="app-container">
			<AppLayout
				isSideBarOpen={isSideBarOpen}
				setIsSideBarOpen={setIsSideBarOpen}
			/>
			<main
				className={clsx(
					"main-content transition-all duration-300 ease-in-out",
					{
						"pl-[calc(17.5rem+2rem)] pr-8": isSideBarOpen,
						"px-[10.75rem]": !isSideBarOpen,
					},
				)}
			>
				<Outlet />
			</main>
		</div>
	);
};

export default App;
