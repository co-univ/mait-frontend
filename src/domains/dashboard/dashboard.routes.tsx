import { lazy } from "react";
import AuthGuard from "@/guards/AuthGuard";

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
	element: <AuthGuard>{route.element}</AuthGuard>,
}));
