import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerGuard from "@/guards/TeamMakerGuard";

const ControlRedirect = lazy(() => import("./pages/common/ControlRedirect"));
const ControlLiveParticipant = lazy(
	() => import("./pages/participant/ControlParticipant"),
);
const ControlLiveSolving = lazy(() => import("./pages/solving/ControlSolving"));
const ControlStudySolving = lazy(
	() => import("./pages/study/solving/ControlStudySolving"),
);

//
//
//

/**
 * @property {string} LIVE_ROOT `/control/live/question-set/:questionSetId`
 * @property {string} LIVE_SOLVING `/control/live/solving/question-set/:questionSetId/question/:questionId`
 * @property {string} LIVE_PARTICIPANT `/control/live/participant/question-set/:questionSetId/question/:questionId`
 * @property {string} STUDY_ROOT `/control/study/question-set/:questionSetId`
 * @property {string} STUDY_SOLVING `/control/study/solving/question-set/:questionSetId/question/:questionId`
 */
export const CONTROL_ROUTE_PATH = {
	LIVE_ROOT: "/control/live/question-set/:questionSetId",
	LIVE_SOLVING:
		"/control/live/solving/question-set/:questionSetId/question/:questionId",
	LIVE_PARTICIPANT:
		"/control/live/participant/question-set/:questionSetId/question/:questionId",
	STUDY_ROOT: "/control/study/question-set/:questionSetId",
	STUDY_SOLVING:
		"/control/study/solving/question-set/:questionSetId/question/:questionId",
};

//
//
//

export const controlRouter: RouteObject[] = [
	{
		path: CONTROL_ROUTE_PATH.LIVE_SOLVING,
		element: <ControlLiveSolving />,
	},
	{
		path: CONTROL_ROUTE_PATH.LIVE_PARTICIPANT,
		element: <ControlLiveParticipant />,
	},
	{
		path: CONTROL_ROUTE_PATH.STUDY_SOLVING,
		element: <ControlStudySolving />,
	},
	{
		path: CONTROL_ROUTE_PATH.LIVE_ROOT,
		element: <ControlRedirect routePath={CONTROL_ROUTE_PATH.LIVE_SOLVING} />,
	},
	{
		path: CONTROL_ROUTE_PATH.STUDY_ROOT,
		element: <ControlRedirect routePath={CONTROL_ROUTE_PATH.STUDY_SOLVING} />,
	},
].map((route) => ({
	...route,
	element: <TeamMakerGuard>{route.element}</TeamMakerGuard>,
}));
