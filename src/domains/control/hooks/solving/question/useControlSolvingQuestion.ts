import { useCallback, useEffect } from "react";
import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import type { QuestionUpdatePayload } from "@/domains/control/control.constant";
import { apiClient, apiHooks } from "@/libs/api";
import type { UpdateQuestionStatusApiRequest } from "@/libs/types";

//
//
//

type UseControlSolvingQuestionProps = {
	questionSetId: number;
	questionId: number;
	refetchInterval?: number;
};

type UseControlSolvingQuestionReturn = {
	question?: QuestionResponseType;
	questionUpdatedAt: number;
	refetchQuestion: () => void;
	handleAnswerAdd: (payload: QuestionUpdatePayload) => Promise<boolean>;
	handleAccessOpen: () => void;
	handleAccessClose: () => void;
	handleSolveOpen: () => void;
	handleSolveClose: () => void;
	isLoading: boolean;
	isStatusUpdating: boolean;
};

//
//
//

const useControlSolvingQuestion = ({
	questionSetId,
	questionId,
	refetchInterval,
}: UseControlSolvingQuestionProps): UseControlSolvingQuestionReturn => {
	const { data: questionSetData } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const { data, isPending, refetch, dataUpdatedAt } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			params: {
				path: { questionSetId, questionId },
				query: {
					mode: "MAKING",
				},
			},
		},
		{
			refetchInterval,
		},
	);

	const { mutate: updateStatus, isPending: isStatusUpdating } =
		apiHooks.useMutation(
			"patch",
			"/api/v1/question-sets/{questionSetId}/questions/{questionId}/status",
			{
				onSuccess: () => {
					refetch();
				},
			},
		);

	const question = data?.data;

	/**
	 *
	 */
	const handleAnswerAdd = useCallback(
		async (payload: QuestionUpdatePayload) => {
			try {
				const res = await apiClient.POST(
					"/api/v1/question-sets/{questionSetId}/questions/{questionId}/answers",
					{
						params: {
							path: { questionSetId, questionId },
						},
						body: {
							payload,
						},
					},
				);

				if (!res.data?.isSuccess) {
					throw new Error("Failed to update answer");
				}

				notify.success("정답이 수정됨에 따라 재채점 되었습니다.");

				return true;
			} catch {
				notify.error("정답 수정에 실패했습니다.");

				return false;
			}
		},
		[questionSetId, questionId],
	);

	/**
	 *
	 */
	const handleStatusUpdate = (
		status: UpdateQuestionStatusApiRequest["statusType"],
	) => {
		if (isStatusUpdating) {
			return;
		}

		if (questionSetData?.data?.ongoingStatus === "BEFORE") {
			notify.warn("문제 시작 후 문제 공개 및 제출 허용이 가능합니다.");

			return;
		}

		updateStatus({
			params: {
				path: {
					questionSetId,
					questionId,
				},
			},
			body: {
				statusType: status,
			},
		});
	};

	/**
	 *
	 */
	const handleAccessOpen = () => {
		handleStatusUpdate("ACCESS_PERMISSION");
	};

	/**
	 *
	 */
	const handleAccessClose = () => {
		handleStatusUpdate("NOT_OPEN");
	};

	/**
	 *
	 */
	const handleSolveOpen = () => {
		if (question?.questionStatusType === "NOT_OPEN") {
			notify.warn("문제 시작 후 문제 공개 및 제출 허용이 가능합니다.");

			return;
		}

		handleStatusUpdate("SOLVE_PERMISSION");
	};

	/**
	 *
	 */
	const handleSolveClose = () => {
		handleStatusUpdate("ACCESS_PERMISSION");
	};

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: fetch on questionId change
	useEffect(() => {
		refetch();
	}, [questionId, refetch]);

	return {
		question,
		questionUpdatedAt: dataUpdatedAt,
		refetchQuestion: () => refetch(),
		handleAnswerAdd,
		handleAccessOpen,
		handleAccessClose,
		handleSolveOpen,
		handleSolveClose,
		isLoading: isPending,
		isStatusUpdating,
	};
};

export default useControlSolvingQuestion;
