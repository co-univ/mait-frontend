import type { RouteObject } from "react-router-dom";
import Creation from "./pages/Creation";

export const creationRoutes: RouteObject[] = [
	{
		path: "/creation",
		element: <Creation />,
	},
];
