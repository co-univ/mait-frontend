import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Management = lazy(() => import("./pages/common/Management"));
const ManagementRedirect = lazy(() => import("./pages/common/ManagementRedirect"));

export const managementRoutes: RouteObject[] = [
	{
		path: "/management",
		element: <Management />,
	},
	{
		path: "/management/redirect",
		element: <ManagementRedirect />,
	},
];
