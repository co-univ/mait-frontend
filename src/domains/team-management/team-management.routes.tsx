import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamProtectRoute from "@/components/TeamProtectRoute";

const TeamManagement = lazy(() => import("./pages/common/TeamManagement"));
const TeamManagementRedirect = lazy(() => import("./pages/common/TeamManagementRedirect"));

export const teamManagementRouter: RouteObject[] = [
	{
		path: "/team-management",
		element: <TeamProtectRoute><TeamManagement /></TeamProtectRoute>,
	},
	{
		path: "/team-management/redirect",
		element: <TeamProtectRoute><TeamManagementRedirect /></TeamProtectRoute>,
	},
];
