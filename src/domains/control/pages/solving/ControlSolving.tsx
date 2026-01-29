import { PencilLine } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import Button from "@/components/Button";
import QuestionNavigation, {
	QuestionNavigationButton,
} from "@/components/question-navigation";
import type { QuestionNavigationButtonRenderProps } from "@/components/question-navigation/QuestionNavigationList";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import { createPath } from "@/utils/create-path";
import { CONTROL_ROUTE_PATH } from "../../control.routes";
import useControlSolvingQuestion from "../../hooks/solving/question/useControlSolvingQuestion";
import useControlSolvingQuestions from "../../hooks/solving/question/useControlSolvingQuestions";
import useControlSolvingQuestionSet from "../../hooks/solving/useControlSolvingQuestionSet";
import ControlSolvingQuestion from "./question/ControlSolvingQuestion";
import ControlSolvingSubmission from "./submission/ControlSolvingSubmission";

//
//
//

const ControlSolving = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questionSet, handleQuestionSetStart, handleQuestionSetEnd } =
		useControlSolvingQuestionSet({ questionSetId });
	const { questions } = useControlSolvingQuestions({ questionSetId });
	const { question } = useControlSolvingQuestion({
		questionSetId,
		questionId,
	});

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
						onClick={handleQuestionSetStart}
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
						<ControlSolvingQuestion />
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
