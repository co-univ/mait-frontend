import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { authRoutes } from "@/domains/auth";
import { controlRoutes } from "@/domains/control/Control.routes";
import { creationRoutes } from "@/domains/creation/creation.routes";
import { homeRoutes } from "@/domains/home";
import { inviteRoutes } from "@/domains/invite/Invite.routes";
import { managementRoutes } from "@/domains/management/Management.routes";
import { myPageRoutes } from "@/domains/my-page";
import { solvingRoutes } from "@/domains/solving/solving.routes";
import { teamManagementRoutes } from "@/domains/team-management/TeamManagement.routes";
import TeamProtectRoute from "./components/TeamProtectRoute";

const NotFound = lazy(() => import("@/pages/NotFound"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			...homeRoutes,
			...authRoutes,
			...controlRoutes.map((route) => ({
				...route,
				element: <TeamProtectRoute>{route.element}</TeamProtectRoute>,
			})),
			...solvingRoutes,
			...creationRoutes.map((route) => ({
				...route,
				element: <TeamProtectRoute>{route.element}</TeamProtectRoute>,
			})),
			...managementRoutes.map((route) => ({
				...route,
				element: <TeamProtectRoute>{route.element}</TeamProtectRoute>,
			})),
			...myPageRoutes,
			...teamManagementRoutes.map((route) => ({
				...route,
				element: <TeamProtectRoute>{route.element}</TeamProtectRoute>,
			})),
			...inviteRoutes,
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export default router;
