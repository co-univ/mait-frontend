import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import isEqual from "react-fast-compare";
import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import { apiHooks } from "@/libs/api";
import type {
	ApiResponseQuestionApiResponse,
	QuestionType,
} from "@/libs/types";
import useCreationQuestionStore from "../../stores/question/useCreationQuestionStore";
import creationQuestionConvertResponseToUpdate from "../../utils/question/creation-question-convert-response-to-update";
import useCreationQuestionSet from "./useCreationQuestionSet";

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
	changeContent: (content: string) => void;
	changeExplanation: (explanation: string) => void;
	changeType: (type: QuestionType) => void;
	addImage: (file: File | null) => void;
	deleteImage: () => void;
	saveQuestion: () => Promise<ApiResponseQuestionApiResponse | undefined>;
	isDirty: boolean;
	isQuestionLoading: boolean;
	isImageUploading: boolean;
	isSavingQuestion: boolean;
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
		getUpdatedAt,
		setQuestion: storeSetQuestion,
	} = useCreationQuestionStore();

	const {
		refetchQuestions,
		updateQuestionSetTitle,
		isDirty: isQuestionSetDirty,
	} = useCreationQuestionSet({
		questionSetId,
	});

	const {
		data: questionData,
		isPending: isQuestionLoading,
		dataUpdatedAt: questionDataUpdatedAt,
	} = apiHooks.useQuery(
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

	const { mutateAsync: putQuestionMutateAsync, isPending: isPuttingQuestion } =
		apiHooks.useMutation(
			"put",
			"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		);

	const queryClient = useQueryClient();

	const question = getQuestion(questionId) as TData | undefined;

	/**
	 * Determines question is changed by comparing the fetched question data
	 */
	const isDirty = useMemo(() => {
		if (!questionData?.data || !question) {
			return false;
		}

		return (
			isQuestionSetDirty ||
			!isEqual(
				creationQuestionConvertResponseToUpdate(questionData.data),
				creationQuestionConvertResponseToUpdate(question),
			)
		);
	}, [isQuestionSetDirty, questionData?.data, question]);

	/**
	 * Setters for question fields in the store
	 */
	const setQuestion = useCallback(
		(question: TData) => {
			storeSetQuestion(questionId, question, questionDataUpdatedAt);
		},
		[questionId, storeSetQuestion, questionDataUpdatedAt],
	);

	/**
	 * Change question content in the store
	 */
	const changeContent = (content: string) => {
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
	const changeExplanation = (explanation: string) => {
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
	const changeType = (type: QuestionType) => {
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
	const addImage = (file: File | null) => {
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
	const deleteImage = () => {
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
	const saveQuestion = async () => {
		if (!question || !isDirty) {
			return;
		}

		updateQuestionSetTitle();

		return putQuestionMutateAsync(
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
					const updatedQuestion = data.data;
					const updatedQuestionId = updatedQuestion?.id ?? 0;

					refetchQuestions();
					storeSetQuestion(
						updatedQuestionId,
						updatedQuestion as TData,
						questionDataUpdatedAt,
					);
					queryClient.refetchQueries({
						queryKey: apiHooks.queryOptions(
							"get",
							"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
							{
								params: {
									path: {
										questionSetId,
										questionId: updatedQuestionId,
									},
									query: {
										mode: "MAKING",
									},
								},
							},
						).queryKey,
					});
				},
				onError: () => {
					notify.error("문제 저장에 실패했습니다. 다시 시도해주세요.");
				},
			},
		);
	};

	//
	// Sync fetched question data into the store
	//
	useEffect(() => {
		const storedQuestionUpdatedAt = getUpdatedAt(questionId);

		if (
			questionData?.data &&
			questionDataUpdatedAt !== storedQuestionUpdatedAt
		) {
			storeSetQuestion(
				questionId,
				questionData.data as TData,
				questionDataUpdatedAt,
			);
		}
	}, [
		questionId,
		questionData,
		questionDataUpdatedAt,
		getUpdatedAt,
		storeSetQuestion,
	]);

	return {
		question,
		setQuestion,
		changeContent,
		changeExplanation,
		changeType,
		addImage,
		deleteImage,
		saveQuestion,
		isDirty,
		isQuestionLoading,
		isImageUploading: isPostingQuestionImage,
		isSavingQuestion: isPuttingQuestion,
	};
};

export default useCreationQuestion;
