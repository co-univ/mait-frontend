import { lazy } from "react";
import AuthGuard from "@/guards/AuthGuard";
import TeamGuard from "@/guards/TeamGuard";

const Dashboard = lazy(() => import("./pages/common/Dashboard"));
const DashboardQuestionRedirect = lazy(
	() => import("./pages/question/DashboardQuestionRedirect"),
);
const DashboardQuestion = lazy(
	() => import("./pages/question/DashboardQuestion"),
);

//
//
//

/**
 * @property {string} ROOT `/dashboard`
 * @property {string} QUESTION_ROOT `/dashboard/questions/:questionSetId`
 * @property {string} QUESTION `/dashboard/questions/:questionSetId/question/:questionId`
 */
export const DASHBOARD_ROUTE_PATH = {
	ROOT: "/dashboard",
	QUESTION_ROOT: "/dashboard/questions/:questionSetId",
	QUESTION: "/dashboard/questions/:questionSetId/question/:questionId",
};

//
//
//

export const dashboardRouter = [
	{
		path: DASHBOARD_ROUTE_PATH.QUESTION,
		element: <DashboardQuestion />,
	},
	{
		path: DASHBOARD_ROUTE_PATH.QUESTION_ROOT,
		element: <DashboardQuestionRedirect />,
	},
	{
		path: DASHBOARD_ROUTE_PATH.ROOT,
		element: <Dashboard />,
	},
].map((route) => ({
	...route,
	element: (
		<TeamGuard rootPath={DASHBOARD_ROUTE_PATH.ROOT}>
			<AuthGuard>{route.element}</AuthGuard>
		</TeamGuard>
	),
}));
