import { ChevronRight, PencilLine } from "lucide-react";
import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/Button";
import { notify } from "@/components/Toast";
import useQuestionSets from "@/hooks/useQuestionSets";
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
	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);

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

	const navigate = useNavigate();

	const [questionSet, dispatch] = useReducer(
		creationPublishQuestionSetReducer,
		CREATION_PUBLISH_QUESTION_INITIAL_STATE,
	);

	const { invalidateQuestionSetsQuery: invalidateMakingQuery } =
		useQuestionSets({
			teamId,
			mode: "MAKING",
		});
	const { invalidateQuestionSetsQuery: invalidateLiveTimeQuery } =
		useQuestionSets({
			teamId,
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
	const handleLevelDescriptionChange = (levelDescription: string) => {
		dispatch({ type: "SET_LEVEL_DESCRIPTION", payload: levelDescription });
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
			const res = await apiClient.PUT("/api/v1/question-sets/{questionSetId}", {
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

			const teamId = res.data?.data?.teamId;

			navigate(`/management/team/${teamId}`);
		} catch {
			notify.error("문제 셋 생성에 실패했습니다.");
		}
	};

	//
	//
	//
	useEffect(() => {
		if (data?.data) {
			const { subject, levelDescription } = data.data;

			dispatch({ type: "SET_SUBJECT", payload: subject ?? "" });
			dispatch({
				type: "SET_LEVEL_DESCRIPTION",
				payload: levelDescription ?? "",
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
						levelDescription={questionSet.levelDescription}
						subject={questionSet.subject}
						onChangeLevelDescription={handleLevelDescriptionChange}
						onChangeSubject={handleSubjectChange}
					/>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default CreationPublish;
