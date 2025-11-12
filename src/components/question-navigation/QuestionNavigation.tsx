import clsx from "clsx";
import {
	ChevronsDown,
	ChevronsLeft,
	ChevronsRight,
	ChevronsUp,
	Plus,
} from "lucide-react";
import { BUTTON_SIZE, GAP } from "./constants";
import QuestionNavigationList, {
	type QuestionNavigationButtonRenderProps,
} from "./QuestionNavigationList";
import useQuestionNavigationLayout from "./useQuestionNavigationLayout";

//
//
//

interface QuestionNavigationProps<T> {
	activeQuestionId?: number;
	orientation?: "vertical" | "horizontal";
	questions: T[];
	onQuestionAdd?: () => void;
	renderQuestionNavigationButton: (
		props: QuestionNavigationButtonRenderProps<T>,
	) => React.ReactNode;
}

//
//
//

const QuestionNavigation = <T extends { id: number }>({
	questions,
	activeQuestionId,
	orientation = "vertical",
	onQuestionAdd,
	renderQuestionNavigationButton,
}: QuestionNavigationProps<T>) => {
	const {
		containerRef,
		startIndex,
		visibleCount,
		canScrollUp,
		canScrollDown,
		handleScrollUp,
		handleScrollDown,
		scrollToBottom,
	} = useQuestionNavigationLayout({
		orientation,
		questionLength: questions.length,
	});

	const isVertical = orientation === "vertical";

	/**
	 *
	 */
	const handleQuestionAdd = () => {
		onQuestionAdd?.();
		scrollToBottom();
	};

	/**
	 *
	 */
	const renderDirectionButton = (direction: "up" | "down") => {
		const isUp = direction === "up";
		const canScroll = isUp ? canScrollUp : canScrollDown;
		const onClick = isUp ? handleScrollUp : handleScrollDown;

		return (
			<button
				type="button"
				onClick={onClick}
				disabled={!canScroll}
				aria-label={`Scroll ${direction}`}
				className={clsx("flex items-center justify-center rounded-medium1", {
					"hover:bg-color-gray-5": canScroll,
					"opacity-30 cursor-not-allowed": !canScroll,
				})}
				style={{
					width: BUTTON_SIZE,
					height: BUTTON_SIZE,
				}}
			>
				{isVertical && isUp && <ChevronsUp />}
				{isVertical && !isUp && <ChevronsDown />}
				{!isVertical && isUp && <ChevronsLeft />}
				{!isVertical && !isUp && <ChevronsRight />}
			</button>
		);
	};

	/**
	 *
	 */
	const renderAddButton = () => {
		if (onQuestionAdd) {
			return (
				<button
					type="button"
					onClick={handleQuestionAdd}
					aria-label="Add new question"
					className="flex items-center justify-center rounded-medium1 hover:bg-color-gray-5"
					style={{
						width: BUTTON_SIZE,
						height: BUTTON_SIZE,
					}}
				>
					<Plus />
				</button>
			);
		}

		return null;
	};

	return (
		<div
			ref={containerRef}
			className={clsx("flex items-center h-full", {
				"flex-col justify-start": isVertical,
				"flex-row justify-center": !isVertical,
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
				renderQuestionNavigationButton={renderQuestionNavigationButton}
			/>

			{renderAddButton()}

			{renderDirectionButton("down")}
		</div>
	);
};

export default QuestionNavigation;
