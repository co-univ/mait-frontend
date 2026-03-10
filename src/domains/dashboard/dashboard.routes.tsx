import { lazy } from "react";

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
];
