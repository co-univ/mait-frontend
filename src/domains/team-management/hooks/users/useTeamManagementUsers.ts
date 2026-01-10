import { useMemo } from "react";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import { apiClient, apiHooks } from "@/libs/api";
import type {
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

			refetchTeamUsers();
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
		handleListOrderChange,
		handleRoleUpdate,
		handleUserDelete,
		handleApproveUser,
		handleRejectUser,
		isLoading: isPending,
	};
};

export default useTeamManagementUsers;
