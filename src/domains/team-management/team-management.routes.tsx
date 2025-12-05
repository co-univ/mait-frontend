import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerGuard from "@/guards/TeamMakerGuard";

const TeamManagement = lazy(() => import("./pages/common/TeamManagement"));

//
//
//

/**
 * @property {string} ROOT `/team-management`
 */
export const TEAM_MANAGEMENT_ROUTE_PATH = {
	ROOT: "/team-management",
};

//
//
//

export const teamManagementRouter: RouteObject[] = [
	{
		path: TEAM_MANAGEMENT_ROUTE_PATH.ROOT,
		element: (
			<TeamMakerGuard>
				<TeamManagement />
			</TeamMakerGuard>
		),
	},
];
