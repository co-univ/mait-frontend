import { useNavigate, useParams } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import QuestionNavigation, {
	QuestionNavigationButton,
} from "@/components/question-navigation";
import type { QuestionNavigationButtonRenderProps } from "@/components/question-navigation/QuestionNavigationList";
import type { QuestionSolveResultApiResponse } from "@/libs/types";
import { createPath } from "@/utils/create-path";
import { DASHBOARD_ROUTE_PATH } from "../../dashboard.routes";

//
//
//

interface DashboardQuestionNavigationProps {
	questions?: QuestionResponseType[];
	solveResults?: QuestionSolveResultApiResponse[];
}

//
//
//

const DashboardQuestionNavigation = ({
	questions = [],
	solveResults = [],
}: DashboardQuestionNavigationProps) => {
	const navigate = useNavigate();

	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	/**
	 *
	 */
	const handleQuestionNavigationClick = (clickedQuestionId: number) => {
		navigate(
			createPath(DASHBOARD_ROUTE_PATH.QUESTION, {
				questionSetId,
				questionId: clickedQuestionId,
			}),
			{
				replace: true,
			},
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
		const isCorrect =
			solveResults.find((result) => result.questionId === question.id)
				?.isCorrect ?? false;

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
					variant={isCorrect ? "success" : "point"}
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

export default DashboardQuestionNavigation;
