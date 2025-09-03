import createClient from "openapi-fetch";
import type { paths } from "@/lib/types/api";

const apiClient = createClient<paths>({
	baseUrl: process.env.PUBLIC_BASE_URL || "",
});

export default apiClient;
