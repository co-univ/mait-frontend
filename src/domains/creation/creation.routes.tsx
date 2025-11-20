import type { RouteObject } from "react-router-dom";
import CreationRedirect from "@/domains/creation/pages/common/CreationRedirect";
import CreationNew from "@/domains/creation/pages/new/CreationNew";
import CreationQuestion from "@/domains/creation/pages/question/CreationQuestion";
import CreationNewLoading from "./pages/new/CreationNewLoading";
import CreationPublish from "./pages/publish/CreationPublish";

export const creationRoutes: RouteObject[] = [
	{
		path: "/creation/question/question-set/:questionSetId/question/:questionId",
		element: <CreationQuestion />,
	},
	{
		path: "/creation/new",
		element: <CreationNew />,
	},
	{
		path: "/creation/new/loading/question-set/:questionSetId",
		element: <CreationNewLoading />,
	},
	{
		path: "/creation/publish/question-set/:questionSetId",
		element: <CreationPublish />,
	},
	{
		path: "/creation/question/question-set/:questionSetId",
		element: <CreationRedirect />,
	},
];
