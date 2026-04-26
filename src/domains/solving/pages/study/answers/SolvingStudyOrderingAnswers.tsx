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
import SolvingAnswerOrdering from "@/domains/solving/components/common/answer/SolvingAnswerOrdering";
import useSolvingQuestion from "@/domains/solving/hooks/common/useSolvingQuestion";
import useSolvingStudyAnswerStore from "@/domains/solving/stores/study/useSolvingStudyAnswerStore";

//
//
//

interface SolvingStudyOrderingAnswersProps {
	questionSetId: number;
	questionId: number;
	readOnly?: boolean;
	isCorrect: boolean | null;
}

//
//
//

const SolvingStudyOrderingAnswers = ({
	questionSetId,
	questionId,
	readOnly = false,
	isCorrect,
}: SolvingStudyOrderingAnswersProps) => {
	const { question } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "STUDY",
	});

	const orderingQuestion = question as OrderingQuestionApiResponse | undefined;
	const questionOptions = orderingQuestion?.options ?? [];

	const { getUserAnswers, setUserAnswers } = useSolvingStudyAnswerStore();
	const userAnswers = getUserAnswers(questionId) as number[];

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
		if (readOnly) {
			return;
		}

		if (!result.destination) {
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

		setUserAnswers(questionId, updatedAnswers);
	};

	const getVariation = (
		isDragging: boolean,
	): "default" | "focused" | "correct" | "incorrect" => {
		if (readOnly) {
			return isCorrect ? "correct" : "incorrect";
		}

		return isDragging ? "focused" : "default";
	};

	useEffect(() => {
		if (
			questionOptions.length > 0 &&
			userAnswers.length !== questionOptions.length
		) {
			setUserAnswers(
				questionId,
				Array.from({ length: questionOptions.length }, (_, index) => index + 1),
			);
		}
	}, [questionOptions.length, userAnswers.length, questionId, setUserAnswers]);

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="study-ordering-answers">
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

export default SolvingStudyOrderingAnswers;
