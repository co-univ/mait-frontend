import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "@/libs/types/api";

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
};

const apiClient = createClient<paths>({
	baseUrl: process.env.PUBLIC_BASE_URL || "",
	credentials: "include",
});

apiClient.use(authMiddleware);

export default apiClient;
