import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import AuthGuard from "@/guards/AuthGuard";
import SolvingReview from "./pages/review/SolvingReview";

const SolvingRedirect = lazy(() => import("./pages/common/SolvingRedirect"));
const SolvingLiveSolving = lazy(
	() => import("./pages/live/SolvingLiveSolving"),
);
const SolvingQuestionSets = lazy(
	() => import("./pages/question-sets/SolvingQuestionSets"),
);
const SolvingReviewRedirect = lazy(
	() => import("./pages/review/SolvingReviewRedirect"),
);

//
//
//

/**
 * @property {string} ROOT `/solving`
 * @property {string} LIVE `/solving/live/:id`
 * @property {string} QUESTION_SETS `/solving/question-sets`
 * @property {string} REVIEW `/solving/review/question-sets/:questionSetId/question/:questionId`
 * @property {string} REVIEW_REDIRECT `/solving/review/question-sets/:questionSetId`
 */
export const SOLVING_ROUTE_PATH = {
	ROOT: "/solving",
	LIVE: "/solving/live/:id",
	QUESTION_SETS: "/solving/question-sets",
	REVIEW: "/solving/review/question-sets/:questionSetId/question/:questionId",
	REVIEW_REDIRECT: "/solving/review/question-sets/:questionSetId",
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
	{
		path: SOLVING_ROUTE_PATH.REVIEW,
		element: <SolvingReview />,
	},
	{
		path: SOLVING_ROUTE_PATH.REVIEW_REDIRECT,
		element: <SolvingReviewRedirect />,
	},
].map((route) => ({
	...route,
	element: <AuthGuard>{route.element}</AuthGuard>,
}));
