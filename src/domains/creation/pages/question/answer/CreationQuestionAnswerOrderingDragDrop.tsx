import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

//
//
//

const CreationQuestionOrderingDragDrop = () => {
	/**
	 *
	 */
	const handleDragEnd = () => {
		// TODO: 구현 예정
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
						<Draggable draggableId="item-a" index={0}>
							{(provided) => (
								<div
									className="flex flex-1 justify-center items-center h-size-height-11 bg-color-primary-5 border border-color-primary-50 rounded-medium1 typo-heading-small text-color-primary-50"
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									A
								</div>
							)}
						</Draggable>
						<Draggable draggableId="item-b" index={1}>
							{(provided) => (
								<div
									className="flex flex-1 justify-center items-center h-size-height-11 bg-color-primary-5 border border-color-primary-50 rounded-medium1 typo-heading-small text-color-primary-50"
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									B
								</div>
							)}
						</Draggable>

						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default CreationQuestionOrderingDragDrop;