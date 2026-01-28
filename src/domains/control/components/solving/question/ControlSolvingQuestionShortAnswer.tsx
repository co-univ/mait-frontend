import clsx from "clsx";
import { useRef } from "react";
import useControlSolvingQuestionAnswerContent from "@/domains/control/hooks/solving/question/answer/useControlSolvingQuestionAnswerContent";
import type { ShortAnswerApiResponse, ShortAnswerDto } from "@/libs/types";
import ControlSolvingQuestionAnswer from "./answer/ControlSolvingQuestionAnswer";
import ControlSolvingQuestionAnswerAddButton from "./answer/ControlSolvingQuestionAnswerAddButton";
import ControlSolvingQuestionAnswerContent from "./answer/ControlSolvingQuestionAnswerContent";
import ControlSolvingQuestionAnswerExpandButton from "./answer/ControlSolvingQuestionAnswerExpandButton";
import ControlSolvingQuestionAnswerSubContent from "./answer/ControlSolvingQuestionAnswerSubContent";

//
//
//

interface ControlSolvingQuestionShortAnswerProps {
	isEditing: boolean;
	questionAnswers: ShortAnswerApiResponse[];
	addedAnswers: ShortAnswerDto[];
	onSubAnswerChange: (id: number, answer: string) => void;
	onSubAnswerAdd: (number: number) => void;
	onSubAnswerDelete: (id: number) => void;
}

//
//
//

const ControlSolvingQuestionShortAnswer = ({
	isEditing,
	questionAnswers,
	addedAnswers,
	onSubAnswerChange,
	onSubAnswerAdd,
	onSubAnswerDelete,
}: ControlSolvingQuestionShortAnswerProps) => {
	const answerContentRef = useRef<HTMLParagraphElement>(null);

	const { isExpanded, isContentOverflow, toggleExpanded } =
		useControlSolvingQuestionAnswerContent({
			answerContentRef,
			isEditing,
		});

	const mainAnswer = questionAnswers.find((answer) => answer.isMain);
	const subAnswers = questionAnswers.filter((answer) => !answer.isMain);

	const hideExpandButton = !isContentOverflow && subAnswers.length === 0;
	const expanded = isExpanded || isEditing;

	return (
		<ControlSolvingQuestionAnswer>
			<div className="w-full flex flex-col gap-gap-9">
				<div
					className={clsx("w-full flex", {
						"items-center": isEditing,
						"items-start": !isEditing,
					})}
				>
					<ControlSolvingQuestionAnswerContent
						ref={answerContentRef}
						expanded={isExpanded}
						content={mainAnswer?.answer || ""}
					/>

					{isEditing && (
						<ControlSolvingQuestionAnswerAddButton
							onClick={() => onSubAnswerAdd(mainAnswer?.number || 0)}
						/>
					)}
					{!isEditing && (
						<ControlSolvingQuestionAnswerExpandButton
							expanded={isExpanded}
							hide={hideExpandButton}
							onClick={toggleExpanded}
						/>
					)}
				</div>
				{expanded &&
					subAnswers.map((subAnswer) => (
						<ControlSolvingQuestionAnswerSubContent
							key={subAnswer.id}
							content={subAnswer.answer ?? ""}
							onChange={(newContent) =>
								onSubAnswerChange(subAnswer.id, newContent)
							}
							onDelete={() => onSubAnswerDelete(subAnswer.id)}
						/>
					))}
				{isEditing &&
					addedAnswers.map((subAnswer) => (
						<ControlSolvingQuestionAnswerSubContent
							key={subAnswer.id}
							editable={true}
							content={subAnswer.answer ?? ""}
							onChange={(newContent) =>
								onSubAnswerChange(subAnswer.id ?? 0, newContent)
							}
							onDelete={() => onSubAnswerDelete(subAnswer.id ?? 0)}
						/>
					))}
			</div>
		</ControlSolvingQuestionAnswer>
	);
};

export default ControlSolvingQuestionShortAnswer;
