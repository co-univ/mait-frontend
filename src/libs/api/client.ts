import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "@/libs/types/api";

//
//
//

const API_BASE_URL = process.env.PUBLIC_BASE_URL || "";

//
//
//

let isRefreshing = false; // 리프레시 락 flag
let refreshSubscribers: ((token: string) => void)[] = []; // reissue가 완료될 때까지 기다리는 요청들

/**
 * reissue 완료 후 대기 중이던 요청들에 새 토큰 전달
 * @param token 새로 발급된 액세스 토큰
 */
const notifySubscribers = (token: string) => {
	refreshSubscribers.forEach((callback) => callback(token));
	refreshSubscribers = [];
};

/**
 * 새 토큰으로 교체해서 기존 요청 재시도
 * @param request 재시도할 원본 요청
 * @param token 새로 발급된 액세스 토큰
 * @returns 새 토큰으로 재시도한 요청의 Response
 */
const retryWithToken = (request: Request, token: string) => {
	const newRequest = new Request(request, { headers: new Headers(request.headers) });
	newRequest.headers.set("Authorization", `Bearer ${token}`);
	return fetch(newRequest);
};

//
//
//

const authMiddleware: Middleware = {
	async onRequest({ request }) {
		if (request.url.includes("/auth/access-token")) {
			return request;
		}

		const token = localStorage.getItem("token");
		if (token) {
			request.headers.set("Authorization", `Bearer ${token}`);
		}

		return request;
	},

	async onResponse({ request, response }) {
		if (request.url.includes("/auth/reissue")) {
			return response;
		}

		if (response.status !== 401) {
			return response;
		}

		const errorData = await response.clone().json();
		if (errorData.code !== "A-003") {
			return response;
		}

		// 이미 리이슈 진행 중이면 완료될 때까지 대기 후 새 토큰으로 재시도
		if (isRefreshing) {
			return new Promise<Response>((resolve) => {
				refreshSubscribers.push((newToken) => resolve(retryWithToken(request, newToken)));
			});
		}

		isRefreshing = true;

		try {
			const res = await fetch(`${API_BASE_URL}/api/v1/auth/reissue`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				credentials: "include",
			});

			const newToken = res.headers.get("Authorization") || "";
			localStorage.setItem("token", newToken);

			notifySubscribers(newToken);
			
			return retryWithToken(request, newToken);
		} catch {
			refreshSubscribers = [];
			localStorage.removeItem("token");
			window.location.href = "/login";
		} finally {
			isRefreshing = false;
		}

		return response;
	},
};

//
//
//

const apiClient = createClient<paths>({
	baseUrl: process.env.PUBLIC_BASE_URL || "",
	credentials: "include",
});

apiClient.use(authMiddleware);

export default apiClient;
