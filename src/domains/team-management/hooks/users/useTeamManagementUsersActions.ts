import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/components/confirm/ConfirmContext";
import { notify } from "@/components/Toast";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import type { TeamApiResponse } from "@/libs/types";

//
//
//

interface UseTeamManagementActionsReturn {
	isTeamNameEditing: boolean;
	changedTeamName: string;
	editTeamName: () => void;
	cancelEditTeamName: () => void;
	handleTeamNameChange: (newTeamName: string) => void;
	submitChangedTeamName: () => void;
	handleLeave: () => void;
	handleDelete: () => void;
}

//
//
//

const useTeamManagementUsersActions = (): UseTeamManagementActionsReturn => {
	const [isTeamNameEditing, setIsTeamNameEditing] = useState(false);
	const [changedTeamName, setChangedTeamName] = useState("");

	const navigate = useNavigate();
	const { activeTeam, refetch } = useTeams();
	const { confirm } = useConfirm();

	const queryClient = useQueryClient();

	const teamsQueryKey = apiHooks.queryOptions(
		"get",
		"/api/v1/teams/joined",
		{},
	).queryKey;

	const { mutate: patchTeamNameMutate } = apiHooks.useMutation(
		"patch",
		"/api/v1/teams/{teamId}/name",
	);

	const { mutate: leaveTeam } = apiHooks.useMutation(
		"delete",
		"/api/v1/teams/{teamId}/users/me",
		{
			onSuccess: () => {
				notify.success("팀에서 탈퇴했습니다.");
				refetch();
				navigate("/");
			},
			onError: () => {
				notify.error("탈퇴에 실패했습니다.");
			},
		},
	);

	const { mutate: deleteTeam } = apiHooks.useMutation(
		"delete",
		"/api/v1/teams/{teamId}",
		{
			onSuccess: () => {
				notify.success("팀이 삭제되었습니다.");
				refetch();
				navigate("/");
			},
			onError: () => {
				notify.error("팀 삭제에 실패했습니다.");
			},
		},
	);

	/**
	 *
	 */
	const editTeamName = () => {
		setIsTeamNameEditing(true);
	};

	/**
	 *
	 */
	const cancelEditTeamName = () => {
		setChangedTeamName(activeTeam?.teamName ?? "");
		setIsTeamNameEditing(false);
	};

	/**
	 *
	 */
	const handleTeamNameChange = (newTeamName: string) => {
		setChangedTeamName(newTeamName);
	};

	/**
	 *
	 */
	const submitChangedTeamName = () => {
		if (!activeTeam?.teamId) {
			return;
		}

		const teamId = activeTeam.teamId;

		queryClient.cancelQueries({ queryKey: teamsQueryKey });

		const previousData = queryClient.getQueryData<{
			data?: TeamApiResponse[];
		}>(teamsQueryKey);

		queryClient.setQueryData<{
			data?: TeamApiResponse[];
		}>(teamsQueryKey, (prev) => {
			if (!prev?.data) {
				return prev;
			}

			return {
				...prev,
				data: prev.data.map((team) =>
					team.teamId === teamId
						? { ...team, teamName: changedTeamName }
						: team,
				),
			};
		});

		setIsTeamNameEditing(false);

		patchTeamNameMutate(
			{
				params: { path: { teamId } },
				body: { name: changedTeamName },
			},
			{
				onSuccess: () => {
					notify.success("팀 이름이 변경되었습니다.");
				},
				onError: () => {
					notify.error("팀 이름 변경에 실패했습니다.");
					queryClient.setQueryData(teamsQueryKey, previousData);
				},
			},
		);
	};

	/**
	 *
	 */
	const handleLeave = async () => {
		if (!activeTeam?.teamId) {
			return;
		}

		const confirmed = await confirm({
			title: "정말 탈퇴하시겠습니까?",
			description:
				"탈퇴 시 해당 팀에 대한 접근 권한이 사라지며, 복구가 불가합니다.",
		});

		if (confirmed) {
			leaveTeam({ params: { path: { teamId: activeTeam.teamId } } });
		}
	};

	/**
	 *
	 */
	const handleDelete = async () => {
		if (!activeTeam?.teamId) {
			return;
		}

		const confirmed = await confirm({
			title: "정말 삭제하시겠습니까?",
			description:
				"삭제 시 해당 팀에 대한 접근 권한이 사라지며, 복구가 불가합니다.",
		});

		if (confirmed) {
			deleteTeam({ params: { path: { teamId: activeTeam.teamId } } });
		}
	};

	//
	useEffect(() => {
		if (activeTeam) {
			setChangedTeamName(activeTeam.teamName);
		}
	}, [activeTeam]);

	return {
		isTeamNameEditing,
		changedTeamName,
		editTeamName,
		cancelEditTeamName,
		handleTeamNameChange,
		submitChangedTeamName,
		handleLeave,
		handleDelete,
	};
};

export default useTeamManagementUsersActions;
