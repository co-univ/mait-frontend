import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerProtectRoute from "@/components/TeamMakerProtectRoute";

const TeamManagement = lazy(() => import("./pages/common/TeamManagement"));
const TeamManagementRedirect = lazy(() => import("./pages/common/TeamManagementRedirect"));

export const teamManagementRouter: RouteObject[] = [
	{
		path: "/team-management",
		element: <TeamMakerProtectRoute><TeamManagement /></TeamMakerProtectRoute>,
	},
	{
		path: "/team-management/redirect",
		element: <TeamMakerProtectRoute><TeamManagementRedirect /></TeamMakerProtectRoute>,
	},
];
