import { useCallback } from "react";
import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import type { QuestionUpdatePayload } from "@/domains/control/control.constant";
import { apiClient, apiHooks } from "@/libs/api";

//
//
//

type UseControlSolvingQuestionProps = {
	questionSetId: number;
	questionId: number;
};

type UseControlSolvingQuestionReturn = {
	question?: QuestionResponseType;
	questionUpdatedAt: number;
	handleAnswerAdd: (payload: QuestionUpdatePayload) => Promise<boolean>;
	refetchQuestion: () => void;
	isLoading: boolean;
};

//
//
//

const useControlSolvingQuestion = ({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionProps): UseControlSolvingQuestionReturn => {
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

				notify.success("정답이 수정되었습니다.");

				return true;
			} catch {
				notify.error("정답 수정에 실패했습니다.");

				return false;
			}
		},
		[questionSetId, questionId],
	);

	return {
		question,
		questionUpdatedAt: dataUpdatedAt,
		handleAnswerAdd,
		refetchQuestion: () => refetch(),
		isLoading: isPending,
	};
};

export default useControlSolvingQuestion;
