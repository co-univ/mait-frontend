import type { RouteObject } from "react-router-dom";
import ControlRedirect from "./pages/common/ControlRedirect";
import ControlParticipant from "./pages/participant/ControlParticipant";
import ControlSolving from "./pages/solving/ControlSolving";

//
//
//

export const controlRoutes: RouteObject[] = [
	{
		path: "/control/solving/question-set/:questionSetId/question/:questionId",
		element: <ControlSolving />,
	},
	{
		path: "/control/participant/question-set/:questionSetId/question/:questionId",
		element: <ControlParticipant />,
	},
	{
		path: "/control/solving/question-set/:questionSetId",
		element: <ControlRedirect />,
	},
];
