import { SolvingHome } from "./pages/common";
import Solving from "./pages/common/Solving";

export const solvingRoutes = [
	{
		path: "/quiz-solving",
		element: <SolvingHome />,
	},
	{
		path: "/quiz-solving/:id",
		element: <Solving />,
	},
];
