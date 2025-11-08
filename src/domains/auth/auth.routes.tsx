import PublicOnlyRoute from "@/ProtectedRoute";
import AuthOAuthCallback from "./components/AuthOAuthCallback";
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
	{
		path: "/oauth/success",
		element: <AuthOAuthCallback />,
	},
];
