import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import type { QuestionResponseTypeWithIsEditing } from "@/domains/creation/creation.constant";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import { apiClient, apiHooks } from "@/libs/api";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";

//
//
//

interface UseQuestionsProps {
	questionSetId: number;
}

interface UseQuestionsReturn {
	questions: QuestionResponseTypeWithIsEditing[];
	invalidQuestions: number[];
	handleAddQuestion: () => void;
	handleValidateQuestions: () => Promise<boolean>;
	isLoading: boolean;
	isAdding: boolean;
	error: Error | null;
}

//
//
//

const useCreationQuestions = ({
	questionSetId,
}: UseQuestionsProps): UseQuestionsReturn => {
	const { questions, invalidQuestions, initQuestions, setInvalidQuestions } =
		useCreationQuestionsStore();

	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const { data, isPending, error } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const { mutate: mutatePost, isPending: isAdding } = apiHooks.useMutation(
		"post",
		"/api/v1/question-sets/{questionSetId}/questions/default",
		{
			onSuccess: (response) => {
				const newQuestion = response.data as QuestionResponseType;

				notify.success(`${questions.length + 1}번 문제가 추가되었습니다.`);

				navigate(
					createPath(CREATION_ROUTE_PATH.QUESTION, {
						questionSetId,
						questionId: newQuestion.id,
					}),
					{
						replace: true,
					},
				);

				queryClient.invalidateQueries({
					queryKey: apiHooks.queryOptions(
						"get",
						"/api/v1/question-sets/{questionSetId}/questions",
						{
							params: { path: { questionSetId } },
						},
					).queryKey,
				});
			},

			onError: () => {
				notify.error("문제 추가에 실패했습니다. 다시 시도해주세요.");
			},
		},
	);

	/**
	 *
	 */
	const handleAddQuestion = () => {
		mutatePost({
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
	const handleValidateQuestions = async (): Promise<boolean> => {
		try {
			const res = await apiClient.GET("/api/v1/question-sets/validate", {
				params: {
					query: {
						questionSetId,
					},
				},
			});

			if (!res.data?.isSuccess) {
				throw new Error("Failed to validate questions");
			}

			if (res.data?.data) {
				const invalidQuestions = res.data.data.filter((q) => !q.isValid);

				setInvalidQuestions(invalidQuestions);

				return invalidQuestions.length === 0;
			}

			return true;
		} catch {
			notify.error("문제 유효성 검사에 실패했습니다. 다시 시도해주세요.");

			return false;
		}
	};

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: set function does not effect to the useEffect
	useEffect(() => {
		if (data?.data) {
			initQuestions(data.data);
		}
	}, [data]);

	return {
		questions,
		invalidQuestions: invalidQuestions?.map((q) => q.questionId) ?? [],
		handleAddQuestion,
		handleValidateQuestions,
		isLoading: isPending,
		isAdding,
		error,
	};
};

export default useCreationQuestions;
