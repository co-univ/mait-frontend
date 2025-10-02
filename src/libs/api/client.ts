import createClient from "openapi-fetch";
import type { paths } from "@/libs/types/api";

const apiClient = createClient<paths>({
	baseUrl: process.env.PUBLIC_BASE_URL || "",
});

export default apiClient;
