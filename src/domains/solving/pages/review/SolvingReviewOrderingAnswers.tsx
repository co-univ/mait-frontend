import {
	DragDropContext,
	Draggable,
	Droppable,
	type DropResult,
} from "@hello-pangea/dnd";
import SolvingReviewAnswer from "../../components/review/SolvingReviewAnswer";
import useSolvingReviewOrderingQuestion from "../../hooks/review/useSolvingReviewOrderingQuestion";

//
//
//

interface SolvingReviewOrderingAnswersProps {
	questoinSetId: number;
	questionId: number;
}

//
//
//

const SolvingReviewOrderingAnswers = ({
	questoinSetId,
	questionId,
}: SolvingReviewOrderingAnswersProps) => {
	const { isSubmitted, isCorrect, options, handleAnswerChange } =
		useSolvingReviewOrderingQuestion({
			questionSetId: questoinSetId,
			questionId: questionId,
		});

	/**
	 *
	 */
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		handleAnswerChange(result.source.index, result.destination.index);
	};

	/**
	 *
	 */
	const getVariation = (isDragging: boolean) => {
		if (isSubmitted && isCorrect) {
			return "correct";
		}

		if (isSubmitted && !isCorrect) {
			return "incorrect";
		}

		if (isDragging) {
			return "focused";
		}

		return "default";
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="ordering-answers">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="w-full flex flex-col gap-gap-11"
					>
						{options.map((content, index) => (
							<div
								key={`${index}-${content}`}
								className="w-full flex items-center gap-gap-9"
							>
								<span className="typo-heading-xsmall">
									{String.fromCharCode(65 + index)}
								</span>
								<Draggable
									isDragDisabled={isSubmitted}
									draggableId={`${index}-${content}`}
									index={index}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className="w-full"
										>
											<SolvingReviewAnswer
												readOnly
												variation={getVariation(snapshot.isDragging)}
												content={content}
											/>
										</div>
									)}
								</Draggable>
							</div>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default SolvingReviewOrderingAnswers;
