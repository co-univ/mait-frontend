import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const SolvingRedirect = lazy(() => import("./pages/common/SolvingRedirect"));
const SolvingLiveSolving = lazy(
	() => import("./pages/live/SolvingLiveSolving"),
);
const SolvingQuestionSets = lazy(
	() => import("./pages/question-sets/SolvingQuestionSets"),
);

//
//
//

/**
 * @property {string} ROOT `/solving`
 * @property {string} LIVE `/solving/live/:id`
 * @property {string} QUESTION_SETS `/solving/question-sets`
 */
export const SOLVING_ROUTE_PATH = {
	ROOT: "/solving",
	LIVE: "/solving/live/:id",
	QUESTION_SETS: "/solving/question-sets",
};

//
//
//

export const solvingRouter: RouteObject[] = [
	{
		path: SOLVING_ROUTE_PATH.QUESTION_SETS,
		element: <SolvingQuestionSets />,
	},
	{
		path: SOLVING_ROUTE_PATH.LIVE,
		element: <SolvingLiveSolving />,
	},
	{
		path: SOLVING_ROUTE_PATH.ROOT,
		element: <SolvingRedirect />,
	},
];
