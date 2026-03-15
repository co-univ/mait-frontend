import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerGuard from "@/guards/TeamMakerGuard";

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
 * @property {string} LIVE_SOLVING `/control/live/solving/question-set/:questionSetId/question/:questionId`
 * @property {string} LIVE_PARTICIPANT `/control/live/participant/question-set/:questionSetId/question/:questionId`
 */
export const CONTROL_ROUTE_PATH = {
	ROOT: "/control/question-set/:questionSetId",
	LIVE_SOLVING:
		"/control/live/solving/question-set/:questionSetId/question/:questionId",
	LIVE_PARTICIPANT:
		"/control/live/participant/question-set/:questionSetId/question/:questionId",
};

//
//
//

export const controlRouter: RouteObject[] = [
	{
		path: CONTROL_ROUTE_PATH.LIVE_SOLVING,
		element: <ControlSolving />,
	},
	{
		path: CONTROL_ROUTE_PATH.LIVE_PARTICIPANT,
		element: <ControlParticipant />,
	},
	{
		path: CONTROL_ROUTE_PATH.ROOT,
		element: <ControlRedirect />,
	},
].map((route) => ({
	...route,
	element: <TeamMakerGuard>{route.element}</TeamMakerGuard>,
}));
