import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AuthGuard from "@/guards/AuthGuard";
import TeamMakerGuard from "@/guards/TeamMakerGuard";

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
		element: <Navigate to={TEAM_MANAGEMENT_ROUTE_PATH.USERS} replace />,
	},
	{
		path: TEAM_MANAGEMENT_ROUTE_PATH.USERS,
		element: (
			<AuthGuard>
				<TeamManagementUsers />
			</AuthGuard>
		),
	},
	{
		path: TEAM_MANAGEMENT_ROUTE_PATH.CATEGORIES,
		element: (
			<TeamMakerGuard>
				<TeamManagementCategories />
			</TeamMakerGuard>
		),
	},
];
