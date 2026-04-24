import { useNavigate, useParams } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import QuestionNavigation, {
	QuestionNavigationButton,
} from "@/components/question-navigation";
import type { QuestionNavigationButtonRenderProps } from "@/components/question-navigation/QuestionNavigationList";
import useControlSolvingQuestions from "@/domains/control/hooks/solving/question/useControlSolvingQuestions";
import { createPath } from "@/utils/create-path";

//
//
//

interface ControlSolvingQuestionNavigationProps {
	routePath: string;
}

//
//
//

const ControlSolvingQuestionNavigation = ({
	routePath,
}: ControlSolvingQuestionNavigationProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { questions } = useControlSolvingQuestions({ questionSetId });

	const navigate = useNavigate();

	/**
	 *
	 */
	const handleQuestionNavigationClick = (targetQuestionId: number) => {
		navigate(
			createPath(routePath, {
				questionSetId,
				questionId: targetQuestionId,
			}),
			{ replace: true },
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
		<QuestionNavigation
			orientation="horizontal"
			activeQuestionId={questionId}
			questions={questions ?? []}
			renderQuestionNavigationButton={renderQuestionNavigationButton}
		/>
	);
};

export default ControlSolvingQuestionNavigation;
