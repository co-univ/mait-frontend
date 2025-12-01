import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerProtectRoute from "@/components/TeamMakerProtectRoute";

const CreationRedirect = lazy(() => import("@/domains/creation/pages/common/CreationRedirect"));
const CreationNew = lazy(() => import("@/domains/creation/pages/new/CreationNew"));
const CreationQuestion = lazy(() => import("@/domains/creation/pages/question/CreationQuestion"));
const CreationNewLoading = lazy(() => import("./pages/new/CreationNewLoading"));
const CreationPublish = lazy(() => import("./pages/publish/CreationPublish"));

export const creationRouter: RouteObject[] = [
	{
		path: "/creation/question/question-set/:questionSetId/question/:questionId",
		element: <TeamMakerProtectRoute><CreationQuestion /></TeamMakerProtectRoute>,
	},
	{
		path: "/creation/new",
		element: <TeamMakerProtectRoute><CreationNew /></TeamMakerProtectRoute>,
	},
	{
		path: "/creation/new/loading/question-set/:questionSetId",
		element: <TeamMakerProtectRoute><CreationNewLoading /></TeamMakerProtectRoute>,
	},
	{
		path: "/creation/publish/question-set/:questionSetId",
		element: <TeamMakerProtectRoute><CreationPublish /></TeamMakerProtectRoute>,
	},
	{
		path: "/creation/question/question-set/:questionSetId",
		element: <TeamMakerProtectRoute><CreationRedirect /></TeamMakerProtectRoute>,
	},
];
