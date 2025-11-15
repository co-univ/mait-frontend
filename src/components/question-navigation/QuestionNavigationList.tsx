import clsx from "clsx";
import { useState } from "react";
import { GAP } from "./constants";

//
//
//

export interface QuestionNavigationButtonRenderProps<T> {
	isActive: boolean;
	isMouseOver?: boolean;
	index: number;
	questions: T[];
	question: T;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

interface QuestionNavigationListProps<T> {
	activeQuestionId?: number;
	orientation: "vertical" | "horizontal";
	questions: T[];
	listRef: React.RefObject<HTMLDivElement | null>;
	renderQuestionNavigationButton: (
		props: QuestionNavigationButtonRenderProps<T>,
	) => React.ReactNode;
}

//
//
//

const QuestionNavigationList = <T extends { id: number }>({
	questions,
	activeQuestionId,
	orientation,
	listRef,
	renderQuestionNavigationButton,
}: QuestionNavigationListProps<T>) => {
	const [hoveredQuestionId, setHoveredQuestionId] = useState<number | null>(
		null,
	);

	const isVertical = orientation === "vertical";

	return (
		<div
			ref={listRef}
			className={clsx("overflow-hidden scrollbar-hide", {
				"overflow-y-hidden overflow-x-hidden": isVertical,
				"overflow-x-hidden overflow-y-hidden": !isVertical,
			})}
		>
			<div
				className={clsx("flex", {
					"flex-col": isVertical,
					"flex-row": !isVertical,
				})}
				style={{
					gap: `${GAP}px`,
				}}
			>
				{questions.map((question, index) => {
					const isActive =
						activeQuestionId !== undefined && question.id === activeQuestionId;
					const isMouseOver = hoveredQuestionId === question.id;

					return (
						<div key={question.id}>
							{renderQuestionNavigationButton({
								questions,
								question,
								index,
								isActive,
								isMouseOver,
								onMouseEnter: () => setHoveredQuestionId(question.id),
								onMouseLeave: () => setHoveredQuestionId(null),
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionNavigationList;
