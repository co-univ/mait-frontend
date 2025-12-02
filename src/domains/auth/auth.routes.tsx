import { lazy } from "react";
import PublicOnlyGuard from "@/guards/PublicOnlyGuard";

const AuthAccountCreationSuccess = lazy(
	() => import("./pages/AuthAccountCreationSuccess"),
);
const AuthCreateAccount = lazy(() => import("./pages/AuthCreateAccount"));
const Login = lazy(() => import("./pages/AuthLogin"));
const AuthOAuthCallback = lazy(() => import("./pages/AuthOAuthCallback"));
const AuthOAuthSignUp = lazy(() => import("./pages/AuthOAuthSignUp"));

//
//
//

/**
 * @property {string} LOGIN `/login`
 * @property {string} OAUTH_SUCCESS `/oauth/success`
 * @property {string} OAUTH_SIGNUP `/oauth/signup`
 * @property {string} ACCOUNT_CREATE `/account/create`
 * @property {string} ACCOUNT_CREATE_SUCCESS `/account/create/success`
 */
export const AUTH_ROUTE_PATH = {
	LOGIN: "/login",
	OAUTH_SUCCESS: "/oauth/success",
	OAUTH_SIGNUP: "/oauth/signup",
	ACCOUNT_CREATE: "/account/create",
	ACCOUNT_CREATE_SUCCESS: "/account/create/success",
};

//
//
//

export const authRouter = [
	{
		path: AUTH_ROUTE_PATH.LOGIN,
		element: (
			<PublicOnlyGuard>
				<Login />
			</PublicOnlyGuard>
		),
	},
	{
		path: AUTH_ROUTE_PATH.OAUTH_SUCCESS,
		element: <AuthOAuthCallback />,
	},
	{
		path: AUTH_ROUTE_PATH.OAUTH_SIGNUP,
		element: <AuthOAuthSignUp />,
	},
	{
		path: AUTH_ROUTE_PATH.ACCOUNT_CREATE,
		element: <AuthCreateAccount />,
	},
	{
		path: AUTH_ROUTE_PATH.ACCOUNT_CREATE_SUCCESS,
		element: <AuthAccountCreationSuccess />,
	},
];
