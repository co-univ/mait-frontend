import type { RouteObject } from "react-router-dom";
import QuestionSets from "@/domains/question-sets/pages/common/QuestionSets";
import QuestionSetsRedirect from "@/domains/question-sets/pages/common/QuestionSetsRedirect";

//
//
//

export const questionSetsRoutes: RouteObject[] = [
	{
		path: "/question-sets/team/:teamId",
		element: <QuestionSets />,
	},
	{
		path: "/question-sets",
		element: <QuestionSetsRedirect />,
	},
];
