import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { controlRoutes } from "@/domains/control";
import { homeRoutes } from "@/domains/home";
import { solvingRoutes } from "@/domains/solving/solving.routes";
import { creationRoutes } from "./domains/creation/creation.routes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			...homeRoutes,
			...controlRoutes,
			...solvingRoutes,
			...creationRoutes,
		],
	},
]);

export default router;
