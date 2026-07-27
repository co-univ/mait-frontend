import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/components/confirm/ConfirmContext";
import { notify } from "@/components/Toast";
import { DASHBOARD_ROUTE_PATH } from "@/domains/dashboard/dashboard.routes";
import useQuestionSets from "@/hooks/useQuestionSets";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import type { QuestionSetApiResponse } from "@/libs/types";
import { createPath } from "@/utils/create-path";

//
//
//

interface UseControlSolvingQuestionSetProps {
	questionSetId: number;
}

interface UseControlSolvingQuestionSetReturn {
	questionSet?: QuestionSetApiResponse;
	handleQuestionSetStart: () => void;
	handleQuestionSetEnd: (options?: { skipConfirm?: boolean }) => Promise<void>;
}

//
//
//

const useControlSolvingQuestionSet = ({
	questionSetId,
}: UseControlSolvingQuestionSetProps): UseControlSolvingQuestionSetReturn => {
	const navigate = useNavigate();
	const { confirm } = useConfirm();

	const { activeTeam } = useTeams();

	const { invalidateQuestionSetsQuery } = useQuestionSets({
		teamId: activeTeam?.teamId ?? 0,
		mode: "LIVE_TIME",
	});

	const { data, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
		{},
	);

	const questionSet = data?.data;

	const { mutate: patchQuestionSetStart } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/{questionSetId}/live-status/start",
		{
			onSuccess: () => {
				notify.success("문제 풀이가 시작되었습니다.");

				refetch();
			},
			onError: () => {
				notify.error("문제 풀이 시작에 실패했습니다.");
			},
		},
	);

	const { mutate: patchQuestionSetEnd } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/{questionSetId}/live-status/end",
		{
			onSuccess: () => {
				notify.success("문제 풀이가 종료되었습니다.");

				invalidateQuestionSetsQuery();
				refetch();

				navigate(
					createPath(DASHBOARD_ROUTE_PATH.QUESTION_ROOT, {
						questionSetId: questionSetId,
					}),
				);
			},
			onError: () => {
				notify.error("문제 풀이 종료에 실패했습니다.");
			},
		},
	);

	/**
	 *
	 */
	const handleQuestionSetStart = () => {
		patchQuestionSetStart({
			params: {
				path: {
					questionSetId,
				},
			},
		});
	};

	/**
	 *
	 */
	const handleQuestionSetEnd = async (options?: { skipConfirm?: boolean }) => {
		if (!options?.skipConfirm) {
			const confirmed = await confirm({
				title: "문제 셋 종료",
				description: "문제 셋을 종료하시겠습니까?",
			});

			if (!confirmed) {
				return;
			}
		}

		patchQuestionSetEnd({
			params: {
				path: {
					questionSetId,
				},
			},
		});
	};

	//
	// TODO: Combine question set data fetching logic
	// biome-ignore lint/correctness/useExhaustiveDependencies: refetch on mount only
	useEffect(() => {
		refetch();
	}, []);

	return {
		questionSet,
		handleQuestionSetStart,
		handleQuestionSetEnd,
	};
};

export default useControlSolvingQuestionSet;
