import type { RouteObject } from "react-router-dom";
import Creation from "@/domains/creation/pages/common/Creation";

export const creationRoutes: RouteObject[] = [
	{
		path: "/creation",
		element: <Creation />,
	},
];
