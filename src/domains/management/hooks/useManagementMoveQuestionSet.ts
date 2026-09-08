import { useQueryClient } from "@tanstack/react-query";
import { useConfirm } from "@/components/confirm/ConfirmContext";
import { notify } from "@/components/Toast";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import type { QuestionSetDto, QuestionSetSolveMode } from "@/libs/types";

//
//
//

interface UseManagementMoveQuestionSetParams {
	questionSet: QuestionSetDto;
	mode: QuestionSetSolveMode;
}

//
//
//

const useManagementMoveQuestionSet = ({
	questionSet,
	mode,
}: UseManagementMoveQuestionSetParams) => {
	const queryClient = useQueryClient();
	const { activeTeam, isMakerOrAbove } = useTeams();
	const { confirm } = useConfirm();

	const canMoveQuestionSet =
		!!questionSet.id &&
		!!activeTeam &&
		(questionSet.teamId == null || questionSet.teamId === activeTeam.teamId) &&
		(activeTeam.teamType === "PERSONAL" || isMakerOrAbove);

	const modeLabels: Record<QuestionSetSolveMode, string> = {
		LIVE_TIME: "실시간모드",
		STUDY: "학습모드",
	};

	/**
	 *
	 */
	const getAvailableMoveModes = (): QuestionSetSolveMode[] => {
		if (!canMoveQuestionSet) {
			return [];
		}

		if (questionSet.status === "BEFORE") {
			return [mode === "LIVE_TIME" ? "STUDY" : "LIVE_TIME"];
		}

		return [];
	};

	const availableMoveModes = getAvailableMoveModes();

	/**
	 *
	 */
	const invalidateQuestionSetsQuery = () => {
		queryClient.invalidateQueries({
			predicate: (query) =>
				Array.isArray(query.queryKey) &&
				[
					"/api/v1/question-sets",
					"/api/v1/question-sets/study/management",
					"/api/v1/question-sets/study/progress",
				].some((path) => query.queryKey.includes(path)),
		});
	};

	const { mutate: changeSolveMode, isPending: isMoving } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/{questionSetId}/solve-mode",
		{
			onSuccess: (_res, variables) => {
				const targetMode = variables.body.solveMode;

				invalidateQuestionSetsQuery();
				queryClient.invalidateQueries({
					queryKey: apiHooks.queryOptions(
						"get",
						"/api/v1/question-sets/{questionSetId}",
						{
							params: {
								path: { questionSetId: questionSet.id ?? 0 },
							},
						},
					).queryKey,
				});
				notify.success(`문제 셋이 ${modeLabels[targetMode]}로 이동되었습니다.`);
			},
			onError: () => {
				invalidateQuestionSetsQuery();
				notify.error("문제 셋 이동에 실패했습니다.");
			},
		},
	);

	/**
	 *
	 */
	const handleMoveButtonClick = async (targetMode: QuestionSetSolveMode) => {
		if (!availableMoveModes.includes(targetMode) || isMoving) {
			return;
		}

		const confirmed = await confirm({
			title: `문제셋을 ${modeLabels[targetMode]}로 이동합니다.`,
			description: "이동 후에는 해당 모드의 목록에서 확인하실 수 있습니다.",
		});

		if (!confirmed) {
			return;
		}

		changeSolveMode({
			params: {
				path: { questionSetId: questionSet.id ?? 0 },
			},
			body: {
				solveMode: targetMode,
			},
		});
	};

	return {
		availableMoveModes,
		isMoving,
		handleMoveButtonClick,
	};
};

export default useManagementMoveQuestionSet;
