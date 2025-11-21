import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const ControlRedirect = lazy(() => import("./pages/common/ControlRedirect"));
const ControlParticipant = lazy(() => import("./pages/participant/ControlParticipant"));
const ControlSolving = lazy(() => import("./pages/solving/ControlSolving"));

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
