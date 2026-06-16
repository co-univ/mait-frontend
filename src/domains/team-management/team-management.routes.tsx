import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import AuthGuard from "@/guards/AuthGuard";
import TeamGuard from "@/guards/TeamGuard";
import TeamMakerGuard from "@/guards/TeamMakerGuard";

const TeamManagementRedirect = lazy(
	() => import("./pages/common/TeamManagementRedirect"),
);
const TeamManagementUsers = lazy(
	() => import("./pages/users/TeamManagementUsers"),
);
const TeamManagementCategories = lazy(
	() => import("./pages/categories/TeamManagementCategories"),
);

//
//
//

/**
 * @property {string} ROOT `/team-management`
 * @property {string} USERS `/team-management/users`
 * @property {string} CATEGORIES `/team-management/categories`
 */
export const TEAM_MANAGEMENT_ROUTE_PATH = {
	ROOT: "/team-management",
	USERS: "/team-management/users",
	CATEGORIES: "/team-management/categories",
};

//
//
//

export const teamManagementRouter: RouteObject[] = [
	{
		path: TEAM_MANAGEMENT_ROUTE_PATH.ROOT,
		element: <TeamManagementRedirect />,
	},
	{
		path: TEAM_MANAGEMENT_ROUTE_PATH.USERS,
		element: (
			<TeamGuard rootPath={TEAM_MANAGEMENT_ROUTE_PATH.ROOT}>
				<AuthGuard>
					<TeamManagementUsers />
				</AuthGuard>
			</TeamGuard>
		),
	},
	{
		path: TEAM_MANAGEMENT_ROUTE_PATH.CATEGORIES,
		element: (
			<TeamGuard rootPath={TEAM_MANAGEMENT_ROUTE_PATH.ROOT}>
				<TeamMakerGuard>
					<TeamManagementCategories />
				</TeamMakerGuard>
			</TeamGuard>
		),
	},
];
