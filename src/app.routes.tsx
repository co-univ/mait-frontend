import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { authRouter } from "@/domains/auth";
import { controlRouter } from "@/domains/control/control.routes";
import { creationRouter } from "@/domains/creation/creation.routes";
import { homeRouter } from "@/domains/home";
import { inviteRouter } from "@/domains/invite/invite.routes";
import { managementRouter } from "@/domains/management/management.routes";
import { myPageRouter } from "@/domains/my-page";
import { solvingRouter } from "@/domains/solving/solving.routes";
import { teamManagementRouter } from "@/domains/team-management/team-management.routes";
import TeamProtectRoute from "./components/TeamProtectRoute";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			...homeRouter,
			...authRouter,
			...controlRouter.map((route) => ({
				...route,
				element: <TeamProtectRoute>{route.element}</TeamProtectRoute>,
			})),
			...solvingRouter,
			...creationRouter.map((route) => ({
				...route,
				element: <TeamProtectRoute>{route.element}</TeamProtectRoute>,
			})),
			...managementRouter.map((route) => ({
				...route,
				element: <TeamProtectRoute>{route.element}</TeamProtectRoute>,
			})),
			...myPageRouter,
			...teamManagementRouter.map((route) => ({
				...route,
				element: <TeamProtectRoute>{route.element}</TeamProtectRoute>,
			})),
			...inviteRouter,
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

export default router;
