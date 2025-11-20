import PublicOnlyRoute from "@/ProtectedRoute";
import AuthOAuthCallback from "./components/AuthOAuthCallback";
import AuthAccountCreationSuccess from "./pages/AuthAccountCreationSuccess";
import AuthCreateAccount from "./pages/AuthCreateAccount";
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
	{
		path: "/account/create",
		element: <AuthCreateAccount />,
	},
	{
		path: "/account/create/success",
		element: <AuthAccountCreationSuccess />,
	},
];
