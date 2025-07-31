import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import SolvingQuizAnswer, {
	ANSWER_HEIGHT,
} from "../components/SolvingQuizAnswer";

//
//
//

interface SolvingAnswerLayoutProps {
	readonly?: boolean;
	draggable?: boolean;
	prefix?: "alphabet" | "number";
	answers: any[];
}

//
//
//

const SolvingAnswerLayout = ({
	readonly = true,
	draggable = false,
	prefix,
	answers,
}: SolvingAnswerLayoutProps) => {
	const handleDragEnd = () => {};

	/**
	 * Renders the prefix (A, B, C, ... or (1), (2), (3), ...) for each answer.
	 */
	const renderPrefix = () => {
		if (!prefix) {
			return null;
		}

		// Calculate the padding for the prefix to center it vertically
		// based on the ANSWER_HEIGHT and the font size(with line height) of the prefix
		const prefixPadding = ANSWER_HEIGHT / 2 - (19 * 1.5) / 2;

		return (
			<div
				className="flex flex-col flex-grow justify-between"
				style={{
					paddingTop: prefixPadding,
					paddingBottom: prefixPadding,
				}}
			>
				{Array.from({ length: answers.length }).map((_, index) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: Using index as key is acceptable here since answers are static
						key={index}
						className="typo-heading-small"
					>
						{prefix === "alphabet"
							? String.fromCharCode(65 + index)
							: `(${index + 1})`}
					</span>
				))}
			</div>
		);
	};

	/**
	 *
	 */
	const renderAnswers = () => {
		return (
			<div className="flex flex-col gap-gap-11 w-full">
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="answers" direction="vertical">
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className="flex flex-col gap-gap-11"
							>
								{answers.map((answer) => (
									<Draggable
										isDragDisabled={!draggable}
										key={answer.number}
										draggableId={`answer-${answer.number}`}
										index={answer.number - 1}
									>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<SolvingQuizAnswer
													isActive={snapshot.isDragging}
													readonly={readonly}
													draggable={draggable}
													value={answer.value}
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
			</div>
		);
	};

	return (
		<div className="flex gap-gap-8 w-full">
			{renderPrefix()}
			{renderAnswers()}
		</div>
	);
};

export default SolvingAnswerLayout;
