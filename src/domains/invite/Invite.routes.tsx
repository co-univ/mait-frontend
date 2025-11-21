import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Invite = lazy(() => import("./pages/common/Invite"));

export const inviteRoutes: RouteObject[] = [
	{
		path: "/invite",
		element: <Invite />,
	},
];
