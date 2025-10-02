import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { controlRoutes } from "@/domains/control";
import { creationRoutes } from "@/domains/creation/creation.routes";
import { homeRoutes } from "@/domains/home";
import { questionSetsRoutes } from "@/domains/question-sets/QuestionSets.routes";
import { solvingRoutes } from "@/domains/solving/solving.routes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			...homeRoutes,
			...controlRoutes,
			...solvingRoutes,
			...creationRoutes,
			...questionSetsRoutes,
		],
	},
]);

export default router;
