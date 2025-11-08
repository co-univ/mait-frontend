import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { controlRoutes } from "@/domains/control";
import { creationRoutes } from "@/domains/creation/creation.routes";
import { homeRoutes } from "@/domains/home";
import { solvingRoutes } from "@/domains/solving/solving.routes";
import { authRoutes } from "@/domains/auth";
import { managementRoutes } from "./domains/management/Management.routes";

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
		],
	},
]);

export default router;
