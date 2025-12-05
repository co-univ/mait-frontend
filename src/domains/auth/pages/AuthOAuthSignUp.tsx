import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingView from "@/components/LoadingView";
import { AUTH_ROUTE_PATH } from "../auth.routes";

//
//
//

const AuthOAuthSignUp = () => {
	const location = useLocation();
	const navigate = useNavigate();

	//
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const authCode = searchParams.get("code");
		navigate(AUTH_ROUTE_PATH.ACCOUNT_CREATE, { state: { code: authCode } });
	}, [location.search, navigate]);

	return (
		<>
			<LoadingView />
		</>
	);
};

export default AuthOAuthSignUp;
