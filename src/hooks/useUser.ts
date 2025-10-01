import { useQuery } from "@tanstack/react-query";
import type { ApiResponseUserInfoApiResponse } from "@/types";

//
//
//

/**
 * fetch user data from the API
 * @returns user data, loading state, and error state
 */
const useUser = () => {
	const token = localStorage.getItem("token");

	const {
		data: userData,
		isPending,
		isError,
	} = useQuery<ApiResponseUserInfoApiResponse>({
		queryKey: ["/api/v1/users/me"],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.PUBLIC_BASE_URL}/api/v1/users/me`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${localStorage.getItem("token")}`,
					},
				},
			);

			if (!res.ok) {
				throw new Error("Failed to fetch user data");
			}

			return res.json();
		},
		enabled: !!token,
		staleTime: 1000 * 60 * 60,
		retry: 0,
	});

	return {
		user: userData?.data,
		isLoading: isPending,
		isError: isError,
	};
};

export default useUser;
