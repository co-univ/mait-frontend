import { useMemo } from "react";
import { notify } from "@/components/Toast";
import { apiClient, apiHooks } from "@/libs/api";
import type { JoinedTeamUserApiResponse } from "@/libs/types";

//
//
//

interface UseTeamManagementUsersProps {
	teamId: number;
}

interface UseTeamManagementUsersReturn {
	makers?: JoinedTeamUserApiResponse[];
	players?: JoinedTeamUserApiResponse[];
	handleListOrderChange: (
		list: JoinedTeamUserApiResponse[],
		source: number,
		destination: number,
	) => JoinedTeamUserApiResponse[];
	handleRoleUpdate: (
		teamUserId: number,
		role: "MAKER" | "PLAYER",
	) => Promise<void>;
	isLoading: boolean;
}

//
//
//

const useTeamManagementUsers = ({
	teamId,
}: UseTeamManagementUsersProps): UseTeamManagementUsersReturn => {
	const { data, isPending, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/teams/{teamId}/users",
		{
			params: {
				path: {
					teamId,
				},
			},
		},
	);

	const makers = useMemo(
		() => data?.data?.filter((user) => user.role === "MAKER"),
		[data],
	);
	const players = useMemo(
		() => data?.data?.filter((user) => user.role === "PLAYER"),
		[data],
	);

	/**
	 *
	 */
	const handleListOrderChange = (
		list: JoinedTeamUserApiResponse[],
		source: number,
		destination: number,
	) => {
		const updatedList = Array.from(list);
		const [removed] = updatedList.splice(source, 1);
		updatedList.splice(destination, 0, removed);

		return updatedList;
	};

	/**
	 *
	 */
	const handleRoleUpdate = async (
		teamUserId: number,
		role: "MAKER" | "PLAYER",
	) => {
		try {
			const res = await apiClient.PATCH(
				"/api/v1/teams/team-users/{teamUserId}/role",
				{
					params: {
						path: {
							teamUserId: teamUserId,
						},
					},
					body: {
						role,
					},
				},
			);

			if (!res.data?.isSuccess) {
				throw new Error("Role update failed");
			}

			refetch();
		} catch {
			notify.error("유저 역할 변경에 실패했습니다.");
		}
	};

	return {
		makers,
		players,
		handleListOrderChange,
		handleRoleUpdate,
		isLoading: isPending,
	};
};

export default useTeamManagementUsers;
