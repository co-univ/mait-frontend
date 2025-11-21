import PublicOnlyRoute from "@/ProtectedRoute";
import AuthAccountCreationSuccess from "./pages/AuthAccountCreationSuccess";
import AuthCreateAccount from "./pages/AuthCreateAccount";
import Login from "./pages/AuthLogin";
import AuthOAuthCallback from "./pages/AuthOAuthCallback";
import AuthOAuthSignUp from "./pages/AuthOAuthSignUp";

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
		path: "/oauth/signup",
		element: <AuthOAuthSignUp />,
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
