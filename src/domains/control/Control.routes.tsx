import type { RouteObject } from "react-router-dom";
import ControlRedirect from "./pages/common/ControlRedirect";
import ControlSolving from "./pages/solving/ControlSolving";

//
//
//

export const controlRoutes: RouteObject[] = [
	{
		path: "/control/solving/team/:teamId/question-set/:questionSetId/question/:questionId",
		element: <ControlSolving />,
	},
	{
		path: "/control/solving/team/:teamId/question-set/:questionSetId",
		element: <ControlRedirect />,
	},
];
