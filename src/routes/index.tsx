import { createBrowserRouter } from "react-router-dom";
import { Control, Participants } from "src/pages/control";
import { QuestionCreation } from "src/pages/creation";
import App from "../App";
import Dashboard from "../pages/dashboard/Dashboard";
import QuizSolving from "../pages/quiz-solving/QuizSolving";
import TeamManagement from "../pages/team-management/TeamManagement";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "control", element: <Control /> },
			{
				path: "control/:questionSetId/participants",
				element: <Participants />,
			},
			{ path: "quiz-solving", element: <QuizSolving /> },
			{ path: "creation", element: <QuestionCreation /> },
			{ path: "dashboard", element: <Dashboard /> },
			{ path: "team-management", element: <TeamManagement /> },
		],
	},
]);

export default router;
