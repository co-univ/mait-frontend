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
		queryFn: () => {
			return {
				data: {
					id: 1,
					username: "mock",
					email: "mock@example.com",
					nickname: "mock",
				},
			};
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
