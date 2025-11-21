import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingView from "@/components/LoadingView";
import { apiClient } from "@/libs/api";

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

		/**
		 *
		 */
		const isInitialLogin = async () => {
			try {
				const { data, error } = await apiClient.GET("/api/v1/users/me");

				if (error || !data?.data) {
					console.error("유저 정보 조회 실패: ", error);
					return null;
				}

				return !data.data.nickname;
			} catch (error) {
				console.error("유저 정보 조회 실패: ", error);
				return null;
			}
		};

		/**
		 * 로그인 이후 리다이렉트 처리 (최초 로그인 시 추가 정보 입력 필요)
		 */
		const handlePostLoginRedirect = async () => {
			const redirectUrl = localStorage.getItem("redirectAfterLogin");

			if (await isInitialLogin()) {
				navigate("/account/create");
			} else if (redirectUrl) {
				localStorage.removeItem("redirectAfterLogin");
				window.location.href = redirectUrl;
			} else {
				navigate("/");
			}
		};

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
					navigate("/");
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
