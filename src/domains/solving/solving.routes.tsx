import Solving from "./pages/common/Solving";
import SolvingLiveSolving from "./pages/live/SolvingLiveSolving";

export const solvingRoutes = [
	{
		path: "/solving",
		element: <Solving />,
	},
	{
		path: "/solving/:id",
		element: <SolvingLiveSolving />,
	},
];
