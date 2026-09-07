import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useConfirm } from "@/components/confirm/ConfirmContext";
import { notify } from "@/components/Toast";
import useTeams from "@/hooks/useTeams";
import { apiClient, apiHooks } from "@/libs/api";
import type {
	QuestionSetApiResponse,
	QuestionSetDto,
	QuestionSetSolveMode,
} from "@/libs/types";

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
	const { activeTeam } = useTeams();
	const { confirm } = useConfirm();
	const [isMoving, setIsMoving] = useState(false);

	const canMoveQuestionSet =
		!!questionSet.id &&
		!!activeTeam &&
		(questionSet.teamId == null || questionSet.teamId === activeTeam.teamId) &&
		(activeTeam.teamType === "PERSONAL" || activeTeam.role === "MAKER");

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

	/**
	 *
	 */
	const getQuestionSet = async (questionSetId: number) => {
		const res = await apiClient.GET("/api/v1/question-sets/{questionSetId}", {
			params: { path: { questionSetId } },
		});

		if (!res.data?.isSuccess || !res.data.data) {
			throw new Error("Failed to get question set");
		}

		return res.data.data;
	};

	/**
	 *
	 */
	const updateQuestionSetMode = async (
		questionSetData: QuestionSetApiResponse,
		solveMode: QuestionSetSolveMode,
	) => {
		const res = await apiClient.PUT("/api/v1/question-sets/{questionSetId}", {
			params: { path: { questionSetId: questionSetData.id } },
			body: {
				title: questionSetData.title,
				difficulty: questionSetData.difficulty,
				solveMode,
				categoryIds: questionSetData.categories
					.map((category) => category.id)
					.filter((id): id is number => id != null),
			},
		});

		if (!res.data?.isSuccess) {
			throw new Error("Failed to change question set mode");
		}
	};

	/**
	 *
	 */
	const handleMoveButtonClick = async (targetMode: QuestionSetSolveMode) => {
		if (!availableMoveModes.includes(targetMode) || isMoving) {
			return;
		}

		setIsMoving(true);

		try {
			const confirmed = await confirm({
				title: `문제셋을 ${modeLabels[targetMode]}로 이동합니다.`,
				description: "이동 후에는 해당 모드의 목록에서 확인하실 수 있습니다.",
			});

			if (!confirmed) {
				return;
			}

			const questionSetData = await getQuestionSet(questionSet.id ?? 0);

			if (
				questionSetData.status !== questionSet.status ||
				questionSetData.solveMode !== mode ||
				questionSetData.teamId !== activeTeam?.teamId
			) {
				invalidateQuestionSetsQuery();
				notify.error(
					"문제 셋 상태가 변경되었습니다. 목록을 다시 확인해 주세요.",
				);
				return;
			}

			await updateQuestionSetMode(questionSetData, targetMode);

			invalidateQuestionSetsQuery();
			queryClient.invalidateQueries({
				queryKey: apiHooks.queryOptions(
					"get",
					"/api/v1/question-sets/{questionSetId}",
					{
						params: { path: { questionSetId: questionSetData.id } },
					},
				).queryKey,
			});
			notify.success(`문제 셋이 ${modeLabels[targetMode]}로 이동되었습니다.`);
		} catch {
			notify.error("문제 셋 이동에 실패했습니다.");
		} finally {
			setIsMoving(false);
		}
	};

	return {
		availableMoveModes,
		isMoving,
		handleMoveButtonClick,
	};
};

export default useManagementMoveQuestionSet;
