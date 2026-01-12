import {
	DragDropContext,
	Draggable,
	Droppable,
	type DropResult,
} from "@hello-pangea/dnd";
import { useState } from "react";
import SolvingAnswerOrdering from "@/domains/solving/components/common/answer/SolvingAnswerOrdering";
import type {
	OrderingOptionApiResponse,
	OrderingQuestionApiResponse,
} from "@/libs/types";

//
//
//

interface CreationQuestionPreviewModalOrderingAnswersProps {
	question: OrderingQuestionApiResponse;
}

//
//
//

const CreationQuestionPreviewModalOrderingAnswers = ({
	question,
}: CreationQuestionPreviewModalOrderingAnswersProps) => {
	const [options, setOptions] = useState<OrderingOptionApiResponse[]>(
		question.options,
	);

	/**
	 *
	 */
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		const newOptions = Array.from(options);
		const [movedOption] = newOptions.splice(result.source.index, 1);
		newOptions.splice(result.destination.index, 0, movedOption);

		setOptions(newOptions);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="ordering-answers-droppable">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="w-full flex flex-col gap-gap-11"
					>
						{options.map((option, index) => (
							<Draggable
								key={option.id}
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
											option={option}
											readOnly
											variation={snapshot.isDragging ? "focused" : "default"}
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

export default CreationQuestionPreviewModalOrderingAnswers;
