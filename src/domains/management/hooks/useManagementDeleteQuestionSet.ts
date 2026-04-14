import { notify } from "@/components/Toast";
import { apiHooks } from "@/libs/api";
import type { DeliveryMode } from "@/libs/types";

//
//
//

interface UseManagementDeleteQuestionSetParams {
	questionSetId: number;
	invalidateQuestionSetsQuery?: (params?: {
		teamId?: number;
		mode?: DeliveryMode;
	}) => void;
}

//
//
//

const useManagementDeleteQuestionSet = ({
	questionSetId,
	invalidateQuestionSetsQuery,
}: UseManagementDeleteQuestionSetParams) => {
	const { mutate: deleteQuestionSet } = apiHooks.useMutation(
		"delete",
		"/api/v1/question-sets/{questionSetId}",
		{
			onSuccess: () => {
				notify.success("문제 셋이 삭제되었습니다.");
				invalidateQuestionSetsQuery?.();
			},
			onError: () => {
				notify.error("문제 셋 삭제에 실패했습니다.");
			},
		},
	);

	/**
	 *
	 */
	const handleDeleteButtonClick = () => {
		deleteQuestionSet({
			params: {
				path: {
					questionSetId,
				},
			},
		});
	};

	return { handleDeleteButtonClick };
};

export default useManagementDeleteQuestionSet;
