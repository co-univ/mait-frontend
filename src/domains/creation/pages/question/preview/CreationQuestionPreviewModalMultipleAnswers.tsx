import { useState } from "react";
import SolvingAnswerMultiple from "@/domains/solving/components/common/answer/SolvingAnswerMultiple";
import type { MultipleQuestionApiResponse } from "@/libs/types";

//
//
//

interface CreationQuestionPreviewModalMultipleAnswersProps {
	question: MultipleQuestionApiResponse;
}

//
//
//

const CreationQuestionPreviewModalMultipleAnswers = ({
	question,
}: CreationQuestionPreviewModalMultipleAnswersProps) => {
	const [selectedChoices, setSelectedChoices] = useState<number[]>([]);

	/**
	 *
	 */
	const handleChoiceClick = (choiceNumber: number) => {
		if (selectedChoices.includes(choiceNumber)) {
			setSelectedChoices(selectedChoices.filter((num) => num !== choiceNumber));
		} else {
			setSelectedChoices([...selectedChoices, choiceNumber]);
		}
	};

	return (
		<div className="w-full flex flex-col gap-gap-11">
			{question.choices.map((choice) => (
				<SolvingAnswerMultiple
					key={choice.id}
					variation={
						selectedChoices.includes(choice.number) ? "focused" : "default"
					}
					choice={choice}
					onChoiceClick={handleChoiceClick}
				/>
			))}
		</div>
	);
};

export default CreationQuestionPreviewModalMultipleAnswers;
