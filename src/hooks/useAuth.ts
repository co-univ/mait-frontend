import { useMutation } from "@tanstack/react-query";
import type { LoginApiRequest } from "@/types";

const API_BASE_URL = process.env.PUBLIC_BASE_URL || "";

// 로그인 API 함수
const loginApi = async (credentials: LoginApiRequest): Promise<void> => {
	const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	if (!response.ok) {
		throw new Error(`Login failed: ${response.status}`);
	}

	const token = response.headers.get("Authorization");

	if (token) {
		localStorage.setItem("token", token);
	}

	return undefined;
};

// 로그인 훅
export const useLogin = () => {
	return useMutation({
		mutationFn: loginApi,
		onSuccess: () => {
			console.log("로그인 성공");
		},
		onError: (error) => {
			console.error("로그인 실패:", error);
		},
	});
};
