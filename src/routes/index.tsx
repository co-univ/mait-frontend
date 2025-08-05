import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Dashboard from "@/pages/dashboard/Dashboard";
import QuizManagement from "@/pages/quiz-management/QuizManagement";
import Solving from "@/pages/solving";
import TeamManagement from "@/pages/team-management/TeamManagement";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "", element: <QuizManagement /> }, // TODO: if member is player, redirect to quiz-solving; if maker, redirect to quiz-management
			{ path: "quiz-management", element: <QuizManagement /> },
			{ path: "solving", element: <Solving /> },
			{ path: "dashboard", element: <Dashboard /> },
			{ path: "team-management", element: <TeamManagement /> },
		],
	},
]);

export default router;
