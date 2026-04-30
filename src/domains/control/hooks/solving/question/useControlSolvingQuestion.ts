import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import useControlQuestionSubmitAnswerStore from "@/domains/control/stores/question/useControlQuestionSubmitAnswerStore";
import { apiHooks } from "@/libs/api";

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
	isLoading: boolean;
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
				questionSetData?.data?.status === "ONGOING"
					? QUESTION_POLLING_INTERVAL
					: undefined,
		},
	);

	const question = questionData?.data;

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
		isLoading: isQuestionLoading || isQuestionSetLoading,
	};
};

export default useControlSolvingQuestion;
