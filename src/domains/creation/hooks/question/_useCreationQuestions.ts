import { useNavigate } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import { apiHooks } from "@/libs/api";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";

//
//
//

interface UseCreationQuestionProps {
	questionSetId: number;
}

interface UseCreationQuestionReturn {
	questions?: QuestionResponseType[];
	questionsQueryKey: readonly unknown[];
	addQuestion: () => void;
	refetchQuestions: () => void;
	isQuestionsLoading: boolean;
	isAddingQuestion: boolean;
}

//
//
//

const useCreationQuestions = ({
	questionSetId,
}: UseCreationQuestionProps): UseCreationQuestionReturn => {
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

	const { mutate: postQuestionMutate, isPending: isPostingQuestion } =
		apiHooks.useMutation(
			"post",
			"/api/v1/question-sets/{questionSetId}/questions/default",
		);

	const questionsQueryKey = apiHooks.queryOptions(
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
	).queryKey;

	const navigate = useNavigate();

	const questions = questionsData?.data;

	/**
	 *
	 */
	const addQuestion = () => {
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
					);
				},
				onError: () => {
					notify.error("문제 추가에 실패했습니다.");
				},
			},
		);
	};

	return {
		questions,
		questionsQueryKey,
		addQuestion,
		refetchQuestions,
		isQuestionsLoading,
		isAddingQuestion: isPostingQuestion,
	};
};

export default useCreationQuestions;
