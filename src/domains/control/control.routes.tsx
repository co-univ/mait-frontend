import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerProtectRoute from "@/guards/TeamMakerProtectRoute";

const ControlRedirect = lazy(() => import("./pages/common/ControlRedirect"));
const ControlParticipant = lazy(
	() => import("./pages/participant/ControlParticipant"),
);
const ControlSolving = lazy(() => import("./pages/solving/ControlSolving"));

//
//
//

/**
 * @property {string} ROOT `/control/question-set/:questionSetId`
 * @property {string} SOLVING `/control/solving/question-set/:questionSetId/question/:questionId`
 * @property {string} PARTICIPANT `/control/participant/question-set/:questionSetId/question/:questionId`
 */
export const CONTROL_ROUTE_PATH = {
	ROOT: "/control/question-set/:questionSetId",
	SOLVING: "/control/solving/question-set/:questionSetId/question/:questionId",
	PARTICIPANT:
		"/control/participant/question-set/:questionSetId/question/:questionId",
};

//
//
//

export const controlRouter: RouteObject[] = [
	{
		path: CONTROL_ROUTE_PATH.SOLVING,
		element: <ControlSolving />,
	},
	{
		path: CONTROL_ROUTE_PATH.PARTICIPANT,
		element: <ControlParticipant />,
	},
	{
		path: CONTROL_ROUTE_PATH.ROOT,
		element: <ControlRedirect />,
	},
].map((route) => ({
	...route,
	element: <TeamMakerProtectRoute>{route.element}</TeamMakerProtectRoute>,
}));
