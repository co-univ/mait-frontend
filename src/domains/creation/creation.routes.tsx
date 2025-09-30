import type { RouteObject } from "react-router-dom";
import Creation from "@/domains/creation/pages/common/Creation";
import CreationRedirect from "@/domains/creation/pages/common/CreationRedirect";

export const creationRoutes: RouteObject[] = [
	{
		path: "/creation/question-set/:questionSetId/question/:questionId",
		element: <Creation />,
	},
	{
		path: "/creation/question-set/:questionSetId",
		element: <CreationRedirect />,
	}
];
