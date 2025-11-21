import { apiHooks } from "@/libs/api";

//
//
//

/**
 * fetch user data from the API
 * @returns user data, loading state, and error state
 */
const useUser = () => {
	const {
		data: userData,
		isPending,
		isError,
	} = apiHooks.useQuery(
		"get",
		"/api/v1/users/me",
		{},
		{
			staleTime: 1000 * 60 * 60,
			retry: 0,
		},
	);

	return {
		user: userData?.data,
		isLoading: isPending,
		isError: isError,
	};
};

export default useUser;
