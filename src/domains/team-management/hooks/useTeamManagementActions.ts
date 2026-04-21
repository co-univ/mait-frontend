import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/components/confirm/ConfirmContext";
import { notify } from "@/components/Toast";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";

//
//
//

interface UseTeamManagementActionsReturn {
	handleLeave: () => void;
	handleDelete: () => void;
}

//
//
//

const useTeamManagementActions = (): UseTeamManagementActionsReturn => {
	const navigate = useNavigate();
	const { activeTeam, refetch } = useTeams();
	const { confirm } = useConfirm();

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

	return { handleLeave, handleDelete };
};

export default useTeamManagementActions;
