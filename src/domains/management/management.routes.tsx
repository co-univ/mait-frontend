import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerProtectRoute from "@/components/TeamMakerProtectRoute";

const Management = lazy(() => import("./pages/common/Management"));
const ManagementRedirect = lazy(() => import("./pages/common/ManagementRedirect"));

export const managementRouter: RouteObject[] = [
	{
		path: "/management",
		element: <TeamMakerProtectRoute><Management /></TeamMakerProtectRoute>,
	},
	{
		path: "/management/redirect",
		element: <TeamMakerProtectRoute><ManagementRedirect /></TeamMakerProtectRoute>,
	},
];
