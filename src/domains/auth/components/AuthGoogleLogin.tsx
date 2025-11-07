import AuthSocialLoginButton from "./AuthGoogleLoginButton";

//
//
//

const OAUTH2_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const CLIENT_ID = process.env.PUBLIC_GOOGLE_CLIENT_ID;
const REDIRECT_URL = process.env.PUBLIC_REDIRECT_URL;
const RESPONSE_TYPE = "code";
const SCOPE =
	"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

//
//
//

const AuthGoogleLogin = () => {
	/**
	 *
	 */
	const handleClick = () => {
		const googleAuthUrl = `${OAUTH2_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

		window.location.href = googleAuthUrl;
	};

	return <AuthSocialLoginButton onClick={handleClick} />;
};

export default AuthGoogleLogin;
