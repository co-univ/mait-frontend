import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamMakerProtectRoute from "@/components/TeamMakerProtectRoute";

const ControlRedirect = lazy(() => import("./pages/common/ControlRedirect"));
const ControlParticipant = lazy(() => import("./pages/participant/ControlParticipant"));
const ControlSolving = lazy(() => import("./pages/solving/ControlSolving"));

export const controlRouter: RouteObject[] = [
	{
		path: "/control/solving/question-set/:questionSetId/question/:questionId",
		element: <TeamMakerProtectRoute><ControlSolving /></TeamMakerProtectRoute>,
	},
	{
		path: "/control/participant/question-set/:questionSetId/question/:questionId",
		element: <TeamMakerProtectRoute><ControlParticipant /></TeamMakerProtectRoute>,
	},
	{
		path: "/control/solving/question-set/:questionSetId",
		element: <TeamMakerProtectRoute><ControlRedirect /></TeamMakerProtectRoute>,
	},
];
