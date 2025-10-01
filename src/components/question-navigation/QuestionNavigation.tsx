import clsx from "clsx";
import { ChevronsLeft, Plus } from "lucide-react";
import { BUTTON_SIZE, GAP } from "./constants";
import QuestionNavigationList from "./QuestionNavigationList";
import useQuestionNavigationLayout from "./useQuestionNavigationLayout";
import { useQuestions } from "@/hooks/question";

//
//
//

interface QuestionNavigationProps {
	canDelete?: boolean;
	questionSetId: number;
	activeQuestionId: number;
	orientation?: "vertical" | "horizontal";
	onQuestionClick: (questionId: number) => void;
	onQuestionDelete?: (questionId: number) => void;
}

//
//
//

/**
 * Question navigation sidebar.
 * Displays question numbers with scroll controls.
 */
const QuestionNavigation = ({
	canDelete = false,
	questionSetId,
	activeQuestionId,
	orientation = "vertical",
	onQuestionClick,
	onQuestionDelete,
}: QuestionNavigationProps) => {
	const { questions } = useQuestions({ questionSetId });

	const {
		containerRef,
		startIndex,
		visibleCount,
		canScrollUp,
		canScrollDown,
		handleScrollUp,
		handleScrollDown,
	} = useQuestionNavigationLayout({
		orientation,
		questionLength: questions.length,
	});

	const isVertical = orientation === "vertical";

	/**
	 *
	 */
	const renderDirectionButton = (direction: "up" | "down") => {
		const isUp = direction === "up";

		const canScroll = isUp ? canScrollUp : canScrollDown;
		const onClick = isUp ? handleScrollUp : handleScrollDown;
		const rotationClass = (() => {
			if (isVertical && isUp) {
				return "rotate-90";
			} else if (isVertical && !isUp) {
				return "rotate-[270deg]";
			} else if (!isVertical && isUp) {
				return "";
			} else if (!isVertical && !isUp) {
				return "rotate-180";
			} else {
				return "";
			}
		})();

		return (
			<button
				type="button"
				onClick={onClick}
				disabled={!canScroll}
				className={clsx("flex items-center justify-center rounded-medium1", {
					"hover:bg-color-gray-5": canScroll,
					"opacity-30 cursor-not-allowed": !canScroll,
				})}
				style={{
					width: BUTTON_SIZE,
					height: BUTTON_SIZE,
				}}
			>
				<ChevronsLeft className={rotationClass} />
			</button>
		);
	};

	return (
		<div
			ref={containerRef}
			className={clsx("flex items-center justify-center h-full", {
				"flex-col": isVertical,
				"flex-row": !isVertical,
			})}
			style={{
				gap: `${GAP}px`,
			}}
		>
			{renderDirectionButton("up")}

			<QuestionNavigationList
				questions={questions}
				activeQuestionId={activeQuestionId}
				startIndex={startIndex}
				visibleCount={visibleCount}
				orientation={orientation}
				canDelete={canDelete}
				onQuestionClick={onQuestionClick}
				onQuestionDelete={onQuestionDelete}
			/>

			<button
				type="button"
				className="flex items-center justify-center rounded-medium1 hover:bg-color-gray-5"
				style={{
					width: BUTTON_SIZE,
					height: BUTTON_SIZE,
				}}
			>
				<Plus className={isVertical ? "rotate-90" : ""} />
			</button>

			{renderDirectionButton("down")}
		</div>
	);
};

export default QuestionNavigation;
