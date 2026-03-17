import {
	DragDropContext,
	Draggable,
	Droppable,
	type DropResult,
} from "@hello-pangea/dnd";
import { useEffect } from "react";
import type {
	OrderingOptionApiResponse,
	OrderingQuestionApiResponse,
} from "@/libs/types";
import SolvingAnswerOrdering from "../../../components/common/answer/SolvingAnswerOrdering";
import useSolvingQuestion from "../../../hooks/common/useSolvingQuestion";
import useSolvingLiveAnswerStore from "../../../stores/live/useSolvingLiveAnswerStore";

//
//
//

interface SolvingLiveOrderingAnswersProps {
	questionSetId: number;
	questionId: number;
	isDisabled: boolean;
}

//
//
//

const SolvingLiveOrderingAnswers = ({
	questionSetId,
	questionId,
	isDisabled,
}: SolvingLiveOrderingAnswersProps) => {
	const { question } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "LIVE_TIME",
	});

	const orderingQuestion = question as OrderingQuestionApiResponse | undefined;
	const questionOptions = orderingQuestion?.options ?? [];

	const { getUserAnswers, setUserAnswers } = useSolvingLiveAnswerStore();

	const userAnswers = getUserAnswers() as number[];

	// userAnswers 순서에 따라 options 매핑
	const options = userAnswers
		.map((userAnswer) =>
			questionOptions.find((option) => option.originOrder === userAnswer),
		)
		.filter(
			(option): option is OrderingOptionApiResponse => option !== undefined,
		);

	/**
	 *
	 */
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination || isDisabled) {
			return;
		}

		const sourceIndex = result.source.index;
		const destinationIndex = result.destination.index;

		if (sourceIndex === destinationIndex) {
			return;
		}

		const updatedAnswers = Array.from(userAnswers);
		const [movedAnswer] = updatedAnswers.splice(sourceIndex, 1);
		updatedAnswers.splice(destinationIndex, 0, movedAnswer);

		setUserAnswers(updatedAnswers);
	};

	/**
	 *
	 */
	const getAnswerVariation = (isDragging: boolean): "default" | "focused" => {
		return isDragging ? "focused" : "default";
	};

	//
	useEffect(() => {
		if (
			questionOptions.length > 0 &&
			userAnswers.length !== questionOptions.length
		) {
			const initialAnswers: number[] = Array.from(
				{ length: questionOptions.length },
				(_, index) => index + 1,
			);

			setUserAnswers(initialAnswers);
		}
	}, [questionOptions.length, userAnswers.length, setUserAnswers]);

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
								isDragDisabled={isDisabled}
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
											variation={getAnswerVariation(snapshot.isDragging)}
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

export default SolvingLiveOrderingAnswers;
