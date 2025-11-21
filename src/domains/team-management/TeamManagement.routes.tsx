import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const TeamManagement = lazy(() => import("./pages/common/TeamManagement"));
const TeamManagementRedirect = lazy(() => import("./pages/common/TeamManagementRedirect"));

export const teamManagementRoutes: RouteObject[] = [
	{
		path: "/team-management",
		element: <TeamManagement />,
	},
	{
		path: "/team-management/redirect",
		element: <TeamManagementRedirect />,
	},
];
