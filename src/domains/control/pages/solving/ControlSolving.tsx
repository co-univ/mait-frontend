import { PencilLine } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import Button from "@/components/Button";
import QuestionNavigation, {
	QuestionNavigationButton,
} from "@/components/question-navigation";
import type { QuestionNavigationButtonRenderProps } from "@/components/question-navigation/QuestionNavigationList";
import { notify } from "@/components/Toast";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import { apiClient, apiHooks } from "@/libs/api";
import { createPath } from "@/utils/create-path";
import { CONTROL_ROUTE_PATH } from "../../control.routes";
import useControlSolvingQuestion from "../../hooks/solving/question/useControlSolvingQuestion";
import useControlSolvingQuestions from "../../hooks/solving/question/useControlSolvingQuestions";
import ControlSolvingQuestion from "./question/ControlSolvingQuestion";
import ControlSolvingSubmission from "./submission/ControlSolvingSubmission";

//
//
//

const ControlSolving = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questions } = useControlSolvingQuestions({ questionSetId });
	const { question } = useControlSolvingQuestion({
		questionSetId,
		questionId,
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

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleQuestionNavigationClick = (questionId: number) => {
		navigate(
			createPath(CONTROL_ROUTE_PATH.SOLVING, {
				questionSetId,
				questionId,
			}),
			{
				replace: true,
			},
		);
	};

	/**
	 *
	 */
	const hanldeQuestionSetStart = async () => {
		try {
			const res = await apiClient.PATCH(
				"/api/v1/question-sets/{questionSetId}/live-status/start",
				{
					params: {
						path: {
							questionSetId,
						},
					},
				},
			);

			if (!res.data?.isSuccess) {
				throw new Error("Failed to start question set");
			}

			notify.success("문제 풀이가 시작되었습니다.");

			await refetch();
		} catch {
			notify.error("문제 시작에 실패했습니다.");
		}
	};

	/**
	 *
	 */
	const handleQuestionSetEnd = async () => {
		try {
			const res = await apiClient.PATCH(
				"/api/v1/question-sets/{questionSetId}/live-status/end",
				{
					params: {
						path: {
							questionSetId,
						},
					},
				},
			);

			if (!res.data?.isSuccess) {
				throw new Error("Failed to end question set");
			}

			notify.success("문제 풀이가 종료되었습니다.");

			await refetch();
		} catch {
			notify.error("문제 종료에 실패했습니다.");
		}
	};

	/**
	 *
	 */
	const renderQuestionContrlButton = () => {
		if (!questionSet) {
			return null;
		}

		const status = questionSet.ongoingStatus;

		switch (status) {
			case "BEFORE": {
				return (
					<Button
						item="시작하기"
						className="border-none bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall"
						onClick={hanldeQuestionSetStart}
					/>
				);
			}
			case "ONGOING": {
				return (
					<Button
						item="종료하기"
						className="border-none bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall"
						onClick={handleQuestionSetEnd}
					/>
				);
			}
			case "AFTER": {
				return null;
			}
		}
	};

	/**
	 *
	 */
	const renderQuestionNavigationButton = ({
		question,
		index,
		isActive,
		isMouseOver,
		onMouseEnter,
		onMouseLeave,
	}: QuestionNavigationButtonRenderProps<QuestionResponseType>) => {
		return (
			// biome-ignore lint/a11y/noStaticElementInteractions: div used for hover state
			<div
				className="relative"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<QuestionNavigationButton
					isActive={isActive}
					isMouseOver={isMouseOver}
					number={index + 1}
					onClick={() => handleQuestionNavigationClick(question.id)}
				/>
			</div>
		);
	};

	return (
		<LabeledPageLayout
			icon={<PencilLine />}
			label="문제 풀이 관리"
			rightContent={renderQuestionContrlButton()}
		>
			<div className="flex flex-col gap-gap-11">
				<QuestionNavigation
					orientation="horizontal"
					activeQuestionId={questionId}
					questions={questions ?? []}
					renderQuestionNavigationButton={renderQuestionNavigationButton}
				/>
				<div className="flex gap-gap-10 w-full">
					<div className="flex-[2] w-0">
						<ControlSolvingQuestion
							questionSetOngoingStatus={questionSet?.ongoingStatus}
						/>
					</div>
					<div className="flex-[3] min-w-0">
						<ControlSolvingSubmission
							questionStatusType={question?.questionStatusType}
						/>
					</div>
				</div>
			</div>
		</LabeledPageLayout>
	);
};

export default ControlSolving;
