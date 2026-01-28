import { notify } from "@/components/Toast";
import { apiHooks } from "@/libs/api";
import type { QuestionSetApiResponse } from "@/libs/types";

//
//
//

interface UseControlSolvingQuestionSetProps {
	questionSetId: number;
}

interface UseControlSolvingQuestionSetReturn {
	questionSet?: QuestionSetApiResponse;
	handleQuestionSetStart: () => void;
	handleQuestionSetEnd: () => void;
}

//
//
//

const useControlSolvingQuestionSet = ({
	questionSetId,
}: UseControlSolvingQuestionSetProps): UseControlSolvingQuestionSetReturn => {
	const { data, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}",
		{
			params: {
				path: {
					questionSetId,
				},
			},
		},
	);

	const questionSet = data?.data;

	const { mutate: patchQuestionSetStart } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/{questionSetId}/live-status/start",
		{
			onSuccess: () => {
				notify.success("문제 풀이가 시작되었습니다.");

				refetch();
			},
			onError: () => {
				notify.error("문제 풀이 시작에 실패했습니다.");
			},
		},
	);

	const { mutate: patchQuestionSetEnd } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/{questionSetId}/live-status/end",
		{
			onSuccess: () => {
				notify.success("문제 풀이가 종료되었습니다.");

				refetch();
			},
			onError: () => {
				notify.error("문제 풀이 종료에 실패했습니다.");
			},
		},
	);

	/**
	 *
	 */
	const handleQuestionSetStart = () => {
		patchQuestionSetStart({
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
	const handleQuestionSetEnd = () => {
		patchQuestionSetEnd({
			params: {
				path: {
					questionSetId,
				},
			},
		});
	};

	return {
		questionSet,
		handleQuestionSetStart,
		handleQuestionSetEnd,
	};
};

export default useControlSolvingQuestionSet;
