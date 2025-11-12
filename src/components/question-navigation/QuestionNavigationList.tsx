import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { BUTTON_SIZE, GAP } from "./constants";

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
	startIndex: number;
	visibleCount: number;
	orientation: "vertical" | "horizontal";
	questions: T[];
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
	startIndex,
	visibleCount,
	orientation,
	renderQuestionNavigationButton,
}: QuestionNavigationListProps<T>) => {
	const [hoveredQuestionId, setHoveredQuestionId] = useState<number | null>(
		null,
	);

	const isVertical = orientation === "vertical";
	const renderedCount = Math.min(visibleCount, questions.length);

	return (
		<div
			className="relative overflow-hidden"
			style={
				isVertical
					? {
							height: `${renderedCount * BUTTON_SIZE + (renderedCount - 1) * GAP}px`,
						}
					: {
							width: `${renderedCount * BUTTON_SIZE + (renderedCount - 1) * GAP}px`,
						}
			}
		>
			<motion.div
				animate={
					isVertical
						? { y: -startIndex * (BUTTON_SIZE + GAP) }
						: { x: -startIndex * (BUTTON_SIZE + GAP) }
				}
				transition={{ duration: 0.3, ease: "easeInOut" }}
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
			</motion.div>
		</div>
	);
};

export default QuestionNavigationList;
