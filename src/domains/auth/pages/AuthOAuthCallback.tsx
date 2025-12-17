import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingView from "@/components/LoadingView";
import { HOME_ROUTE_PATH } from "@/domains/home/home.routes";
import { apiClient } from "@/libs/api";
import { AUTH_ROUTE_PATH } from "../auth.routes";

//
//
//

const AuthOAuthCallback = () => {
	const location = useLocation();
	const navigate = useNavigate();

	//
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const authCode = searchParams.get("code");

		const handleAuth = async () => {
			if (!authCode) {
				console.error("Authorization code not found");
				navigate(-1);
				return;
			}

			try {
				const { data, error } = await apiClient.GET(
					"/api/v1/auth/access-token",
					{
						params: {
							query: {
								code: authCode,
							},
						},
					},
				);

				if (error || !data?.data) {
					console.error("Access Token 발급 실패: ", error);
					return;
				}

				if (data?.data) {
					localStorage.setItem("token", data.data);
					navigate(HOME_ROUTE_PATH.ROOT);
				}
			} catch (error) {
				console.error("Access Token 발급 실패: ", error);
			}
		};

		handleAuth();
	}, [location.search, navigate]);

	return (
		<>
			<LoadingView />
		</>
	);
};

export default AuthOAuthCallback;
