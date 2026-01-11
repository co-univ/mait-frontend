import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import { apiClient, apiHooks } from "@/libs/api";
import type {
	ApiResponseListJoinedTeamUserApiResponse,
	ApplyTeamUserApiResponse,
	JoinedTeamUserApiResponse,
} from "@/libs/types";

//
//
//

interface UseTeamManagementUsersProps {
	teamId: number;
}

interface UseTeamManagementUsersReturn {
	owners?: JoinedTeamUserApiResponse[];
	makers?: JoinedTeamUserApiResponse[];
	players?: JoinedTeamUserApiResponse[];
	applicants?: ApplyTeamUserApiResponse[];

	handleRoleUpdate: (
		teamUserId: number,
		role: "MAKER" | "PLAYER",
	) => Promise<void>;
	handleUserDelete: (teamUserId: number, name: string) => Promise<void>;
	handleApproveUser: (
		applicationId: number,
		name: string,
		nickname: string,
	) => Promise<void>;
	handleRejectUser: (
		applicationId: number,
		name: string,
		nickname: string,
	) => Promise<void>;
	isLoading: boolean;
}

//
//
//

const useTeamManagementUsers = ({
	teamId,
}: UseTeamManagementUsersProps): UseTeamManagementUsersReturn => {
	const queryClient = useQueryClient();

	const teamUserDataQueryKey = apiHooks.queryOptions(
		"get",
		"/api/v1/teams/{teamId}/users",
		{
			params: {
				path: {
					teamId,
				},
			},
		},
	).queryKey;

	const {
		data: teamUsersData,
		isPending,
		refetch: refetchTeamUsers,
	} = apiHooks.useQuery("get", "/api/v1/teams/{teamId}/users", {
		params: {
			path: {
				teamId,
			},
		},
	});

	const { data: applicantsData, refetch: refetchApplicants } =
		apiHooks.useQuery("get", "/api/v1/teams/{teamId}/applicants", {
			params: {
				path: { teamId },
			},
		});

	const { mutate: patchUserRole } = apiHooks.useMutation(
		"patch",
		"/api/v1/teams/team-users/{teamUserId}/role",
		{
			onMutate: async (variables) => {
				const updatedTeamUserId = variables.params.path.teamUserId;
				const updatedRole = variables.body.role;

				await queryClient.cancelQueries({
					queryKey: teamUserDataQueryKey,
				});

				const previousData =
					queryClient.getQueryData<ApiResponseListJoinedTeamUserApiResponse>(
						teamUserDataQueryKey,
					);

				queryClient.setQueryData<ApiResponseListJoinedTeamUserApiResponse>(
					teamUserDataQueryKey,
					(updater) => {
						if (!updater?.data) {
							return updater;
						}

						const oldUsers = updater.data.map((user) => {
							if (user.teamUserId === updatedTeamUserId) {
								return {
									...user,
									role: updatedRole,
								};
							}

							return user;
						});

						return {
							...updater,
							data: oldUsers,
						};
					},
				);

				return { previousData };
			},

			onSuccess: () => {
				notify.success("유저 역할이 변경되었습니다.");
			},

			onError: (_error, _variables, context) => {
				notify.error("유저 역할 변경에 실패했습니다.");

				const { previousData } = context as {
					previousData: ApiResponseListJoinedTeamUserApiResponse | undefined;
				};

				if (previousData) {
					queryClient.setQueryData(teamUserDataQueryKey, previousData);
				}
			},

			onSettled: () => {
				queryClient.invalidateQueries({
					queryKey: teamUserDataQueryKey,
				});
			},
		},
	);

	const { mutate: postApplicantUserStatus } = apiHooks.useMutation(
		"post",
		"/api/v1/teams/{teamId}/applicant/{applicationId}",
		{
			onSuccess: (_data, variables) => {
				const status = variables.body.status;

				if (status === "APPROVED") {
					notify.success("승인이 완료되었습니다.");
				} else if (status === "REJECTED") {
					notify.success("가입 요청을 거절 처리했습니다.");
				}

				refetchTeamUsers();
				refetchApplicants();
			},
			onError: (_error, variables) => {
				const status = variables.body.status;

				if (status === "APPROVED") {
					notify.error("승인 처리 중 문제가 발생했습니다.");
				} else if (status === "REJECTED") {
					notify.error("거절 처리 중 오류가 발생했습니다.");
				}

				refetchTeamUsers();
				refetchApplicants();
			},
		},
	);

	const owners = useMemo(
		() => teamUsersData?.data?.filter((user) => user.role === "OWNER"),
		[teamUsersData],
	);

	const makers = useMemo(
		() => teamUsersData?.data?.filter((user) => user.role === "MAKER"),
		[teamUsersData],
	);

	const players = useMemo(
		() => teamUsersData?.data?.filter((user) => user.role === "PLAYER"),
		[teamUsersData],
	);

	const applicants = applicantsData?.data;

	const { confirm } = useConfirm();

	/**
	 *
	 */
	const handleRoleUpdate = async (
		teamUserId: number,
		role: "MAKER" | "PLAYER",
	) => {
		patchUserRole({
			params: {
				path: {
					teamUserId,
				},
			},
			body: { role },
		});
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
			refetchTeamUsers();
		} catch {
			notify.error("유저 삭제에 실패했습니다.");
		}
	};

	/**
	 *
	 */
	const handleApproveUser = async (
		applicationId: number,
		name: string,
		nickname: string,
	) => {
		const result = await confirm({
			title: "사용자 승인",
			description: `${name}(${nickname})님을 팀원으로 승인하시겠습니까?`,
		});

		if (!result) {
			return;
		}

		postApplicantUserStatus({
			params: {
				path: {
					teamId,
					applicationId,
				},
			},
			body: { status: "APPROVED" },
		});
	};

	/**
	 *
	 */
	const handleRejectUser = async (
		applicationId: number,
		name: string,
		nickname: string,
	) => {
		const result = await confirm({
			title: "사용자 거절",
			description: `${name}(${nickname})님의 가입 요청을 거절하시겠습니까?`,
		});

		if (!result) {
			return;
		}

		postApplicantUserStatus({
			params: {
				path: {
					teamId,
					applicationId,
				},
			},
			body: { status: "REJECTED" },
		});
	};

	return {
		owners,
		makers,
		players,
		applicants,
		handleRoleUpdate,
		handleUserDelete,
		handleApproveUser,
		handleRejectUser,
		isLoading: isPending,
	};
};

export default useTeamManagementUsers;
