import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type {
	QuestionResponseType,
	QuestionUpdateType,
} from "@/domains/creation/creation.constant";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import { apiHooks } from "@/libs/api";

//
//
//

interface UseQuestionProps {
	questionSetId: number;
	questionId: number;
}

interface UseQuestionReturn {
	question?: QuestionResponseType;
	handleContentChange: (content: string) => void;
	updateQuestion: () => void;
	isUpdating: boolean;
}

//
//
//

const useCreationQuestion = ({
	questionSetId,
	questionId,
}: UseQuestionProps): UseQuestionReturn => {
	const { questions, editQuestion } = useCreationQuestionsStore();
	const queryClient = useQueryClient();

	const { mutate, isPending: isUpdating } = apiHooks.useMutation(
		"put",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			onSuccess: () => {
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
		},
	);

	const question = questions.find((q) => q.id === questionId);

	/**
	 *
	 */
	const handleContentChange = (content: string) => {
		if (question) {
			editQuestion({ ...question, content });
		}
	};

	/**
	 *
	 */
	const updateQuestion = () => {
		const currentQuestions = useCreationQuestionsStore.getState().questions;
		const targetQuestion = currentQuestions.find((q) => q.id === questionId);

		if (!targetQuestion || !targetQuestion.isEditing) {
			return;
		}

		mutate({
			params: {
				path: {
					questionSetId,
					questionId: targetQuestion.id,
				},
			},
			body: targetQuestion as unknown as QuestionUpdateType,
		});
	};

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: updateQuestion call only questionId change
	useEffect(() => {
		return () => {
			updateQuestion();
		};
	}, [questionId]);

	return {
		question,
		handleContentChange,
		updateQuestion,
		isUpdating,
	};
};

export default useCreationQuestion;
