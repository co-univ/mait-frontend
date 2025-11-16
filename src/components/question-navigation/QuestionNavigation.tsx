import clsx from "clsx";
import {
	ChevronsDown,
	ChevronsLeft,
	ChevronsRight,
	ChevronsUp,
	Plus,
} from "lucide-react";
import { useImperativeHandle } from "react";
import { BUTTON_SIZE, GAP } from "./constants";
import QuestionNavigationDirectionButton from "./QuestionNavigationDirectionButton";
import QuestionNavigationList, {
	type QuestionNavigationButtonRenderProps,
} from "./QuestionNavigationList";
import useQuestionNavigationLayout from "./useQuestionNavigationLayout";

//
//
//

export interface QuestionNavigationRef {
	scrollUp: () => void;
	scrollDown: () => void;
	scrollToBottom: () => void;
	getVisibleRange: () => { startIndex: number; endIndex: number };
}

interface QuestionNavigationProps<T> {
	ref?: React.Ref<QuestionNavigationRef>;
	hasAddButton?: boolean;
	activeQuestionId?: number;
	orientation?: "vertical" | "horizontal";
	questions: T[];
	onQuestionAdd?: () => void;
	renderUpButton?: () => React.ReactNode;
	renderDownButton?: () => React.ReactNode;
	renderQuestionNavigationButton: (
		props: QuestionNavigationButtonRenderProps<T>,
	) => React.ReactNode;
}

//
//
//

const QuestionNavigation = <T extends { id: number }>({
	ref,
	hasAddButton = false,
	questions,
	activeQuestionId,
	orientation = "vertical",
	onQuestionAdd,
	renderUpButton,
	renderDownButton,
	renderQuestionNavigationButton,
}: QuestionNavigationProps<T>) => {
	const {
		canScrollUp,
		canScrollDown,
		containerRef,
		listRef,
		handleScrollUp,
		handleScrollDown,
		scrollToBottom,
		getVisibleRange,
	} = useQuestionNavigationLayout({
		hasAddButton,
		orientation,
		activeQuestionId: activeQuestionId ?? 0,
		questions,
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
		if (direction === "up" && renderUpButton) {
			return renderUpButton();
		}

		if (direction === "down" && renderDownButton) {
			return renderDownButton();
		}

		const isUp = direction === "up";
		const canScroll = isUp ? canScrollUp : canScrollDown;
		const onClick = isUp ? handleScrollUp : handleScrollDown;

		return (
			<QuestionNavigationDirectionButton
				onClick={onClick}
				disabled={!canScroll}
			>
				{isVertical && isUp && <ChevronsUp />}
				{isVertical && !isUp && <ChevronsDown />}
				{!isVertical && isUp && <ChevronsLeft />}
				{!isVertical && !isUp && <ChevronsRight />}
			</QuestionNavigationDirectionButton>
		);
	};

	/**
	 *
	 */
	const renderAddButton = () => {
		if (hasAddButton && onQuestionAdd) {
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

	//
	//
	//
	useImperativeHandle(ref, () => ({
		scrollUp: handleScrollUp,
		scrollDown: handleScrollDown,
		scrollToBottom,
		getVisibleRange,
	}));

	return (
		<div
			ref={containerRef}
			className={clsx("flex justify-center items-center", {
				"flex-col h-full": isVertical,
				"flex-row w-full": !isVertical,
			})}
			style={{
				gap: `${GAP}px`,
			}}
		>
			{renderDirectionButton("up")}

			<QuestionNavigationList
				activeQuestionId={activeQuestionId}
				orientation={orientation}
				questions={questions}
				listRef={listRef}
				renderQuestionNavigationButton={renderQuestionNavigationButton}
			/>

			{renderAddButton()}

			{renderDirectionButton("down")}
		</div>
	);
};

export default QuestionNavigation;
