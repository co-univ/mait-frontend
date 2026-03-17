import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "@/components/Toast";
import { MANAGEMENT_ROUTE_PATH } from "@/domains/management/management.routes";
import useQuestionSets from "@/hooks/useQuestionSets";
import useTeams from "@/hooks/useTeams";
import { apiHooks } from "@/libs/api";
import type { QuestionSetApiResponse } from "@/libs/types";
import { createPath } from "@/utils/create-path";

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
	const navigate = useNavigate();

	const { activeTeam } = useTeams();

	const { invalidateQuestionSetsQuery } = useQuestionSets({
		teamId: activeTeam?.teamId ?? 0,
		mode: "LIVE_TIME",
	});

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

				invalidateQuestionSetsQuery();
				refetch();

				navigate(
					createPath(
						MANAGEMENT_ROUTE_PATH.ROOT,
						{
							questionSetId,
						},
						{
							mode: "live-time",
						},
					),
				);
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

	//
	// TODO: Combine question set data fetching logic
	// biome-ignore lint/correctness/useExhaustiveDependencies: refetch on mount only
	useEffect(() => {
		refetch();
	}, []);

	return {
		questionSet,
		handleQuestionSetStart,
		handleQuestionSetEnd,
	};
};

export default useControlSolvingQuestionSet;
