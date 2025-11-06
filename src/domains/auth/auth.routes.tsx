import PublicOnlyRoute from "@/ProtectedRoute";
import Login from "./pages/AuthLogin";

export const authRoutes = [
	{
		path: "/login",
		element: (
			<PublicOnlyRoute>
				<Login />
			</PublicOnlyRoute>
		),
	},
];
