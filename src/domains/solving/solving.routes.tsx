import { lazy } from "react";

const SolvingRedirect = lazy(() => import("./pages/common/SolvingRedirect"));
const SolvingLiveSolving = lazy(() => import("./pages/live/SolvingLiveSolving"));
const SolvingQuestionSets = lazy(() => import("./pages/question-sets/SolvingQuestionSets"));

export const solvingRouter = [
	{
		path: "/solving",
		element: <SolvingRedirect />,
	},
	{
		path: "/solving/:id",
		element: <SolvingLiveSolving />,
	},
	{
		path: "/solving/question-sets",
		element: <SolvingQuestionSets />,
	},
];
