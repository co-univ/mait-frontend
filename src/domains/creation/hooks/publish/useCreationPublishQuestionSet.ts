import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "@/components/Toast";
import { MANAGEMENT_ROUTE_PATH } from "@/domains/management/management.routes";
import useQuestionSets from "@/hooks/useQuestionSets";
import useTeams from "@/hooks/useTeams";
import { apiClient, apiHooks } from "@/libs/api";
import type {
	ApiResponseQuestionSetApiResponse,
	QuestionSetCategoryApiResponse,
	QuestionSetSolveMode,
	QuestionSetVisibility,
} from "@/libs/types";
import {
	type CreationPublishQuestionSetState,
	creationPublishQuestionSetReducer,
	getCreationPublishQuestionInitialState,
} from "../../reducers/publish/CreationPublishQuestionSetReducer";

//
//
//

interface UseCreationPublishQuestionSetProps {
	questionSetId: number;
}

interface UseCreationPublishQuestionSetReturn {
	questionSet: CreationPublishQuestionSetState;
	data: ApiResponseQuestionSetApiResponse | undefined;
	disabledPublishQuestionSet: boolean;
	handleTitleChange: (title: string) => void;
	handleVisibilityChange: (visibility: QuestionSetVisibility) => void;
	handleModeChange: (solveMode: QuestionSetSolveMode) => void;
	handleDifficultyChange: (difficulty: string) => void;
	handleCategoryAdd: (category: QuestionSetCategoryApiResponse) => Promise<void>;
	handleCategoryRemove: (categoryId: number) => Promise<void>;
	handlePublishButtonClick: () => Promise<void>;
}

//
//
//

const useCreationPublishQuestionSet = ({
	questionSetId,
}: UseCreationPublishQuestionSetProps): UseCreationPublishQuestionSetReturn => {
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const { activeTeam } = useTeams();

	const [questionSet, dispatch] = useReducer(
		creationPublishQuestionSetReducer,
		activeTeam?.teamType,
		getCreationPublishQuestionInitialState,
	);

	const { data } = apiHooks.useQuery(
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

	const { invalidateQuestionSetsQuery: invalidateMakingQuery } =
		useQuestionSets({
			teamId: activeTeam?.teamId ?? 0,
			mode: "MAKING",
		});

	const { invalidateQuestionSetsQuery: invalidateLiveTimeQuery } =
		useQuestionSets({
			teamId: activeTeam?.teamId ?? 0,
			mode: "LIVE_TIME",
		});

	const disabledPublishQuestionSet = !questionSet.title;

	/**
	 *
	 */
	const handleTitleChange = (title: string) => {
		dispatch({ type: "SET_TITLE", payload: title });
	};

	/**
	 *
	 */
	const handleVisibilityChange = (visibility: QuestionSetVisibility) => {
		dispatch({ type: "SET_VISIBILITY", payload: visibility });
	};

	/**
	 *
	 */
	const handleModeChange = (solveMode: QuestionSetSolveMode) => {
		dispatch({ type: "SET_MODE", payload: solveMode });
	};

	/**
	 *
	 */
	const handleDifficultyChange = (difficulty: string) => {
		dispatch({ type: "SET_DIFFICULTY", payload: difficulty });
	};

	/**
	 *
	 */
	const handleCategoryAdd = async (category: QuestionSetCategoryApiResponse) => {
		dispatch({ type: "ADD_CATEGORIES", payload: category });
	};

	/**
	 *
	 */
	const handleCategoryRemove = async (categoryId: number) => {
		dispatch({ type: "REMOVE_CATEGORY", payload: categoryId });
	};

	/**
	 *
	 */
	const handlePublishButtonClick = async () => {
		try {
			await apiClient.PUT("/api/v1/question-sets/{questionSetId}", {
				params: {
					path: {
						questionSetId,
					},
				},
				body: {
					title: questionSet.title,
					difficulty: questionSet.difficulty,
					visibility: questionSet.visibility,
					solveMode: questionSet.solveMode,
					categoryIds: questionSet.categories.map((category) => category.id),
				},
			});

			notify.success("문제 셋을 생성했습니다.");

			invalidateMakingQuery();
			invalidateLiveTimeQuery();
			queryClient.invalidateQueries({
				queryKey: apiHooks.queryOptions(
					"get",
					"/api/v1/question-sets/{questionSetId}",
					{
						params: {
							path: {
								questionSetId,
							},
						},
					},
				).queryKey,
			});

			navigate(
				`${MANAGEMENT_ROUTE_PATH.ROOT}?mode=${
					{ LIVE_TIME: "live-time", STUDY: "study" }[questionSet.solveMode]
				}`,
			);
		} catch {
			notify.error("문제 셋 생성에 실패했습니다.");
		}
	};

	//
	//
	//
	useEffect(() => {
		if (data?.data) {
			const { title, difficulty, categories } = data.data;

			dispatch({ type: "SET_TITLE", payload: title ?? "" });
			dispatch({ type: "SET_DIFFICULTY", payload: difficulty ?? "" });
			dispatch({
				type: "SET_MODE",
				payload: activeTeam?.teamType === "PERSONAL" ? "STUDY" : "LIVE_TIME",
			});
			dispatch({
				type: "SET_CATEGORIES",
				payload: (categories ?? [])
					.filter((category) => category.id != null && category.name != null)
					.map((category) => ({
						id: category.id as number,
						teamId: category.teamId ?? 0,
						name: category.name as string,
					})),
			});
		}
	}, [data?.data, activeTeam?.teamType]);

	return {
		questionSet,
		data,
		disabledPublishQuestionSet,
		handleTitleChange,
		handleVisibilityChange,
		handleModeChange,
		handleDifficultyChange,
		handleCategoryAdd,
		handleCategoryRemove,
		handlePublishButtonClick,
	};
};

export default useCreationPublishQuestionSet;
