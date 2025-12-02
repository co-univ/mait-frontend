import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerProtectRoute from "@/guards/TeamMakerProtectRoute";

const Management = lazy(() => import("./pages/common/Management"));

//
//
//

/**
 * @property {string} ROOT `/management`
 */
export const MANAGEMENT_ROUTE_PATH = {
	ROOT: "/management",
};

//
//
//

export const managementRouter: RouteObject[] = [
	{
		path: MANAGEMENT_ROUTE_PATH.ROOT,
		element: (
			<TeamMakerProtectRoute>
				<Management />
			</TeamMakerProtectRoute>
		),
	},
];
