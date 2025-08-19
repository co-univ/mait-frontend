import { createBrowserRouter } from "react-router-dom";
import { Control, Participants } from "src/pages/control";
import { QuestionCreation } from "src/pages/creation";
import App from "../App";
import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home/Home";
import QuizSolvingHome from "../pages/solving/common/pages/Solving";
import QuizSolvingRealTimeSolving from "../pages/solving/live/pages/SolvingLiveSolving";
import TeamManagement from "../pages/team-management/TeamManagement";

//
//
//

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "", element: <Home /> }, // TODO: if member is player, redirect to quiz-solving; if maker, redirect to quiz-management
			{
				path: "quiz-solving",
				children: [
					{
						path: "",
						element: <QuizSolvingHome />,
					},
					{
						path: ":id",
						element: <QuizSolvingRealTimeSolving />,
					},
				],
			},
			{ path: "dashboard", element: <Dashboard /> },
			{ path: "team-management", element: <TeamManagement /> },
			{
				path: `/control/:questionSetId/participants`,
				element: <Participants />,
			},
			{ path: "control", element: <Control /> },
			{ path: "creation", element: <QuestionCreation /> },
		],
	},
]);

export default router;
