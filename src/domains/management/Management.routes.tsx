import type { RouteObject } from "react-router-dom";
import Management from "./pages/common/Management";
import ManagementRedirect from "./pages/common/ManagementRedirect";

//
//
//

export const managementRoutes: RouteObject[] = [
	{
		path: "/management",
		element: <Management />,
	},
	{
		path: "/management/redirect",
		element: <ManagementRedirect />,
	},
];
