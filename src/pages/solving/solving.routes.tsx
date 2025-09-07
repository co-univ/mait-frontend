import { SolvingHome } from "./pages/common";
import Solving from "./pages/common/Solving";
import SolvingLiveSolving from "./pages/live/SolvingLiveSolving";

export const solvingRoutes = [
	{
		path: "/quiz-solving",
		element: <SolvingHome />,
	},
	{
		path: "/quiz-solving/:id",
		element: <SolvingLiveSolving />,
	},
];
