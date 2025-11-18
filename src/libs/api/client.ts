import createClient from "openapi-fetch";
import type { paths } from "@/libs/types/api";

const apiClient = createClient<paths>({
	baseUrl: process.env.PUBLIC_BASE_URL || "",
});

apiClient.use({
	onRequest({ request }) {
		// 토큰 발급 요청은 제외
		if (request.url.includes("/auth/access-token")) {
			return request;
		}

		const token = localStorage.getItem("token");
		if (token) {
			request.headers.set("Authorization", `Bearer ${token}`);
		}
		return request;
	},
});

export default apiClient;
