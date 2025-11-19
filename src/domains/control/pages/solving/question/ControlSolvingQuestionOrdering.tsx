import {
	DragDropContext,
	Draggable,
	Droppable,
	type DropResult,
} from "@hello-pangea/dnd";
import clsx from "clsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ControlSolvingQuestionOrderingAnswer from "@/domains/control/components/solving/question/ControlSolvingQuestionOrderingAnswer";
import useControlSolvingQuestionOrdering from "@/domains/control/hooks/solving/question/useControlSolvingQuestionOrdering";

//
//
//

interface ControlSolvingQuestionOrderingProps {
	readOnly: boolean;
	onRegisterSubmit: (handler: () => Promise<boolean>) => void;
}

//
//
//

const ControlSolvingQuestionOrdering = ({
	readOnly,
	onRegisterSubmit,
}: ControlSolvingQuestionOrderingProps) => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { options, handleOrderingChange, handleOrderingAnswerAdd } =
		useControlSolvingQuestionOrdering({
			questionSetId,
			questionId,
		});

	/**
	 *
	 */
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination || !options) {
			return;
		}

		const newOptions = Array.from(options);
		const [reorderedItem] = newOptions.splice(result.source.index, 1);
		newOptions.splice(result.destination.index, 0, reorderedItem);

		handleOrderingChange(newOptions);
	};

	//
	//
	//
	useEffect(() => {
		onRegisterSubmit(handleOrderingAnswerAdd);
	}, [onRegisterSubmit, handleOrderingAnswerAdd]);

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="ordering-answers-add">
				{(provided) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={clsx("flex flex-col gap-gap-11")}
					>
						{options?.map((option, index) => (
							<Draggable
								key={option.id}
								draggableId={String(option.id)}
								index={index}
								isDragDisabled={readOnly}
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<ControlSolvingQuestionOrderingAnswer
											key={option.id}
											readOnly={readOnly}
											isDragging={snapshot.isDragging}
											option={option}
										/>
									</div>
								)}
							</Draggable>
						))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default ControlSolvingQuestionOrdering;
