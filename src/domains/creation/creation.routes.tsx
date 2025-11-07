import type { RouteObject } from "react-router-dom";
import CreationRedirect from "@/domains/creation/pages/common/CreationRedirect";
import CreationNew from "@/domains/creation/pages/new/CreationNew";
import CreationQuestion from "@/domains/creation/pages/question/CreationQuestion";
import CreationPublish from "./pages/publish/CreationPublish";

export const creationRoutes: RouteObject[] = [
	{
		path: "/creation/question/team/:teamId/question-set/:questionSetId/question/:questionId",
		element: <CreationQuestion />,
	},
	{
		path: "/creation/new/team/:teamId",
		element: <CreationNew />,
	},
	{
		path: "/creation/publish/team/:teamId/question-set/:questionSetId",
		element: <CreationPublish />,
	},
	{
		path: "/creation/question/team/:teamId/question-set/:questionSetId",
		element: <CreationRedirect />,
	},
];
