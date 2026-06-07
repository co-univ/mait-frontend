import { lazy } from "react";
import AuthGuard from "@/guards/AuthGuard";
import TeamGuard from "@/guards/TeamGuard";

const Dashboard = lazy(() => import("./pages/common/Dashboard"));

//
//
//

/**
 * @property {string} ROOT `/dashboard`
 */
export const DASHBOARD_ROUTE_PATH = {
	ROOT: "/dashboard",
};

//
//
//

export const dashboardRouter = [
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
