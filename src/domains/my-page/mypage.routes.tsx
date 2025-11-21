import { lazy } from "react";
import { ProtectedRoute } from "@/ProtectedRoute";

const MyPage = lazy(() => import("./pages/MyPage"));

export const myPageRoutes = [
	{
		path: "/mypage",
		element: (
			<ProtectedRoute>
				<MyPage />
			</ProtectedRoute>
		),
	},
];
