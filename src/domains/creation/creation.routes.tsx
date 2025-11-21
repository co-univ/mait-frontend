import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const CreationRedirect = lazy(() => import("@/domains/creation/pages/common/CreationRedirect"));
const CreationNew = lazy(() => import("@/domains/creation/pages/new/CreationNew"));
const CreationQuestion = lazy(() => import("@/domains/creation/pages/question/CreationQuestion"));
const CreationNewLoading = lazy(() => import("./pages/new/CreationNewLoading"));
const CreationPublish = lazy(() => import("./pages/publish/CreationPublish"));

export const creationRoutes: RouteObject[] = [
	{
		path: "/creation/question/question-set/:questionSetId/question/:questionId",
		element: <CreationQuestion />,
	},
	{
		path: "/creation/new",
		element: <CreationNew />,
	},
	{
		path: "/creation/new/loading/question-set/:questionSetId",
		element: <CreationNewLoading />,
	},
	{
		path: "/creation/publish/question-set/:questionSetId",
		element: <CreationPublish />,
	},
	{
		path: "/creation/question/question-set/:questionSetId",
		element: <CreationRedirect />,
	},
];
