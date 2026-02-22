import { useNavigate } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import { apiHooks } from "@/libs/api";
import type {
	QuestionSetApiResponse,
	QuestionValidationApiResponse,
} from "@/libs/types";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";
import { creationQuestionFindNumber } from "../../utils/question/creation-question-find-number";

//
//
//

interface UseCreationQuestionSetProps {
	questionSetId: number;
}

interface UseCreationQuestionSetReturn {
	questionSet?: QuestionSetApiResponse;
	questions?: QuestionResponseType[];
	invalidQuestions?: QuestionValidationApiResponse[];
	addQuestion: () => void;
	deleteQuestion: (params: {
		currentQuestionId: number;
		targetQuestionId: number;
	}) => void;
	validateQuestions: () => Promise<boolean>;
	refetchQuestionSet: () => void;
	refetchQuestions: () => void;
	isQuestionSetLoading: boolean;
	isQuestionsLoading: boolean;
	isAddingQuestion: boolean;
	isDeletingQuestion: boolean;
	isValidatingQuestions: boolean;
}

//
//
//

const useCreationQuestionSet = ({
	questionSetId,
}: UseCreationQuestionSetProps): UseCreationQuestionSetReturn => {
	const {
		data: questionSetData,
		isPending: isQuestionSetLoading,
		refetch: refetchQuestionSet,
	} = apiHooks.useQuery("get", "/api/v1/question-sets/{questionSetId}", {
		params: {
			path: {
				questionSetId,
			},
		},
	});

	const {
		data: questionsData,
		isPending: isQuestionsLoading,
		refetch: refetchQuestions,
	} = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions",
		{
			params: {
				path: {
					questionSetId,
				},
				query: {
					mode: "MAKING",
				},
			},
		},
	);

	const {
		data: invalidQuestionsData,
		isPending: isValidatingQuestions,
		refetch: refetchValidatingQuestions,
	} = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/validate",
		{
			params: {
				query: {
					questionSetId,
				},
			},
		},
		{
			enabled: false,
		},
	);

	const { mutate: postQuestionMutate, isPending: isPostingQuestion } =
		apiHooks.useMutation(
			"post",
			"/api/v1/question-sets/{questionSetId}/questions/default",
		);

	const { mutate: deleteQuestionMutate, isPending: isDeletingQuestion } =
		apiHooks.useMutation(
			"delete",
			"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		);

	const navigate = useNavigate();

	const { confirm } = useConfirm();

	const questionSet = questionSetData?.data;
	const questions = questionsData?.data;
	const invalidQuestions = invalidQuestionsData?.data;

	/**
	 *
	 */
	const addQuestion = () => {
		if (questions && questions.length >= 20) {
			notify.warn("문제는 최대 20개까지 추가할 수 있습니다.");

			return;
		}

		postQuestionMutate(
			{
				params: {
					path: {
						questionSetId,
					},
				},
			},
			{
				onSuccess: (data) => {
					notify.success("문제가 추가되었습니다.");

					refetchQuestions();

					const addedQuestionId = data.data?.id ?? 0;

					navigate(
						createPath(CREATION_ROUTE_PATH.QUESTION, {
							questionSetId,
							questionId: addedQuestionId,
						}),
						{
							replace: true,
						},
					);
				},
				onError: () => {
					notify.error("문제 추가에 실패했습니다.");
				},
			},
		);
	};

	/**
	 *
	 */
	const deleteQuestion = async ({
		currentQuestionId,
		targetQuestionId,
	}: {
		currentQuestionId: number;
		targetQuestionId: number;
	}) => {
		if (questions && questions.length <= 1) {
			notify.warn("문제는 최소 1개 이상이어야 합니다.");

			return;
		}

		const confirmed = await confirm({
			title: "문제 삭제",
			description: "삭제된 문제는 복구할 수 없습니다.",
			confirmText: "삭제",
			cancelText: "취소",
		});

		if (!confirmed) {
			return;
		}

		const targetQuestionNumber = creationQuestionFindNumber(
			questions || [],
			targetQuestionId,
		);

		deleteQuestionMutate(
			{
				params: {
					path: {
						questionSetId,
						questionId: targetQuestionId,
					},
				},
			},
			{
				onSuccess: () => {
					notify.success(`${targetQuestionNumber}번 문제가 삭제되었습니다.`);

					refetchQuestions();

					if (currentQuestionId === targetQuestionId) {
						let navigateToQuestionId: number | undefined;

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
								{
									replace: true,
								},
							);
						} else {
							throw new Error(
								"Could not determine question to navigate to after deletion",
							);
						}
					}
				},
				onError: () => {
					notify.error(
						`${targetQuestionNumber}번 문제 삭제에 실패했습니다. 다시 시도해주세요.`,
					);
				},
			},
		);
	};

	/**
	 *
	 */
	const validateQuestions = async () => {
		const refetchResult = await refetchValidatingQuestions();

		if (!refetchResult.data?.isSuccess) {
			notify.error("문제 유효성 검사에 실패했습니다. 다시 시도해주세요.");

			return false;
		}

		if (refetchResult.data.data?.length && refetchResult.data.data.length > 0) {
			notify.warn("유효하지 않은 문제가 있습니다. 확인해주세요.");

			return false;
		}

		return true;
	};

	return {
		questionSet,
		questions,
		invalidQuestions,
		addQuestion,
		deleteQuestion,
		validateQuestions,
		refetchQuestionSet,
		refetchQuestions,
		isQuestionSetLoading,
		isQuestionsLoading,
		isAddingQuestion: isPostingQuestion,
		isDeletingQuestion,
		isValidatingQuestions,
	};
};

export default useCreationQuestionSet;
