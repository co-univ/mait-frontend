import { lazy } from "react";
import PublicOnlyRoute from "@/ProtectedRoute";

const AuthAccountCreationSuccess = lazy(() => import("./pages/AuthAccountCreationSuccess"));
const AuthCreateAccount = lazy(() => import("./pages/AuthCreateAccount"));
const Login = lazy(() => import("./pages/AuthLogin"));
const AuthOAuthCallback = lazy(() => import("./pages/AuthOAuthCallback"));
const AuthOAuthSignUp = lazy(() => import("./pages/AuthOAuthSignUp"));

export const authRouter = [
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
