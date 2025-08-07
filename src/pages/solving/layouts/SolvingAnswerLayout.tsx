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
	onAnswerChange?: (index: number, value: string) => void;
	onChoiceSelect?: (choiceId: number) => void;
	selectedChoices?: number[];
	onOrderChange?: (newOrder: any[]) => void;
}

//
//
//

const SolvingAnswerLayout = ({
	prefix,
	answers,
	onAnswerChange,
	onChoiceSelect,
	selectedChoices,
	onOrderChange,
	...solvingQuizAnswerProps
}: SolvingAnswerLayoutProps) => {
	const handleDragEnd = (result: any) => {
		if (!result.destination) return;

		const items = Array.from(answers);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		onOrderChange?.(items);
	};

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
						className="typo-heading-small text-alpha-black100"
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
									{answers.map((answer, index) => (
										<Draggable
											key={answer.id}
											draggableId={`answer-${answer.id}`}
											index={index}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<SolvingQuizAnswer
														color={snapshot.isDragging ? "primary" : "gray"}
														value={answer.content}
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
				{answers.map((answer, index) => {
					const isSelected = selectedChoices?.includes(answer.number);
					return (
						<div
							key={answer.number || answer.id}
							onClick={
								onChoiceSelect
									? () => onChoiceSelect(answer.number)
									: undefined
							}
							style={{
								cursor: onChoiceSelect ? "pointer" : undefined,
							}}
						>
							<SolvingQuizAnswer
								value={answer.content || answer.value || answer.answer || ""}
								color={isSelected ? "primary" : "gray"}
								onChange={
									onAnswerChange
										? (value) => onAnswerChange(index, value)
										: undefined
								}
								{...solvingQuizAnswerProps}
							/>
						</div>
					);
				})}
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