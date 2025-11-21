import type { RouteObject } from "react-router-dom";
import TeamManagement from "./pages/common/TeamManagement";
import TeamManagementRedirect from "./pages/common/TeamManagementRedirect";

//
//
//

export const teamManagementRoutes: RouteObject[] = [
	{
		path: "/team-management",
		element: <TeamManagement />,
	},
	{
		path: "/team-management/redirect",
		element: <TeamManagementRedirect />,
	},
];
