import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "@/libs/types/api";

//
//
//

const API_BASE_URL = process.env.PUBLIC_BASE_URL || "";

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
		// 리이슈 시 무한 루프 방지용
		if (request.url.includes("/auth/reissue")) {
			return response;
		}

		if (response.status === 401) {
			const clonedResponse = response.clone();
			const errorData = await clonedResponse.json();
			// 토큰 만료 시 reissue 처리
			if (errorData.code === "A-003") {
				try {
					const res = await fetch(`${API_BASE_URL}/api/v1/auth/reissue`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
						credentials: "include",
					});

					if (res.headers) {
						console.log("reissue response:", res);
						const newToken = res.headers.get("Authorization") || "";
						localStorage.setItem("token", newToken);

						const newRequest = new Request(request, {
							headers: new Headers(request.headers),
						});
						newRequest.headers.set("Authorization", `Bearer ${newToken}`);

						return fetch(newRequest);
					}
				} catch (err) {
					console.log("reissue failed:", err);
					localStorage.removeItem("token");
					window.location.href = "/login";
				}
			}
		}

		return response;
	},
};

const apiClient = createClient<paths>({
	baseUrl: process.env.PUBLIC_BASE_URL || "",
	credentials: "include",
});

apiClient.use(authMiddleware);

export default apiClient;
