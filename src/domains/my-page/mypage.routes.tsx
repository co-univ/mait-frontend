import { lazy } from "react";
import PublicOnlyGuard from "@/guards/PublicOnlyGuard";

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
			<PublicOnlyGuard>
				<MyPage />
			</PublicOnlyGuard>
		),
	},
];
