import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerGuard from "@/guards/TeamMakerGuard";

const CreationRedirect = lazy(
	() => import("@/domains/creation/pages/common/CreationRedirect"),
);
const CreationNew = lazy(
	() => import("@/domains/creation/pages/new/CreationNew"),
);
const CreationQuestion = lazy(
	() => import("@/domains/creation/pages/question/CreationQuestion"),
);
const CreationNewLoading = lazy(() => import("./pages/new/CreationNewLoading"));
const CreationPublish = lazy(() => import("./pages/publish/CreationPublish"));

//
//
//

/**
 * @property {string} ROOT `/creation/question-set/:questionSetId`
 * @property {string} NEW `/creation/new`
 * @property {string} NEW_LOADING `/creation/new/loading/question-set/:questionSetId`
 * @property {string} QUESTION `/creation/question/question-set/:questionSetId/question/:questionId`
 * @property {string} PUBLISH `/creation/publish/question-set/:questionSetId`
 */
export const CREATION_ROUTE_PATH = {
	ROOT: "/creation/question-set/:questionSetId",
	NEW: "/creation/new",
	NEW_LOADING: "/creation/new/loading/question-set/:questionSetId",
	QUESTION:
		"/creation/question/question-set/:questionSetId/question/:questionId",
	PUBLISH: "/creation/publish/question-set/:questionSetId",
};

//
//
//

export const creationRouter: RouteObject[] = [
	{
		path: CREATION_ROUTE_PATH.NEW_LOADING,
		element: <CreationNewLoading />,
	},
	{
		path: CREATION_ROUTE_PATH.NEW,
		element: <CreationNew />,
	},
	{
		path: CREATION_ROUTE_PATH.QUESTION,
		element: <CreationQuestion />,
	},
	{
		path: CREATION_ROUTE_PATH.PUBLISH,
		element: <CreationPublish />,
	},
	{
		path: CREATION_ROUTE_PATH.ROOT,
		element: <CreationRedirect />,
	},
].map((route) => ({
	...route,
	element: <TeamMakerGuard>{route.element}</TeamMakerGuard>,
}));
