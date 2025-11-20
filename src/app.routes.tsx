import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { authRoutes } from "@/domains/auth";
import { controlRoutes } from "@/domains/control/Control.routes";
import { creationRoutes } from "@/domains/creation/creation.routes";
import { homeRoutes } from "@/domains/home";
import { solvingRoutes } from "@/domains/solving/solving.routes";
import { managementRoutes } from "./domains/management/Management.routes";
import { myPageRoutes } from "./domains/my-page";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			...homeRoutes,
			...authRoutes,
			...controlRoutes,
			...solvingRoutes,
			...creationRoutes,
			...managementRoutes,
			...myPageRoutes,
		],
	},
]);

export default router;
