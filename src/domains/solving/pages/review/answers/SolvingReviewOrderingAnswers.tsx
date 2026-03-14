import {
	DragDropContext,
	Draggable,
	Droppable,
	type DropResult,
} from "@hello-pangea/dnd";
import { useEffect } from "react";
import useSolvingQuestion from "@/domains/solving/hooks/common/useSolvingQuestion";
import type {
	OrderingOptionApiResponse,
	OrderingQuestionApiResponse,
} from "@/libs/types";
import SolvingAnswerOrdering from "../../components/common/answer/SolvingAnswerOrdering";
import useSolvingReviewAnswerResultStore from "../../stores/review/useSolvingReviewAnswerResultStore";

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
	const { question } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "REVIEW",
	});

	const orderingQuestion = question as OrderingQuestionApiResponse | undefined;
	const questionOptions = orderingQuestion?.options ?? [];

	const { getUserAnswers, setUserAnswers, getIsSubmitted, getIsCorrect } =
		useSolvingReviewAnswerResultStore();

	const userAnswers = getUserAnswers(questionId) as number[];
	const isSubmitted = getIsSubmitted(questionId);
	const isCorrect = getIsCorrect(questionId);

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
		if (!result.destination || isSubmitted) {
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

	// 초기 답안 배열 설정
	useEffect(() => {
		if (
			questionOptions.length > 0 &&
			userAnswers.length !== questionOptions.length
		) {
			const initialAnswers: number[] = Array.from(
				{ length: questionOptions.length },
				(_, index) => index + 1,
			);
			setUserAnswers(questionId, initialAnswers);
		}
	}, [questionOptions.length, userAnswers.length, questionId, setUserAnswers]);

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
