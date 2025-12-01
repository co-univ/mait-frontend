import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamProtectRoute from "@/components/TeamProtectRoute";

const ControlRedirect = lazy(() => import("./pages/common/ControlRedirect"));
const ControlParticipant = lazy(() => import("./pages/participant/ControlParticipant"));
const ControlSolving = lazy(() => import("./pages/solving/ControlSolving"));

export const controlRouter: RouteObject[] = [
	{
		path: "/control/solving/question-set/:questionSetId/question/:questionId",
		element: <TeamProtectRoute><ControlSolving /></TeamProtectRoute>,
	},
	{
		path: "/control/participant/question-set/:questionSetId/question/:questionId",
		element: <TeamProtectRoute><ControlParticipant /></TeamProtectRoute>,
	},
	{
		path: "/control/solving/question-set/:questionSetId",
		element: <TeamProtectRoute><ControlRedirect /></TeamProtectRoute>,
	},
];
