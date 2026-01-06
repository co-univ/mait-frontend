import { ChevronRight, PencilLine } from "lucide-react";
import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { notify } from "@/components/Toast";
import { MANAGEMENT_ROUTE_PATH } from "@/domains/management/management.routes";
import useQuestionSets from "@/hooks/useQuestionSets";
import useTeams from "@/hooks/useTeams";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import { apiClient, apiHooks } from "@/libs/api";
import type { DeliveryMode, QuestionSetVisibility } from "@/libs/types";
import {
	CREATION_PUBLISH_QUESTION_INITIAL_STATE,
	creationPublishQuestionSetReducer,
} from "../../reducers/publish/CreationPublishQuestionSetReducer";
import CreationPublishLeftPanel from "./CreationPublishLeftPanel";
import CreationPublishRightPanel from "./CreationPublishRightPanel";

//
//
//

const CreationPublish = () => {
	const questionSetId = Number(useParams().questionSetId);

	const navigate = useNavigate();

	const { activeTeam } = useTeams();

	const [questionSet, dispatch] = useReducer(
		creationPublishQuestionSetReducer,
		CREATION_PUBLISH_QUESTION_INITIAL_STATE,
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

	const disabledPublishQuestionSet = [
		!questionSet.title,
		!questionSet.subject,
	].some(Boolean);

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
	const handleModeChange = (mode: DeliveryMode) => {
		dispatch({ type: "SET_MODE", payload: mode });
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
	const handleSubjectChange = (subject: string) => {
		dispatch({ type: "SET_SUBJECT", payload: subject });
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
				body: questionSet,
			});

			notify.success("문제 셋을 생성했습니다.");

			invalidateMakingQuery();
			invalidateLiveTimeQuery();

			navigate(MANAGEMENT_ROUTE_PATH.ROOT);
		} catch {
			notify.error("문제 셋 생성에 실패했습니다.");
		}
	};

	//
	//
	//
	useEffect(() => {
		if (data?.data) {
			const { subject, difficulty } = data.data;

			dispatch({ type: "SET_SUBJECT", payload: subject ?? "" });
			dispatch({
				type: "SET_DIFFICULTY",
				payload: difficulty ?? "",
			});
		}
	}, [data?.data]);

	return (
		<LabeledPageLayout
			icon={<PencilLine />}
			label="문제 셋 생성"
			rightContent={
				<Button
					disabled={disabledPublishQuestionSet}
					icon={<ChevronRight />}
					item="문제 만들기"
					onClick={handlePublishButtonClick}
					className="flex-row-reverse bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall border-none disabled:bg-color-gray-5 disabled:text-color-gray-20"
				/>
			}
		>
			<div className="flex flex-col gap-gap-11">
				<div className="flex gap-gap-5 w-full">
					<CreationPublishLeftPanel
						title={questionSet.title}
						visibility={questionSet.visibility ?? "PUBLIC"}
						mode={questionSet.mode ?? "LIVE_TIME"}
						onChangeTitle={handleTitleChange}
						onChangeVisibility={handleVisibilityChange}
						onChangeMode={handleModeChange}
					/>
					<CreationPublishRightPanel
						creationType={data?.data?.creationType}
						difficulty={questionSet.difficulty}
						subject={questionSet.subject}
						onChangeDifficulty={handleDifficultyChange}
						onChangeSubject={handleSubjectChange}
					/>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default CreationPublish;
