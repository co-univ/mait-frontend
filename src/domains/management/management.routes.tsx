import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import TeamGuard from "@/guards/TeamGuard";
import TeamMakerGuard from "@/guards/TeamMakerGuard";

const Management = lazy(() => import("./pages/common/Management"));

//
//
//

/**
 * @property {string} ROOT `/management`
 */
export const MANAGEMENT_ROUTE_PATH = {
	ROOT: "/management",
};

//
//
//

export const managementRouter: RouteObject[] = [
	{
		path: MANAGEMENT_ROUTE_PATH.ROOT,
		element: (
			<TeamGuard rootPath={MANAGEMENT_ROUTE_PATH.ROOT}>
				<TeamMakerGuard>
					<Management />
				</TeamMakerGuard>
			</TeamGuard>
		),
	},
];
