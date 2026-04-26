import clsx from "clsx";
import { ChevronRight, Puzzle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { QuestionResponseType } from "@/app.constants";
import QuestionNavigation, {
} from "@/components/question-navigation";
import type { QuestionNavigationButtonRenderProps } from "@/components/question-navigation/QuestionNavigationList";
import useBreakpoint from "@/hooks/useBreakpoint";
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
	answeredQuestionIds?: number[];
	isGraded?: boolean;
	isCorrectMap?: Record<number, boolean | null>;
	isSubmitting?: boolean;
	onQuestionNavigate?: (targetQuestionId: number) => void | Promise<void>;
	onSubmit?: () => void | Promise<void>;
}

//
//
//

const SolvingStudyHeader = ({
	questionSetId,
	questionId,
	number,
	questions,
	answeredQuestionIds = [],
	isGraded = false,
	isCorrectMap = {},
	isSubmitting = false,
	onQuestionNavigate,
	onSubmit,
}: SolvingStudyHeaderProps) => {
	const navigate = useNavigate();
	const { isMobile } = useBreakpoint();
	const currentIsCorrect = isCorrectMap[questionId] ?? null;

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
	const getBadgeColor = () => {
		if (!isGraded || currentIsCorrect === null) {
			return "primary";
		}

		return currentIsCorrect ? "success" : "point";
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
		const isAnswered = answeredQuestionIds.includes(question.id);
		const isCorrect = isCorrectMap[question.id];

		return (
			// biome-ignore lint/a11y/noStaticElementInteractions: div used for hover state
			<div
				className="relative"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<button
					type="button"
					onClick={() => void handleQuestionNavigationClick(question.id)}
					aria-label={`Question ${index + 1}${isActive ? " (active)" : ""}`}
					className={clsx(
						"relative overflow-hidden rounded-medium1 flex items-center justify-center",
						isMobile ? "typo-heading-xsmall" : "typo-heading-small",
						{
							"w-[40px] h-[40px]": isMobile,
							"w-[48px] h-[48px]": !isMobile,
							"bg-color-primary-5 text-color-primary-50 border border-color-primary-50":
								isActive && !isGraded,
							"bg-color-success-5 text-color-success-50 border border-color-success-50":
								isGraded && isCorrect === true,
							"bg-color-point-5 text-color-point-50 border border-color-point-50":
								isGraded && isCorrect === false,
							"text-color-alpha-black100":
								!isActive && !isGraded,
							"hover:bg-color-gray-5": !isActive && isMouseOver,
							"border border-color-primary-50":
								!isGraded && isAnswered,
							"border border-transparent":
								!isGraded && !isAnswered && !isActive,
						},
					)}
				>
					{!isGraded && isAnswered && (
						<span className="absolute inset-x-0 bottom-0 h-[13px] bg-color-primary-50" />
					)}
					<span className="relative z-10">{index + 1}</span>
				</button>
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-gap-11">
			<QuestionNavigation
				orientation="horizontal"
				variation={isMobile ? "small" : "default"}
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
					{!isGraded && (
						<SolvingButton
							disabled={isSubmitting}
							color="primary"
							icon={<ChevronRight />}
							lable="제출하기"
							onClick={() => void onSubmit?.()}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default SolvingStudyHeader;
