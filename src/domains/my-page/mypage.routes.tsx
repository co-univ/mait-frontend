import { lazy } from "react";
import { ProtectedRoute } from "@/ProtectedRoute";

const MyPage = lazy(() => import("./pages/MyPage"));

export const myPageRouter = [
	{
		path: "/mypage",
		element: (
			<ProtectedRoute>
				<MyPage />
			</ProtectedRoute>
		),
	},
];
