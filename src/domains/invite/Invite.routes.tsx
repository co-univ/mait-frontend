import type { RouteObject } from "react-router-dom";
import Invite from "./pages/common/Invite";

//
//
//

export const inviteRoutes: RouteObject[] = [
	{
		path: "/invite",
		element: <Invite />,
	},
];
