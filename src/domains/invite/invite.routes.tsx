import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Invite = lazy(() => import("./pages/common/Invite"));

//
//
//

/**
 * @property {string} ROOT `/invite`
 */
export const INVITE_ROUTE_PATH = {
	ROOT: "/invite",
};

//
//
//

export const inviteRouter: RouteObject[] = [
	{
		path: INVITE_ROUTE_PATH.ROOT,
		element: <Invite />,
	},
];
