import { PencilLine } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import Button from "@/components/Button";
import QuestionNavigation, {
	QuestionNavigationButton,
} from "@/components/question-navigation";
import type { QuestionNavigationButtonRenderProps } from "@/components/question-navigation/QuestionNavigationList";
import LabeledPageLayout from "@/layouts/LabeledPageLayout";
import useControlSolvings from "../../hooks/solving/useControlSolvingQuestions";

//
//
//

const ControlSolving = () => {
	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questions } = useControlSolvings({ questionSetId });

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleQuestionNavigationClick = (questionId: number) => {
		navigate(
			`/control/solving/team/${teamId}/question-set/${questionSetId}/question/${questionId}`,
		);
	};

	/**
	 *
	 */
	const renderQuestionContrlButton = () => {
		return (
			<Button
				item="시작하기"
				className="border-none bg-color-primary-5 text-color-primary-50 !typo-heading-xsmall"
				onClick={() => alert("퀴리릭")}
			/>
		);
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
				ㅎㅇ
			</div>
		</LabeledPageLayout>
	);
};

export default ControlSolving;
