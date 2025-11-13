import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "@/components/Toast";
import type {
	QuestionResponseType,
	QuestionResponseTypeWithIsEditing,
} from "@/domains/creation/creation.constant";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import { apiHooks } from "@/libs/api";

//
//
//

interface UseQuestionsProps {
	questionSetId: number;
}

interface UseQuestionsReturn {
	questions: QuestionResponseTypeWithIsEditing[];
	handleAddQuestion: () => void;
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
	const teamId = useParams().teamId;

	const { questions, initQuestions } = useCreationQuestionsStore();

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
					`/creation/question/team/${teamId}/question-set/${questionSetId}/question/${newQuestion.id}`,
					{ replace: true },
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
		handleAddQuestion,
		isLoading: isPending,
		isAdding,
		error,
	};
};

export default useCreationQuestions;
