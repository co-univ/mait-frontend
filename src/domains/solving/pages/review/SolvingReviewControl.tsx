import { ChevronDown, ChevronRight, ChevronUp, Puzzle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import QuestionNavigation, {
	QuestionNavigationButton,
} from "@/components/question-navigation";
import type { QuestionNavigationButtonRenderProps } from "@/components/question-navigation/QuestionNavigationList";
import { createPath } from "@/utils/create-path";
import SolvingBadge from "../../components/common/SolvingBadge";
import SolvingButton from "../../components/common/SolvingButton";
import { SOLVING_ROUTE_PATH } from "../../solving.routes";

//
//
//

interface SolvingReviewControlProps {
	isSubmitted: boolean;
	isCorrect: boolean | null;
	isExplanationShown: boolean;
	questionSetId: number;
	questionId: number;
	number?: number;
	questions?: QuestionResponseType[];
	handleAnswersSubmit: () => void;
	showExplanation: () => void;
	hideExplanation: () => void;
}

//
//
//

const SolvingReviewControl = ({
	isSubmitted,
	isCorrect,
	isExplanationShown,
	questionSetId,
	questionId,
	number,
	questions,
	handleAnswersSubmit,
	showExplanation,
	hideExplanation,
}: SolvingReviewControlProps) => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleQuestionNavigationClick = (questionId: number) => {
		navigate(
			createPath(SOLVING_ROUTE_PATH.REVIEW, {
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
	const getBadgeColor = () => {
		if (!isSubmitted) {
			return "primary";
		}

		return isCorrect ? "success" : "point";
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
		<div className="flex flex-col gap-gap-11">
			<QuestionNavigation
				orientation="horizontal"
				activeQuestionId={questionId}
				questions={questions ?? []}
				renderQuestionNavigationButton={renderQuestionNavigationButton}
			/>
			<div className="flex justify-between items-center">
				<SolvingBadge
					color={getBadgeColor()}
					icon={<Puzzle />}
					lable={`Q${number ?? ""}`}
				/>
				<div className="flex gap-gap-5">
					{!isExplanationShown && (
						<SolvingButton
							color={getBadgeColor()}
							icon={<ChevronDown />}
							lable="해설보기"
							onClick={showExplanation}
						/>
					)}
					{isExplanationShown && (
						<SolvingButton
							color={getBadgeColor()}
							icon={<ChevronUp />}
							lable="해설닫기"
							onClick={hideExplanation}
						/>
					)}
					{!isSubmitted && (
						<SolvingButton
							color={getBadgeColor()}
							icon={<ChevronRight />}
							lable="제출하기"
							onClick={handleAnswersSubmit}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default SolvingReviewControl;
