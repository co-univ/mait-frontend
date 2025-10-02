import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import type { QuestionResponseType } from "@/domains/creation/creation.constant";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import CreationQuestionConvertQuestionType from "@/domains/creation/utils/question/creation-question-convert-question-type";
import creationQuestionResponseToUpdate from "@/domains/creation/utils/question/creation-question-response-to-update";
import { apiHooks } from "@/libs/api";
import type { QuestionType } from "@/libs/types";

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
	handleExplanationChange: (explanation: string) => void;
	handleTypeChange: (type: QuestionType) => void;
	handleUpdateQuestion: () => void;
	handleDeleteQuestion: (deleteQuestionId: number) => void;
	isUpdating: boolean;
	isDeleting: boolean;
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

	const navigate = useNavigate();

	const { confirm } = useConfirm();

	const { mutate: mutatePut, isPending: isUpdating } = apiHooks.useMutation(
		"put",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			onSuccess: (response) => {
				notify.success(`${response.data?.number}번 문제가 저장되었습니다.`);

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
				notify.error("문제 저장에 실패했습니다. 다시 시도해주세요.");
			},
		},
	);

	const { mutate: mutateDelete, isPending: isDeleting } = apiHooks.useMutation(
		"delete",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			onSuccess: (_, request) => {
				const deleteQuestionId = request.params.path.questionId;

				notify.success("문제가 삭제되었습니다.");

				queryClient.invalidateQueries({
					queryKey: apiHooks.queryOptions(
						"get",
						"/api/v1/question-sets/{questionSetId}/questions",
						{
							params: { path: { questionSetId } },
						},
					).queryKey,
				});

				if (deleteQuestionId !== questionId) {
					return;
				}

				const currentIndex = questions.findIndex(
					(q) => q.id === deleteQuestionId,
				);
				let targetQuestionId: number | null = null;

				if (currentIndex > 0) {
					targetQuestionId = questions[currentIndex - 1].id;
				} else if (currentIndex === 0 && questions.length > 1) {
					targetQuestionId = questions[1].id;
				}

				if (targetQuestionId) {
					navigate(
						`/creation/question-set/${questionSetId}/question/${targetQuestionId}`,
					);
				}
			},

			onError: () => {
				notify.error("문제 삭제에 실패했습니다. 다시 시도해주세요.");
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
	const handleExplanationChange = (explanation: string) => {
		if (question) {
			editQuestion({ ...question, explanation });
		}
	};

	/**
	 *
	 */
	const handleTypeChange = (type: QuestionType) => {
		if (question) {
			const convertedQuestion = CreationQuestionConvertQuestionType(
				question,
				type,
			);

			editQuestion(convertedQuestion);
		}
	};

	/**
	 *
	 */
	const handleUpdateQuestion = () => {
		const currentQuestions = useCreationQuestionsStore.getState().questions;
		const targetQuestion = currentQuestions.find((q) => q.id === questionId);

		if (!targetQuestion || !targetQuestion.isEditing) {
			return;
		}

		mutatePut({
			params: {
				path: {
					questionSetId,
					questionId: targetQuestion.id,
				},
			},
			body: creationQuestionResponseToUpdate(targetQuestion),
		});
	};

	/**
	 *
	 */
	const handleDeleteQuestion = (deleteQuestionId: number) => {
		if (questions.length === 1) {
			notify.error("문제는 최소 1개 이상 존재해야 합니다.");
			return;
		}

		const targetQuestion = questions.find((q) => q.id === deleteQuestionId);

		confirm(
			{
				title: "정말 삭제하시겠습니까?",
				description: `${targetQuestion?.number}번 문제를 삭제하실 경우, 원하시는 상태로 복구가 어렵습니다.`,
				cancelText: "취소",
				confirmText: "확인",
			},
			() => {
				mutateDelete({
					params: {
						path: {
							questionSetId,
							questionId: deleteQuestionId,
						},
					},
				});
			},
		);
	};

	return {
		question,
		handleContentChange,
		handleExplanationChange,
		handleTypeChange,
		handleUpdateQuestion,
		handleDeleteQuestion,
		isUpdating,
		isDeleting,
	};
};

export default useCreationQuestion;
