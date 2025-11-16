import type { RouteObject } from "react-router-dom";
import ControlRedirect from "./pages/common/ControlRedirect";
import ControlQuestion from "./pages/question/ControlQuestion";

//
//
//

export const controlRoutes: RouteObject[] = [
	{
		path: "/control/question/team/:teamId/question-set/:questionSetId/question/:questionId",
		element: <ControlQuestion />,
	},
	{
		path: "/control/question/team/:teamId/question-set/:questionSetId",
		element: <ControlRedirect />,
	},
];
