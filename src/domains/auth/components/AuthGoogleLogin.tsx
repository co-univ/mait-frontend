import AuthSocialLoginButton from "./AuthGoogleLoginButton";

//
//
//

const OAUTH2_ENDPOINT = "/oauth2/authorization/google";

//
//
//

const AuthGoogleLogin = () => {
	/**
	 *
	 */
	const handleClick = () => {
		const googleAuthUrl = `${process.env.PUBLIC_BASE_URL}${OAUTH2_ENDPOINT}`;

		window.location.href = googleAuthUrl;
	};

	return <AuthSocialLoginButton onClick={handleClick} />;
};

export default AuthGoogleLogin;
