import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import { apiHooks } from "@/libs/api";
import type { QuestionType } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";
import useCreationQuestionsStore from "../../stores/question/_useCreationQuestionStore";
import creationQuestionConvertResponseToUpdate from "../../utils/question/creation-question-convert-response-to-update";
import { creationQuestionFindNumber } from "../../utils/question/creation-question-find-number";
import useCreationQuestions from "./_useCreationQuestions";

//
//
//

export interface UseCreationQuestionProps {
	questionSetId: number;
	questionId: number;
}

export type UseCreationQuestionReturn<
	TData extends QuestionResponseType = QuestionResponseType,
> = {
	question?: TData;
	setQuestion: (question: TData) => void;
	changeQuestionContent: (content: string) => void;
	changeQuestionExplanation: (explanation: string) => void;
	changeQuestionType: (type: QuestionType) => void;
	addQuestionImage: (file: File | null) => void;
	deleteQuestionImage: () => void;
	saveQuestion: () => void;
	deleteQuestion: () => void;
	isQuestionLoading: boolean;
	isImageUploading: boolean;
	isSavingQuestion: boolean;
	isDeletingQuestion: boolean;
};

//
//
//

const useCreationQuestion = <
	TData extends QuestionResponseType = QuestionResponseType,
>({
	questionSetId,
	questionId,
}: UseCreationQuestionProps): UseCreationQuestionReturn<TData> => {
	const {
		getQuestion,
		setQuestion: storeSetQuestion,
		resetStore,
	} = useCreationQuestionsStore();

	const { questions, refetchQuestions } = useCreationQuestions({
		questionSetId,
	});

	const { data: questionData, isPending: isQuestionLoading } =
		apiHooks.useQuery(
			"get",
			"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
			{
				params: {
					path: {
						questionSetId,
						questionId,
					},
					query: {
						mode: "MAKING",
					},
				},
			},
		);

	const { mutate: postQuestionImageMutate, isPending: isPostingQuestionImage } =
		apiHooks.useMutation(
			"post",
			"/api/v1/question-sets/{questionSetId}/questions/images",
		);

	const { mutate: putQuestionMutate, isPending: isPuttingQuestion } =
		apiHooks.useMutation(
			"put",
			"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		);

	const { mutate: deleteQuestionMutate, isPending: isDeletingQuestion } =
		apiHooks.useMutation(
			"delete",
			"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		);

	const question = getQuestion(questionId) as TData | undefined;

	const { confirm } = useConfirm();

	const navigate = useNavigate();

	/**
	 * Setters for question fields in the store
	 */
	const setQuestion = useCallback(
		(question: TData) => {
			storeSetQuestion(questionId, question);
		},
		[questionId, storeSetQuestion],
	);

	/**
	 * Change question content in the store
	 */
	const changeQuestionContent = (content: string) => {
		if (!question) {
			return;
		}

		setQuestion({
			...question,
			content,
		});
	};

	/**
	 * Change question explanation in the store
	 */
	const changeQuestionExplanation = (explanation: string) => {
		if (!question) {
			return;
		}

		setQuestion({
			...question,
			explanation,
		});
	};

	/**
	 * Change question type in the store
	 */
	const changeQuestionType = (type: QuestionType) => {
		if (!question) {
			return;
		}

		setQuestion({
			...question,
			type,
		});
	};

	/**
	 * Add an image to the question by uploading it to the server and updating the store with the returned image URL and ID
	 */
	const addQuestionImage = (file: File | null) => {
		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append("image", file);

		postQuestionImageMutate(
			{
				params: {
					path: {
						questionSetId,
					},
				},
				body: formData as unknown as { image: string },
				bodySerializer: (body) => body as unknown as FormData,
			},
			{
				onSuccess: (data) => {
					const imageUrl = data.data?.imageUrl;
					const imageId = data.data?.id;

					if (imageUrl && imageId && question) {
						setQuestion({
							...question,
							imageId,
							imageUrl,
						});
					}
				},
				onError: () => {
					notify.error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
				},
			},
		);
	};

	/**
	 * Delete the question's image by clearing the image URL and ID from the store
	 */
	const deleteQuestionImage = () => {
		if (!question) {
			return;
		}

		setQuestion({
			...question,
			imageId: undefined,
			imageUrl: undefined,
		});
	};

	/**
	 * Save the question by sending the updated question data to the server and refetching the questions list on success
	 */
	const saveQuestion = () => {
		if (!question) {
			return;
		}

		putQuestionMutate(
			{
				params: {
					path: {
						questionSetId,
						questionId,
					},
				},
				body: creationQuestionConvertResponseToUpdate(question),
			},
			{
				onSuccess: (data) => {
					notify.success("문제가 저장되었습니다.");

					const updatedQuestion = data.data;
					const updatedQuestionId = updatedQuestion?.id ?? 0;

					refetchQuestions();
					setQuestion(updatedQuestion as TData);

					if (updatedQuestionId !== questionId) {
						navigate(
							createPath(CREATION_ROUTE_PATH.QUESTION, {
								questionSetId,
								questionId: updatedQuestionId,
							}),
						);
					}
				},
			},
		);
	};

	/**
	 * Delete the question after user confirmation
	 */
	const deleteQuestion = async () => {
		if (questions && questions.length <= 1) {
			notify.warn("문제는 최소 1개 이상이어야 합니다.");

			return;
		}

		const targetQuestionNumber = creationQuestionFindNumber(
			questions || [],
			questionId,
		);

		const confirmed = await confirm({
			title: `${targetQuestionNumber}번 문제 삭제`,
			description: "삭제된 문제는 복구할 수 없습니다.",
			confirmText: "삭제",
			cancelText: "취소",
		});

		if (!confirmed) {
			return;
		}

		deleteQuestionMutate(
			{
				params: {
					path: {
						questionSetId,
						questionId,
					},
				},
			},
			{
				onSuccess: () => {
					notify.success(`${targetQuestionNumber}번 문제가 삭제되었습니다.`);

					let navigateToQuestionId: number | undefined;

					// Determine which question to navigate to after deletion
					// If the first question is deleted, navigate to the next question
					// If the last question is deleted, navigate to the previous question
					// Otherwise, navigate to the next question (which will shift up to the deleted question's position)
					if (targetQuestionNumber === 1) {
						navigateToQuestionId = questions?.[1]?.id;
					} else if (targetQuestionNumber === questions?.length) {
						navigateToQuestionId = questions?.[targetQuestionNumber - 2]?.id;
					} else {
						navigateToQuestionId = questions?.[targetQuestionNumber]?.id;
					}

					if (navigateToQuestionId) {
						navigate(
							createPath(CREATION_ROUTE_PATH.QUESTION, {
								questionSetId,
								questionId: navigateToQuestionId,
							}),
						);
					} else {
						throw new Error(
							"Could not determine question to navigate to after deletion",
						);
					}

					refetchQuestions();
				},
				onError: () => {
					notify.error(
						`${targetQuestionNumber}번 문제 삭제에 실패했습니다. 다시 시도해주세요.`,
					);
				},
			},
		);
	};

	//
	// Sync fetched question data into the store
	//
	useEffect(() => {
		if (questionData?.data) {
			setQuestion(questionData.data as TData);
		}
	}, [questionData?.data, setQuestion]);

	//
	// Reset the store when the component unmounts to clear question data in the store
	//
	useEffect(() => {
		return () => resetStore();
	}, [resetStore]);

	return {
		question,
		setQuestion,
		changeQuestionContent,
		changeQuestionExplanation,
		changeQuestionType,
		addQuestionImage,
		deleteQuestionImage,
		saveQuestion,
		deleteQuestion,
		isQuestionLoading,
		isImageUploading: isPostingQuestionImage,
		isSavingQuestion: isPuttingQuestion,
		isDeletingQuestion,
	};
};

export default useCreationQuestion;
