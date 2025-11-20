import { useMemo } from "react";
import { useConfirm } from "@/components/confirm";
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
	handleUserDelete: (teamUserId: number, name: string) => Promise<void>;
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

	const { confirm } = useConfirm();

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

	/**
	 *
	 */
	const handleUserDelete = async (teamUserId: number, name: string) => {
		const isProcess = await confirm({
			title: "정말 삭제하시겠습니까?",
			description: "삭제 시, 해당 팀에 대한 접근 권한이 사라집니다.",
		});

		if (!isProcess) {
			return;
		}

		try {
			const res = await apiClient.DELETE(
				"/api/v1/teams/team-users/{teamUserId}",
				{
					params: {
						path: {
							teamUserId,
						},
					},
				},
			);

			if (!res.data?.isSuccess) {
				throw new Error("User delete failed");
			}

			notify.info(`${name}님을 삭제했습니다.`);
			refetch();
		} catch {
			notify.error("유저 삭제에 실패했습니다.");
		}
	};

	return {
		makers,
		players,
		handleListOrderChange,
		handleRoleUpdate,
		handleUserDelete,
		isLoading: isPending,
	};
};

export default useTeamManagementUsers;
