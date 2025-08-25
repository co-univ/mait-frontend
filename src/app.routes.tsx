import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { controlRoutes } from "@/pages/control";
import { homeRoutes } from "@/pages/home";
import { creationRoutes } from "./pages/creation/creation.routes";
import { solvingRoutes } from "./pages/solving/solving.routes";

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
