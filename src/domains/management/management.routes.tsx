import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamProtectRoute from "@/components/TeamProtectRoute";

const Management = lazy(() => import("./pages/common/Management"));
const ManagementRedirect = lazy(() => import("./pages/common/ManagementRedirect"));

export const managementRouter: RouteObject[] = [
	{
		path: "/management",
		element: <TeamProtectRoute><Management /></TeamProtectRoute>,
	},
	{
		path: "/management/redirect",
		element: <TeamProtectRoute><ManagementRedirect /></TeamProtectRoute>,
	},
];
