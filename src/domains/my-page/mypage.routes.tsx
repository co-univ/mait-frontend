import { lazy } from "react";
import AuthGuard from "@/guards/AuthGuard";

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
			<AuthGuard>
				<MyPage />
			</AuthGuard>
		),
	},
];
