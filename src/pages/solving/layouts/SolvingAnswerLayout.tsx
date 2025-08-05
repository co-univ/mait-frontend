import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import SolvingQuizAnswer, {
	ANSWER_HEIGHT,
	type SolvingQuizAnswerProps,
} from "../components/SolvingQuizAnswer";

//
//
//

interface SolvingAnswerLayoutProps extends SolvingQuizAnswerProps {
	prefix?: "alphabet" | "number";
	answers: any[];
}

//
//
//

const SolvingAnswerLayout = ({
	prefix,
	answers,
	...solvingQuizAnswerProps
}: SolvingAnswerLayoutProps) => {
	const handleDragEnd = () => {};
	console.log(solvingQuizAnswerProps);
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
		const answerWrapperClass = "flex flex-col gap-gap-11 w-full";

		if (solvingQuizAnswerProps.draggable) {
			return (
				<div className={answerWrapperClass}>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="answers" direction="vertical">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={answerWrapperClass}
								>
									{answers.map((answer) => (
										<Draggable
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
														{...solvingQuizAnswerProps}
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
		}

		return (
			<div className={answerWrapperClass}>
				{answers.map((answer) => (
					<SolvingQuizAnswer key={answer.number} {...solvingQuizAnswerProps} />
				))}
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
