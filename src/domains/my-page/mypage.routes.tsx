import { lazy } from "react";
import AuthGuard from "@/guards/AuthGuard";
import TeamGuard from "@/guards/TeamGuard";

const MyPage = lazy(() => import("./pages/MyPage"));

//
//
//

/**
 * @property {string} ROOT `/mypage`
 */
export const MYPAGE_ROUTE_PATH = {
	ROOT: "/mypage",
};

//
//
//

export const myPageRouter = [
	{
		path: MYPAGE_ROUTE_PATH.ROOT,
		element: (
			<TeamGuard rootPath={MYPAGE_ROUTE_PATH.ROOT}>
				<AuthGuard>
					<MyPage />
				</AuthGuard>
			</TeamGuard>
		),
	},
];
