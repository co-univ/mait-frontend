import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import useControlQuestionSubmitAnswerStore from "@/domains/control/stores/question/useControlQuestionSubmitAnswerStore";
import { apiHooks } from "@/libs/api";
import type { UpdateQuestionStatusApiRequest } from "@/libs/types";

//
//
//

const QUESTION_POLLING_INTERVAL = 10000;

export interface UseControlSolvingQuestionProps {
	questionSetId: number;
	questionId: number;
}

export interface UseControlSolvingQuestionReturn<TData> {
	hasSubmitAnswerPayload: boolean;
	question?: TData;
	refetchQuestion: () => void;
	submitAnswer: () => Promise<boolean>;
	handleAccessOpen: () => void;
	handleAccessClose: () => void;
	handleSolveOpen: () => void;
	handleSolveClose: () => void;
	isLoading: boolean;
	isStatusUpdating: boolean;
}

//
//
//

const useControlSolvingQuestion = <
	TData extends QuestionResponseType = QuestionResponseType,
>({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionProps): UseControlSolvingQuestionReturn<TData> => {
	const { hasSubmitAnswerPayload, submitAnswerPayload } =
		useControlQuestionSubmitAnswerStore();

	const queryClient = useQueryClient();

	const { data: questionSetData, isPending: isQuestionSetLoading } =
		apiHooks.useQuery("get", "/api/v1/question-sets/{questionSetId}", {
			params: {
				path: {
					questionSetId,
				},
			},
		});

	const {
		data: questionData,
		isPending: isQuestionLoading,
		refetch,
	} = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			params: {
				path: { questionSetId, questionId },
				query: {
					mode: "MANAGING",
				},
			},
		},
		{
			refetchInterval:
				questionSetData?.data?.ongoingStatus === "ONGOING"
					? QUESTION_POLLING_INTERVAL
					: undefined,
		},
	);

	const questionSet = questionSetData?.data;
	const question = questionData?.data;

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

	const { mutateAsync: postAnswer } = apiHooks.useMutation(
		"post",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}/answers",
		{
			onSuccess: () => {
				notify.success("정답이 추가됨에 따라 재채점 되었습니다.");

				refetch();

				queryClient.invalidateQueries({
					queryKey: apiHooks.queryOptions(
						"get",
						"/api/v1/question-sets/{questionSetId}/questions/{questionId}/scorers",
						{
							params: {
								path: {
									questionSetId,
									questionId,
								},
							},
						},
					).queryKey,
				});

				queryClient.invalidateQueries({
					queryKey: apiHooks.queryOptions(
						"get",
						"/api/v1/question-sets/{questionSetId}/questions/{questionId}/submit-records",
						{
							params: {
								path: {
									questionSetId,
									questionId,
								},
							},
						},
					).queryKey,
				});
			},
			onError: () => {
				notify.error("정답 추가에 실패했습니다.");
			},
		},
	);

	/**
	 *
	 */
	const submitAnswer = async () => {
		const res = await postAnswer({
			params: {
				path: {
					questionSetId,
					questionId,
				},
			},
			body: {
				payload: submitAnswerPayload,
			},
		});

		return res.isSuccess ?? false;
	};

	/**
	 *
	 */
	const handleStatusUpdate = (
		status: UpdateQuestionStatusApiRequest["statusType"],
	) => {
		if (isStatusUpdating) {
			return;
		}

		if (questionSet?.ongoingStatus === "BEFORE") {
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
		hasSubmitAnswerPayload,
		question: question as TData | undefined,
		refetchQuestion: () => refetch(),
		submitAnswer,
		handleAccessOpen,
		handleAccessClose,
		handleSolveOpen,
		handleSolveClose,
		isLoading: isQuestionLoading || isQuestionSetLoading,
		isStatusUpdating,
	};
};

export default useControlSolvingQuestion;
