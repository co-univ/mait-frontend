import type { RouteObject } from "react-router-dom";
import TeamManagement from "./pages/common/TeamManagement";
import TeamManagementRedirect from "./pages/common/TeamManagementRedirect";

//
//
//

export const teamManagementRoutes: RouteObject[] = [
	{
		path: "/team-management/team/:teamId",
		element: <TeamManagement />,
	},
	{
		path: "/team-management",
		element: <TeamManagementRedirect />,
	},
];
