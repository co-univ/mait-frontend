import {
	DragDropContext,
	Draggable,
	Droppable,
	type DropResult,
} from "@hello-pangea/dnd";
import SolvingAnswerOrdering from "../../components/common/answer/SolvingAnswerOrdering";
import useSolvingReviewOrderingQuestion from "../../hooks/review/useSolvingReviewOrderingQuestion";

//
//
//

interface SolvingReviewOrderingAnswersProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const SolvingReviewOrderingAnswers = ({
	questionSetId,
	questionId,
}: SolvingReviewOrderingAnswersProps) => {
	const { isSubmitted, isCorrect, options, handleAnswerChange } =
		useSolvingReviewOrderingQuestion({
			questionSetId: questionSetId,
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
						{options.map((option, index) => (
							<Draggable
								key={option.id}
								isDragDisabled={isSubmitted}
								draggableId={`${option.originOrder}-${option.content}`}
								index={index}
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<SolvingAnswerOrdering
											readOnly
											variation={getVariation(snapshot.isDragging)}
											option={option}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default SolvingReviewOrderingAnswers;
