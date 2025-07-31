import "./App.css";
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
			<main className="main-content">
				<Outlet />
			</main>
		</div>
	);
};

export default App;
