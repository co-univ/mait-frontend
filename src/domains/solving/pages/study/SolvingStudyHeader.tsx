import { ChevronRight, Puzzle } from "lucide-react";
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

interface SolvingStudyHeaderProps {
	questionSetId: number;
	questionId: number;
	number?: number;
	questions?: QuestionResponseType[];
	onQuestionNavigate?: (targetQuestionId: number) => void | Promise<void>;
}

//
//
//

const SolvingStudyHeader = ({
	questionSetId,
	questionId,
	number,
	questions,
	onQuestionNavigate,
}: SolvingStudyHeaderProps) => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleQuestionNavigationClick = async (targetQuestionId: number) => {
		await onQuestionNavigate?.(targetQuestionId);

		navigate(
			createPath(SOLVING_ROUTE_PATH.STUDY, {
				questionSetId,
				questionId: targetQuestionId,
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
					onClick={() => void handleQuestionNavigationClick(question.id)}
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
				<SolvingBadge color="primary" icon={<Puzzle />} lable={`Q${number ?? ""}`} />
				<div className="flex gap-gap-5">
					<SolvingButton
						disabled
						color="primary"
						icon={<ChevronRight />}
						lable="제출하기"
					/>
				</div>
			</div>
		</div>
	);
};

export default SolvingStudyHeader;
