import { useState } from "react";
import SolvingAnswerShort from "@/domains/solving/components/common/answer/SolvingAnswerShort";
import type { ShortQuestionApiResponse } from "@/libs/types";

//
//
//

interface CreationQuestoinPreviewModalShortAnswersProps {
	question: ShortQuestionApiResponse;
}

//
//
//

const CreationQuestoinPreviewModalShortAnswers = ({
	question,
}: CreationQuestoinPreviewModalShortAnswersProps) => {
	const [answers, setAnswers] = useState<string[]>(
		Array.from({ length: question.answerCount }, () => ""),
	);

	/**
	 *
	 */
	const handleAnswerChange = (index: number, value: string) => {
		const newAnswers = [...answers];
		newAnswers[index] = value;
		setAnswers(newAnswers);
	};

	return (
		<div className="w-full flex flex-col gap-gap-11">
			{answers.map((answer, index) => (
				<SolvingAnswerShort
					// biome-ignore lint/suspicious/noArrayIndexKey: Since order of answers is fixed, using index as key is acceptable here
					key={index}
					answer={answer}
					variation={answer === "" ? "default" : "focused"}
					onChange={(value) => handleAnswerChange(index, value)}
				/>
			))}
		</div>
	);
};

export default CreationQuestoinPreviewModalShortAnswers;
