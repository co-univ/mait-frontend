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
 *
 * The copy API only accepts `targetTeamId`, so the chosen title is applied with a
 * follow-up PATCH. The chosen solve mode is carried over in navigation state: the
 * only endpoint that persists `solveMode` is the PUT that also completes the set,
 * which would push the copy out of 제작 중 — so the mode is applied in the creation
 * publish step instead.
 */
const useCopyQuestionSet = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { setActiveTeamId } = useActiveTeamIdStore();
	const { setRecentTab } = useRecentQuestionSetTabStore();

	const { mutateAsync: copyQuestionSetMutateAsync, isPending: isCopying } =
		apiHooks.useMutation("post", "/api/v1/question-sets/{questionSetId}/copy");

	const { mutateAsync: patchQuestionSetTitle } = apiHooks.useMutation(
		"patch",
		"/api/v1/question-sets/{questionSetId}",
	);

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
	 * Applies the chosen title to the copy. The copy itself already succeeded at
	 * this point, so a failure here only warns instead of failing the whole flow.
	 */
	const applyTitle = async (questionSetId: number, title: string) => {
		try {
			const res = await patchQuestionSetTitle({
				params: {
					path: {
						questionSetId,
					},
				},
				body: {
					title,
				},
			});

			if (!res.isSuccess) {
				throw new Error("Failed to update copied question set title");
			}
		} catch {
			notify.warn(
				"문제 셋은 복제되었지만 제목 변경에 실패했습니다. 문제 생성에서 수정해주세요.",
			);
		}
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
				},
			});

			if (!res.isSuccess || !res.data) {
				throw new Error("Failed to copy question set");
			}

			const copied = res.data;
			const trimmedTitle = title.trim();

			if (trimmedTitle && trimmedTitle !== copied.title) {
				await applyTitle(copied.questionSetId, trimmedTitle);
			}

			invalidateQuestionSetsQuery();

			setActiveTeamId(copied.teamId);
			setRecentTab("making");

			notify.success("문제 셋이 복제되었습니다.");

			navigate(`${MANAGEMENT_ROUTE_PATH.ROOT}?mode=making`, {
				state: {
					copiedQuestionSetId: copied.questionSetId,
					solveMode,
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
