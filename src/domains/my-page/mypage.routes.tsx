import { ProtectedRoute } from "@/ProtectedRoute";
import MyPage from "./pages/MyPage";

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
