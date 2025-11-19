import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import type { OrderingOptionApiResponse } from "@/libs/types";

//
//
//

interface CreationQuestionOrderingDragDropProps {
	answerOrderOptions: OrderingOptionApiResponse[];
	onAnswerOrderChange: (reorderedOptions: OrderingOptionApiResponse[]) => void;
}

//
//
//

const CreationQuestionOrderingDragDrop = ({
	answerOrderOptions,
	onAnswerOrderChange,
}: CreationQuestionOrderingDragDropProps) => {
	/**
	 *
	 */
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		const items = Array.from(answerOrderOptions);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		onAnswerOrderChange(items);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="ordering-answers" direction="horizontal">
				{(provided) => (
					<div
						className="flex gap-gap-5 justify-between"
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{answerOrderOptions.map((option, index) => (
							<Draggable
								key={option.id}
								draggableId={`option-${option.id}`}
								index={index}
							>
								{(provided) => (
									<div
										className="flex flex-1 justify-center items-center h-size-height-11 bg-color-primary-5 border border-color-primary-50 rounded-medium1 typo-heading-small text-color-primary-50"
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										{String.fromCharCode(64 + option.originOrder)}
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

export default CreationQuestionOrderingDragDrop;
