import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { notify } from "@/components/Toast";
import { MANAGEMENT_ROUTE_PATH } from "@/domains/management/management.routes";
import { apiHooks } from "@/libs/api";
import type { QuestionSetSolveMode } from "@/libs/types";
import useActiveTeamIdStore from "@/stores/useActiveTeamIdStore";
import useRecentQuestionSetTabStore from "@/stores/useRecentQuestionSetTabStore";

//
//
//

interface CopyQuestionSetParams {
	questionSetId: number;
	targetTeamId: number;
	title: string;
	solveMode: QuestionSetSolveMode;
}

//
//
//

/**
 * Copies a question set into the target team and moves the user to that team's
 * 문제 생성(제작 중) tab.
 */
const useCopyQuestionSet = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { setActiveTeamId } = useActiveTeamIdStore();
	const { setRecentTab } = useRecentQuestionSetTabStore();

	const { mutateAsync: copyQuestionSetMutateAsync, isPending: isCopying } =
		apiHooks.useMutation("post", "/api/v1/question-sets/{questionSetId}/copy");

	/**
	 *
	 */
	const invalidateQuestionSetsQuery = () => {
		queryClient.invalidateQueries({
			predicate: (query) =>
				Array.isArray(query.queryKey) &&
				[
					"/api/v1/question-sets",
					"/api/v1/question-sets/study/management",
					"/api/v1/question-sets/study/progress",
				].some((path) => query.queryKey.includes(path)),
		});
	};

	/**
	 *
	 */
	const copyQuestionSet = async ({
		questionSetId,
		targetTeamId,
		title,
		solveMode,
	}: CopyQuestionSetParams) => {
		if (isCopying) {
			return;
		}

		try {
			const res = await copyQuestionSetMutateAsync({
				params: {
					path: {
						questionSetId,
					},
				},
				body: {
					targetTeamId,
					title: title.trim(),
					solveMode,
				},
			});

			if (!res.isSuccess || !res.data) {
				throw new Error("Failed to copy question set");
			}

			const copied = res.data;

			invalidateQuestionSetsQuery();

			setActiveTeamId(copied.teamId);
			setRecentTab("making");

			notify.success("문제 셋이 복제되었습니다.");

			navigate(`${MANAGEMENT_ROUTE_PATH.ROOT}?mode=making`, {
				state: {
					copiedQuestionSetId: copied.questionSetId,
				},
			});
		} catch {
			notify.error("문제 셋 복제에 실패했습니다.");
		}
	};

	return {
		isCopying,
		copyQuestionSet,
	};
};

export default useCopyQuestionSet;
