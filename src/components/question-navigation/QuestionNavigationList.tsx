import clsx from "clsx";
import { motion } from "framer-motion";
import { SquareMinus } from "lucide-react";
import type {
	FillBlankQuestionApiResponse,
	MultipleQuestionApiResponse,
	OrderingQuestionApiResponse,
	ShortQuestionApiResponse,
} from "@/libs/types";
import { BUTTON_SIZE, GAP } from "./constants";
import QuestionNavigationButton from "./QuestionNavigationButton";

//
//
//

interface QuestionNavigationListProps {
	questions: (
		| MultipleQuestionApiResponse
		| ShortQuestionApiResponse
		| OrderingQuestionApiResponse
		| FillBlankQuestionApiResponse
	)[];
	activeQuestionId: number;
	startIndex: number;
	visibleCount: number;
	orientation: "vertical" | "horizontal";
	canDelete: boolean;
	onQuestionClick: (questionId: number) => void;
	onQuestionDelete?: (questionId: number) => void;
}

//
//
//

const QuestionNavigationList = ({
	questions,
	activeQuestionId,
	startIndex,
	visibleCount,
	orientation,
	canDelete,
	onQuestionClick,
	onQuestionDelete,
}: QuestionNavigationListProps) => {
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
				{questions.map((question, idx) => {
					const isActive = question.id === activeQuestionId;

					/**
					 *
					 */
					const handleClick = () => {
						onQuestionClick(question.id);
					};

					/**
					 *
					 */
					const handleDelete = () => {
						if (canDelete && onQuestionDelete) {
							onQuestionDelete(question.id);
						}
					};

					return (
						<QuestionNavigationButton
							canDelete={canDelete}
							key={question.id}
							number={idx + 1}
							isActive={isActive}
							DeleteIcon={
								<SquareMinus size={20} className="text-color-point-50" />
							}
							onClick={handleClick}
							onDelete={handleDelete}
						/>
					);
				})}
			</motion.div>
		</div>
	);
};

export default QuestionNavigationList;
