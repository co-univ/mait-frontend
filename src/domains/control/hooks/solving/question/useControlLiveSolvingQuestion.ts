import type { QuestionResponseType } from "@/app.constants";
import { notify } from "@/components/Toast";
import { apiHooks } from "@/libs/api";
import type { UpdateQuestionStatusApiRequest } from "@/libs/types";
import useControlSolvingQuestion, {
	type UseControlSolvingQuestionProps,
	type UseControlSolvingQuestionReturn,
} from "./useControlSolvingQuestion";

//
//
//

export interface UseControlLiveSolvingQuestionReturn<TData>
	extends UseControlSolvingQuestionReturn<TData> {
	handleAccessOpen: () => void;
	handleAccessClose: () => void;
	handleSolveOpen: () => void;
	handleSolveClose: () => void;
	isStatusUpdating: boolean;
}

//
//
//

const useControlLiveSolvingQuestion = <
	TData extends QuestionResponseType = QuestionResponseType,
>({
	questionSetId,
	questionId,
}: UseControlSolvingQuestionProps): UseControlLiveSolvingQuestionReturn<TData> => {
	const base = useControlSolvingQuestion<TData>({ questionSetId, questionId });

	const { data: questionSetData } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}",
		{
			params: {
				path: { questionSetId },
			},
		},
	);

	const questionSet = questionSetData?.data;

	const { mutate: updateStatus, isPending: isStatusUpdating } =
		apiHooks.useMutation(
			"patch",
			"/api/v1/question-sets/{questionSetId}/questions/{questionId}/status",
			{
				onSuccess: () => {
					base.refetchQuestion();
				},
			},
		);

	/**
	 *
	 */
	const handleStatusUpdate = (
		status: UpdateQuestionStatusApiRequest["statusType"],
	) => {
		if (isStatusUpdating) {
			return;
		}

		if (questionSet?.status === "BEFORE") {
			notify.warn("문제 시작 후 문제 공개 및 제출 허용이 가능합니다.");

			return;
		}

		updateStatus({
			params: {
				path: { questionSetId, questionId },
			},
			body: {
				statusType: status,
			},
		});
	};

	/**
	 *
	 */
	const handleAccessOpen = () => {
		handleStatusUpdate("ACCESS_PERMISSION");
	};

	/**
	 *
	 */
	const handleAccessClose = () => {
		handleStatusUpdate("NOT_OPEN");
	};

	/**
	 *
	 */
	const handleSolveOpen = () => {
		if (base.question?.questionStatusType === "NOT_OPEN") {
			notify.warn("문제 시작 후 문제 공개 및 제출 허용이 가능합니다.");

			return;
		}

		handleStatusUpdate("SOLVE_PERMISSION");
	};

	/**
	 *
	 */
	const handleSolveClose = () => {
		handleStatusUpdate("ACCESS_PERMISSION");
	};

	return {
		...base,
		handleAccessOpen,
		handleAccessClose,
		handleSolveOpen,
		handleSolveClose,
		isStatusUpdating,
	};
};

export default useControlLiveSolvingQuestion;
