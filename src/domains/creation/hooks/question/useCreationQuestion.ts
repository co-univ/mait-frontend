import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import type { QuestionResponseType } from "@/domains/creation/creation.constant";
import useCreationQuestionsStore from "@/domains/creation/stores/question/useCreationQuestionsStore";
import CreationQuestionConvertQuestionType from "@/domains/creation/utils/question/creation-question-convert-question-type";
import creationQuestionResponseToUpdate from "@/domains/creation/utils/question/creation-question-response-to-update";
import { apiClient, apiHooks } from "@/libs/api";
import type { QuestionType } from "@/libs/types";
import { creationQuestionFindNumber } from "../../utils/question/creation-question-find-number";

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
	handleImageChange: (imageUrl?: string) => void;
	handleImageAdd: (file: File | null) => Promise<void>;
	handleUpdateQuestion: () => void;
	handleDeleteQuestion: (deleteQuestionId: number) => void;
	isUpdating: boolean;
	isDeleting: boolean;
	isUploadingImage: boolean;
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

	const [isUploadingImage, setIsUploadingImage] = useState(false);

	const { mutate: mutatePut, isPending: isUpdating } = apiHooks.useMutation(
		"put",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			onSuccess: (response) => {
				notify.success(
					`${creationQuestionFindNumber(questions, response.data?.id ?? 0)}번 문제가 저장되었습니다.`,
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

				navigate(
					`/creation/question-set/${questionSetId}/question/${response.data?.id}`,
				);
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
	const handleImageChange = (imageUrl?: string) => {
		if (question) {
			editQuestion({ ...question, imageUrl });
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

		if (!targetQuestion) {
			return;
		}

		if (!targetQuestion.isEditing) {
			const questionNumber = creationQuestionFindNumber(questions, questionId);
			notify.success(`${questionNumber}번 문제가 저장되었습니다.`);

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
	const handleImageAdd = async (file: File | null) => {
		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append("image", file);

		setIsUploadingImage(true);

		try {
			const res = await apiClient.POST(
				"/api/v1/question-sets/{questionSetId}/questions/{questionId}/images",
				{
					params: {
						path: {
							questionSetId,
							questionId,
						},
					},
					body: formData as unknown as { image: string },
					bodySerializer: (body) => body as unknown as FormData,
				},
			);

			const imageUrl = res.data?.data?.imageUrl;

			if (imageUrl) {
				handleImageChange(imageUrl);
			}
		} catch {
			notify.error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsUploadingImage(false);
		}
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
		handleImageChange,
		handleImageAdd,
		handleTypeChange,
		handleUpdateQuestion,
		handleDeleteQuestion,
		isUpdating,
		isDeleting,
		isUploadingImage,
	};
};

export default useCreationQuestion;
