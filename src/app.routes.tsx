import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { controlRoutes } from "@/domain/control";
import { creationRoutes } from "@/domain/creation/creation.routes";
import { homeRoutes } from "@/domain/home";
import { solvingRoutes } from "@/domain/solving/solving.routes";

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
